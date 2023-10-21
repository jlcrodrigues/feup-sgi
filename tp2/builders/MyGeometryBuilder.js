import * as THREE from "three";

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
    let representations = nodeData.representations;
    return new THREE.PlaneGeometry(
      // TODO: check if this is correct
      Math.abs(representations[0].xy1[0] - representations[0].xy2[0]),
      Math.abs(representations[0].xy1[1] - representations[0].xy2[1]),
      representations[0].parts_x ?? 1,
      representations[0].parts_y ?? 1
    );
  }

  static buildTriangleGeometry(nodeData) {
    // TODO: implement function
    console.warn("Not implemented: buildTriangleGeometry");
  }

  static buildModel3dGeometry(nodeData) {
    // TODO: implement function
    console.warn("Not implemented: buildModel3dGeometry");
  }

  static buildSphereGeometry(nodeData) {
    // TODO: implement function
    console.warn("Not implemented: buildSphereGeometry");
  }

  static buildCylinderGeometry(nodeData) {
    let representations = nodeData.representations;
    return new THREE.CylinderGeometry(
      representations[0].base,
      representations[0].top,
      representations[0].height,
      representations[0].slices,
      representations[0].stacks,
      representations[0].capsclose ?? false,
      representations[0].thetastart ?? 0,
      representations[0].thetalength ?? 2 * Math.PI
    );
  }

  static buildBoxGeometry(nodeData) {
    let representations = nodeData.representations;
    console.log(representations);
    return new THREE.BoxGeometry(
      Math.abs(representations[0].xyz1[0] - representations[0].xyz2[0]),
      Math.abs(representations[0].xyz1[1] - representations[0].xyz2[1]),
      Math.abs(representations[0].xyz1[2] - representations[0].xyz2[2]),
      representations[0].parts_x ?? 1,
      representations[0].parts_y ?? 1,
      representations[0].parts_z ?? 1
    );
  }

  static buildNurbsGeometry(nodeData) {
    // TODO  : implement function
    console.warn("Not implemented: buildNurbsGeometry");
  }
}

export { MyGeometryBuilder };
