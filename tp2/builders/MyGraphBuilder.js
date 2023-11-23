import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MyPrimitiveBuilder } from "./MyPrimitiveBuilder.js";
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
    this.lights = [];
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
    let nodeData = this.nodesData.get(nodeId);
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
        const material = this.materials.get(nodeData.materialIds[0]);
        child = MyPrimitiveBuilder.build(childData, material);
        child.castShadow = nodeData.castShadows ?? false;
        child.receiveShadow = nodeData.receiveShadows ?? false;
      }

      // Nodes
      else if (childData.type === "node") {
        if (childData.materialIds.length == 0)
          childData.materialIds = nodeData.materialIds;
        if (nodeData.castShadows ?? false) childData.castShadows = true;
        if (nodeData.receiveShadows ?? false) childData.receiveShadows = true;
        child = this.visit(childData.id);
      }

      // Lights
      else if (LIGHTS.includes(childData.type)) {
        child = MyLightBuilder.build(childData);
        this.lights.push(child);
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
      const node = this.visit(child.node.id);
      lod.addLevel(node, child.mindist);
    }
    return lod;
  }

  getLights() {
    return this.lights;
  }
}

export { MyGraphBuilder };
