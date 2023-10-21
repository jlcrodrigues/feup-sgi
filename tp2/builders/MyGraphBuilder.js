import * as THREE from "three";
import { MyGeometryBuilder } from "./MyGeometryBuilder.js";

/**
 * Builds nodes from material parser data
 */
class MyGraphBuilder {
  constructor(nodes, materials) {
    this.nodesData = new Map();
    for (let key in nodes) {
      this.nodesData.set(key, nodes[key]);
    }
    this.materials = materials;
  }

  build(root) {
    this.nodes = new Map(); // keep built nodes
    return this.visit(root);
  }

  visit(nodeId) {
    if (this.nodes.has(nodeId)) return this.nodes.get(nodeId);
    let nodeData = this.nodesData.get(nodeId);
    if (nodeData === undefined) {
      console.warn("Node not found: " + nodeId);
      return new THREE.Object3D();
    }
    let node = new THREE.Object3D();
    this.nodes.set(nodeId, node);
    for (let childKey in nodeData.children) {
      let child;
      const childData = nodeData.children[childKey];
      if (childData.type === "primitive") {
        const geometry = this.buildGeometry(childData);
        const material = this.materials.get(nodeData.materialIds[0]);
        child = new THREE.Mesh(geometry, material);
      } else if (childData.type === "node") {
        if (childData.materialIds.length == 0)
          childData.materialIds = nodeData.materialIds;
        child = this.visit(childData.id);
      }
      if (child !== undefined) node.add(child);
    }
    this.applyTransformations(node, nodeData.transformations);
    this.nodes.set(nodeId, node);
    return node;
  }

  buildGeometry(nodeData) {
    return MyGeometryBuilder.build(nodeData);
  }

  applyTransformations(node, transformations) {
    for (let i in transformations) {
      let transformation = transformations[i];
      switch (transformation.type) {
        case "T":
          node.translateX(transformation.translate[0]);
          node.translateY(transformation.translate[1]);
          node.translateZ(transformation.translate[2]);
          break;
        case "R":
          node.rotation.set(
            (transformation.rotation[0] * Math.PI) / 180,
            (transformation.rotation[1] * Math.PI) / 180,
            (transformation.rotation[2] * Math.PI) / 180
          );
          break;
        case "S":
          node.scale.set(
            transformation.scale[0],
            transformation.scale[1],
            transformation.scale[2]
          );
          break;
      }
    }
  }
}

export { MyGraphBuilder };
