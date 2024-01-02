import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MyNurbsBuilder } from "./MyNurbsBuilder.js";
import { MyTriangle } from "./objects/MyTriangle.js";
import { ShaderLoader } from "../ShaderLoader.js";

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

    return this.buildPrimitive(nodeData, material);
  }

  static geometryBuilders;

  /**
   * Builds a geometry from node data <br>
   * This function simply calls specific geometry builders.
   * All of these follow the same prototype.
   * @param {*} nodeData
   * @returns {THREE.Geometry}
   */
  static buildPrimitive(nodeData, material) {
    if (this.geometryBuilders === undefined) {
      this.geometryBuilders = new Map();
      this.geometryBuilders.set("cylinder", this.buildCylinder);
      this.geometryBuilders.set("rectangle", this.buildRectangle);
      this.geometryBuilders.set("triangle", this.buildTriangle);
      this.geometryBuilders.set("sphere", this.buildSphere);
      this.geometryBuilders.set("nurbs", this.buildNurbs);
      this.geometryBuilders.set("box", this.buildBox);
      this.geometryBuilders.set("polygon", this.buildPolygon);
      this.geometryBuilders.set("model3d", this.buildModel3d);
      this.geometryBuilders.set("tdDisplay", this.build3dDisplay);
    }

    return this.geometryBuilders.get(nodeData.subtype)(nodeData, material);
  }

  static buildCylinder(nodeData, material) {
    const representations = nodeData.representations;
    const geometry = new THREE.CylinderGeometry(
      representations[0].top,
      representations[0].base,
      representations[0].height,
      representations[0].slices,
      representations[0].stacks,
      representations[0].capsclose ?? false,
      representations[0].thetastart ?? 0,
      representations[0].thetalength ?? 2 * Math.PI
    );
    return new THREE.Mesh(geometry, material);
  }

  static buildRectangle(nodeData, material) {
    const representations = nodeData.representations;
    const width = Math.abs(
      representations[0].xy1[0] - representations[0].xy2[0]
    );
    const height = Math.abs(
      representations[0].xy1[1] - representations[0].xy2[1]
    );
    const geometry = new THREE.PlaneGeometry(
      width,
      height,
      representations[0].parts_x ?? 1,
      representations[0].parts_y ?? 1
    );
    const xMin = Math.min(representations[0].xy1[0], representations[0].xy2[0]);
    const yMin = Math.min(representations[0].xy1[1], representations[0].xy2[1]);
    geometry.translate(xMin + width / 2, yMin + height / 2, 0);

    // Adjust texture
    if (material !== undefined && material.map !== undefined) {
      const texture = material.map;
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(
        width / material.texlength_s,
        height / material.texlength_t
      );
      material.map = texture;
    }
    return new THREE.Mesh(geometry, material);
  }

  static buildTriangle(nodeData, material) {
    const representations = nodeData.representations;
    const geometry = new MyTriangle(
      material,
      ...representations[0].xyz1,
      ...representations[0].xyz2,
      ...representations[0].xyz3
    );

    return new THREE.Mesh(geometry, material);
  }

  static buildSphere(nodeData, material) {
    const representations = nodeData.representations;
    const geometry = new THREE.SphereGeometry(
      representations[0].radius,
      representations[0].slice,
      representations[0].stacks,
      representations[0].thetastart ?? 0,
      representations[0].thetalength ?? 2 * Math.PI,
      representations[0].phistart ?? 0,
      representations[0].philength ?? 2 * Math.PI,
      representations[0].distance ?? 0
    );
    return new THREE.Mesh(geometry, material);
  }

  static buildNurbs(nodeData, material) {
    const representation = nodeData.representations[0];
    const controlPoints = [];
    for (let i = 0; i <= representation.degree_u; i++) {
      controlPoints.push([]);
      for (let j = 0; j <= representation.degree_v; j++) {
        let controlPoint =
          representation.controlpoints[i * (representation.degree_v + 1) + j];
        controlPoints[i].push([
          controlPoint.xx,
          controlPoint.yy,
          controlPoint.zz,
          1,
        ]);
      }
    }

    const builder = new MyNurbsBuilder();
    const surfaceData = builder.build(
      controlPoints,
      representation.degree_u,
      representation.degree_v,
      representation.parts_u,
      representation.parts_v
    );
    return new THREE.Mesh(surfaceData, material);
  }

  static buildBox(nodeData, material) {
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
    return new THREE.Mesh(geometry, material);
  }

  static buildPolygon(nodeData, material) {
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
    geometry.computeVertexNormals();
    if (material === undefined) material = new THREE.MeshBasicMaterial();
    material.vertexColors = true;
    return new THREE.Mesh(geometry, material);
  }

  /**
   * Builds a Three.js object from 3d model node data <br>
   * @param {*} nodeData
   * @returns {THREE.Object3D}
   */
  static buildModel3d(nodeData, material) {
    const obj = new THREE.Object3D();
    MyPrimitiveBuilder.load3dModel(nodeData).then((result) =>
      obj.add(result.scene)
    );
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

  static build3dDisplay(nodeData, material) {
    const representations = nodeData.representations;
    const width = Math.abs(
      representations[0].xy1[0] - representations[0].xy2[0]
    );
    const height = Math.abs(
      representations[0].xy1[1] - representations[0].xy2[1]
    );
    const geometry = new THREE.PlaneGeometry(
      width,
      height,
      representations[0].parts_x ?? 1000,
      representations[0].parts_y ?? 1000
    );
    const xMin = Math.min(representations[0].xy1[0], representations[0].xy2[0]);
    const yMin = Math.min(representations[0].xy1[1], representations[0].xy2[1]);
    geometry.translate(xMin + width / 2, yMin + height / 2, 0);

    const texture = new THREE.TextureLoader().load(
      representations[0].image
    );
    const lGrayTexture = new THREE.TextureLoader().load(
      representations[0].lgray
    );

    const shaderLoader = new ShaderLoader(
      "shaders/3dDisplay.vert",
      "shaders/3dDisplay.frag",
      {
        uSampler: { type: "sampler2D", value: texture },
        uSamplerGray: { type: "sampler2D", value: lGrayTexture },
        cameraNear: { type: "float", value: null },
        cameraFar: { type: "float", value: null },
      }
    );

    material = shaderLoader.buildShader();

    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = "tvDisplay";
    mesh.shader = shaderLoader;
    return mesh;
  }
}

export { MyPrimitiveBuilder };
