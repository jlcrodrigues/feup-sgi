import * as THREE from "three";
import { MyNurbsBuilder } from "./MyNurbsBuilder.js";

/**
 * Builds Three.js geometries from parser data (primitives)
 */
class MyGeometryBuilder {
  static build(nodeData) {
    //TODO: distance for all primitives
    if (nodeData.type !== "primitive") {
      console.warn("Not a primitive: " + nodeData.id);
      return;
    }

    switch (nodeData.subtype) {
      case "rectangle":
        return this.buildRectangleGeometry(nodeData);
      case "triangle":
        return this.buildTriangleGeometry(nodeData);
      case "model3d":
        return this.buildModel3dGeometry(nodeData);
      case "sphere":
        return this.buildSphereGeometry(nodeData);
      case "cylinder":
        return this.buildCylinderGeometry(nodeData);
      case "box":
        return this.buildBoxGeometry(nodeData);
      case "nurbs":
        return this.buildNurbsGeometry(nodeData);
      default:
        console.warn("Unknown primitive: " + nodeData.subtype);
        return;
    }
  }

  static buildRectangleGeometry(nodeData) {
    const representations = nodeData.representations;
    const xWidth = Math.abs(representations[0].xy1[0] - representations[0].xy2[0])
    const yWidth = Math.abs(representations[0].xy1[1] - representations[0].xy2[1])
    const geometry = new THREE.PlaneGeometry(
      xWidth,
      yWidth,
      representations[0].parts_x ?? 1,
      representations[0].parts_y ?? 1
    );
    const xMin = Math.min(representations[0].xy1[0], representations[0].xy2[0])
    const yMin = Math.min(representations[0].xy1[1], representations[0].xy2[1])
    geometry.translate(xMin + xWidth / 2, yMin + yWidth / 2, 0)
    return geometry
  }

  static buildTriangleGeometry(nodeData) {
    // TODO: implement function triangle geometry
    console.warn("Not implemented: buildTriangleGeometry");
  }

  static buildModel3dGeometry(nodeData) {
    // TODO: implement function model 3d geometry
    console.warn("Not implemented: buildModel3dGeometry");
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
    )
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

  static buildBoxGeometry(nodeData) {
    const representations = nodeData.representations;
    const xWidth = Math.abs(representations[0].xyz1[0] - representations[0].xyz2[0])
    const yWidth = Math.abs(representations[0].xyz1[1] - representations[0].xyz2[1])
    const zWidth = Math.abs(representations[0].xyz1[2] - representations[0].xyz2[2])
    const geometry = new THREE.BoxGeometry(
      xWidth,
      yWidth,
      zWidth,
      representations[0].parts_x ?? 1,
      representations[0].parts_y ?? 1,
      representations[0].parts_z ?? 1
    );
    const xMin = Math.abs(representations[0].xyz1[0], representations[0].xyz2[0])
    const yMin = Math.abs(representations[0].xyz1[1], representations[0].xyz2[1])
    const zMin = Math.abs(representations[0].xyz1[2], representations[0].xyz2[2])
    geometry.translate(xMin + xWidth / 2, yMin + yWidth / 2, zMin + zWidth / 2)
    return geometry
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
}

export { MyGeometryBuilder };
