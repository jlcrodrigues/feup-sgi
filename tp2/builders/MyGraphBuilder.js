import * as THREE from "three";
import { MyGeometryBuilder } from "./MyGeometryBuilder.js";
import { MyLightBuilder } from "./MyLightBuilder.js";

const LIGHTS = ["pointlight", "spotlight", "directionallight"];

/**
 * Builds the graph's nodes from parser data
 */
class MyGraphBuilder {
  /**
   *
   * @param {} nodes Nodes data from parser
   * @param {*} materials Array of already built Three.js materials
   */
  constructor(nodes, materials) {
    // Store node data in a map for O(1) access
    this.nodesData = new Map();
    for (let key in nodes) {
      this.nodesData.set(key, nodes[key]);
    }
    this.materials = materials;
  }

  /**
   * Builds the graph's nodes from the root node
   * @param {String} root Id of the root node
   * @returns Three.js 3d object
   */
  build(root) {
    this.nodes = new Map(); // keep built nodes
    return this.visit(root);
  }

  /**
   * Recursive visit of all nodes in the data
   * @param {String} nodeId Current visiting node's id
   * @returns Three.js 3d object
   */
  visit(nodeId) {
    // Check if this node has already been built
    if (this.nodes.has(nodeId)) {
      return this.nodes.get(nodeId).clone();
    }

    let nodeData = this.nodesData.get(nodeId);
    if (nodeId == "rectangle2") console.log(nodeData);
    if (nodeData === undefined) {
      console.warn("Node not found: " + nodeId);
      return new THREE.Object3D();
    }

    let node = new THREE.Group();
    for (let childKey in nodeData.children) {
      const childData = nodeData.children[childKey];
      let child;
      // Primitives
      if (childData.type === "primitive") {
        const geometry = this.buildGeometry(childData);
        const material = this.materials.get(nodeData.materialIds[0]);
        child = new THREE.Mesh(geometry, material);
        // TODO: fix shadow: this is a node property
        child.castShadow = true;
        child.receiveShadow = true;
      }

      // Nodes
      else if (childData.type === "node") {
        if (childData.materialIds.length == 0)
          childData.materialIds = nodeData.materialIds;
        child = this.visit(childData.id);
      }

      // Lights
      else if (LIGHTS.includes(childData.type)) {
        child = MyLightBuilder.build(childData);
      }

      // LOD
      else if (childData.type === "lod") {
        child = this.buildLod(childData);
      } else {
        console.warn("Unknown node type:", childData.type);
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

  /**
   * Applies transformations to an object
   * @param {THREE.Object3D} node Already built node
   * @param {Array} transformations Array of transformations from parser
   */
  applyTransformations(node, transformations) {
    // Make transformations in the order: translate, rotation, scale
    let t = [[], [], []];
    let ts = "TRS";
    for (let i in transformations) {
      let transformation = transformations[i];
      t[ts.indexOf(transformation.type)].push(transformation);
    }

    // Translations
    for (let i in t[0]) {
      let transformation = t[0][i];
      node.translateX(transformation.translate[0]);
      node.translateY(transformation.translate[1]);
      node.translateZ(transformation.translate[2]);
    }
    // Rotations
    for (let i in t[1]) {
      let transformation = t[1][i];
      node.rotation.set(
        (transformation.rotation[0] * Math.PI) / 180,
        (transformation.rotation[1] * Math.PI) / 180,
        (transformation.rotation[2] * Math.PI) / 180
      );
    }
    // Scale
    for (let i in t[2]) {
      let transformation = t[2][i];
      node.scale.set(
        transformation.scale[0],
        transformation.scale[1],
        transformation.scale[2]
      );
    }
  }

  /**
   * Builds a LOD node
   * @param {*} nodeData LOD node data
   * @returns Three.js LOD object
   */
  buildLod(nodeData) {
    const lod = new THREE.LOD();
    for (let i in nodeData.children) {
      const child = nodeData.children[i];
      if (child.type !== "lodnoderef") {
        console.warn("Invalid LOD child: " + child.type);
        continue;
      }
      console.log(child.node.id);
      const node = this.visit(child.node.id);
      lod.addLevel(node, child.mindist);
    }
    return lod;
  }
}

export { MyGraphBuilder };
