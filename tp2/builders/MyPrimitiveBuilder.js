import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MyNurbsBuilder } from "./MyNurbsBuilder.js";
import { MyTriangle } from "./objects/MyTriangle.js";

/**
 * Builds Three.js objects from parser data (primitives)
 */
class MyPrimitiveBuilder {
  /**
   * Builds a Three.js object from parser primitives
   * @param {} nodeData Primitive node data
   * @param {*} material Material to be used
   * @returns {THREE.Mesh}
   */
  static build(nodeData, material) {
    //TODO: distance - legacy; leave for now
    if (nodeData.type !== "primitive") {
      console.warn("Not a primitive: " + nodeData.id);
      return;
    }

    if (nodeData.subtype === "model3d") return this.buildModel3d(nodeData);

    if (nodeData.subtype === "polygon") {
      if (material === undefined) material = new THREE.MeshBasicMaterial();
      material.vertexColors = true;
    }
    return new THREE.Mesh(this.buildGeometry(nodeData), material);
  }

  static geometryBuilders;

  /**
   * Builds a geometry from node data <br>
   * This function simply calls specific geometry builders.
   * All of these follow the same prototype.
   * @param {*} nodeData
   * @returns {THREE.Geometry}
   */
  static buildGeometry(nodeData) {
    if (this.geometryBuilders === undefined) {
      this.geometryBuilders = new Map();
      this.geometryBuilders.set("cylinder", this.buildCylinderGeometry);
      this.geometryBuilders.set("rectangle", this.buildRectangleGeometry);
      this.geometryBuilders.set("triangle", this.buildTriangleGeometry);
      this.geometryBuilders.set("sphere", this.buildSphereGeometry);
      this.geometryBuilders.set("nurbs", this.buildNurbsGeometry);
      this.geometryBuilders.set("box", this.buildBoxGeometry);
      this.geometryBuilders.set("polygon", this.buildPolygonGeometry);
    }

    return this.geometryBuilders.get(nodeData.subtype)(nodeData);
  }

  static buildCylinderGeometry(nodeData) {
    const representations = nodeData.representations;
    return new THREE.CylinderGeometry(
      representations[0].top,
      representations[0].base,
      representations[0].height,
      representations[0].slices,
      representations[0].stacks,
      representations[0].capsclose ?? false,
      representations[0].thetastart ?? 0,
      representations[0].thetalength ?? 2 * Math.PI
    );
  }

  static buildRectangleGeometry(nodeData) {
    const representations = nodeData.representations;
    const xWidth = Math.abs(
      representations[0].xy1[0] - representations[0].xy2[0]
    );
    const yWidth = Math.abs(
      representations[0].xy1[1] - representations[0].xy2[1]
    );
    const geometry = new THREE.PlaneGeometry(
      xWidth,
      yWidth,
      representations[0].parts_x ?? 1,
      representations[0].parts_y ?? 1
    );
    const xMin = Math.min(representations[0].xy1[0], representations[0].xy2[0]);
    const yMin = Math.min(representations[0].xy1[1], representations[0].xy2[1]);
    geometry.translate(xMin + xWidth / 2, yMin + yWidth / 2, 0);
    return geometry;
  }

  static buildTriangleGeometry(nodeData) {
    const representations = nodeData.representations;
    const geometry = new MyTriangle(
      ...representations[0].xyz1,
      ...representations[0].xyz2,
      ...representations[0].xyz3
    );
    return geometry;
  }

  static buildSphereGeometry(nodeData) {
    const representations = nodeData.representations;
    return new THREE.SphereGeometry(
      representations[0].radius,
      representations[0].slice,
      representations[0].stacks,
      representations[0].thetastart ?? 0,
      representations[0].thetalength ?? Math.PI,
      representations[0].phistart ?? 0,
      representations[0].philength ?? 2 * Math.PI,
      representations[0].distance ?? 0
    );
  }

  static buildNurbsGeometry(nodeData) {
    const representation = nodeData.representations[0];
    const controlPoints = [];
    for (let i in representation.controlpoints) {
      let p = representation.controlpoints[i];
      controlPoints.push([p.xx, p.yy, p.zz, 1]);
    }
    const builder = new MyNurbsBuilder();
    const surfaceData = builder.build(
      controlPoints,
      representation.degree_u,
      representation.degree_v,
      representation.parts_u,
      representation.parts_v
    );
    return surfaceData;
  }

  static buildBoxGeometry(nodeData) {
    const representations = nodeData.representations;
    const xWidth = Math.abs(
      representations[0].xyz1[0] - representations[0].xyz2[0]
    );
    const yWidth = Math.abs(
      representations[0].xyz1[1] - representations[0].xyz2[1]
    );
    const zWidth = Math.abs(
      representations[0].xyz1[2] - representations[0].xyz2[2]
    );
    const geometry = new THREE.BoxGeometry(
      xWidth,
      yWidth,
      zWidth,
      representations[0].parts_x ?? 1,
      representations[0].parts_y ?? 1,
      representations[0].parts_z ?? 1
    );
    const xMin = Math.abs(
      representations[0].xyz1[0],
      representations[0].xyz2[0]
    );
    const yMin = Math.abs(
      representations[0].xyz1[1],
      representations[0].xyz2[1]
    );
    const zMin = Math.abs(
      representations[0].xyz1[2],
      representations[0].xyz2[2]
    );
    geometry.translate(xMin + xWidth / 2, yMin + yWidth / 2, zMin + zWidth / 2);
    return geometry;
  }

  static buildPolygonGeometry(nodeData) {
    const representation = nodeData.representations[0];
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    for (let i = 0; i <= representation.stacks; i++) {
      const height = (i / representation.stacks) * representation.radius;
      const heightNext =
        ((i + 1) / representation.stacks) * representation.radius;

      for (let j = 0; j <= representation.slices; j++) {
        const theta = (j / representation.slices) * 2 * Math.PI;
        const thetaNext = ((j + 1) / representation.slices) * 2 * Math.PI;

        // first triangle
        vertices.push(
          height * Math.cos(theta),
          height * Math.sin(theta),
          1,
          heightNext * Math.cos(theta),
          heightNext * Math.sin(theta),
          1,
          heightNext * Math.cos(thetaNext),
          heightNext * Math.sin(thetaNext),
          1
        );

        // second triangle
        vertices.push(
          height * Math.cos(theta),
          height * Math.sin(theta),
          1,
          heightNext * Math.cos(thetaNext),
          heightNext * Math.sin(thetaNext),
          1,
          height * Math.cos(thetaNext),
          height * Math.sin(thetaNext),
          1
        );

        const color = new THREE.Color().lerpColors(
          representation.color_c,
          representation.color_p,
          i / representation.stacks
        );

        for (let i = 0; i < 6; i++) colors.push(color.r, color.g, color.b);
      }
    }

    const verticesArray = new Float32Array(vertices);
    const colorsArray = new Float32Array(colors);

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(verticesArray, 3)
    );
    geometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3));
    return geometry;
  }

  /**
   * Builds a Three.js object from 3d model node data <br>
   * @param {*} nodeData
   * @returns {THREE.Object3D}
   */
  static buildModel3d(nodeData) {
    const obj = new THREE.Object3D();
    this.load3dModel(nodeData).then((result) => obj.add(result.scene));
    return obj;
  }

  /**
   * Loads 3d model from file
   * @param {*} nodeData
   * @returns {Promise<GLTFLoader>}
   */
  static async load3dModel(nodeData) {
    const representations = nodeData.representations;
    const loader = new GLTFLoader();
    return loader.loadAsync(representations[0].filepath);
  }
}

export { MyPrimitiveBuilder };
