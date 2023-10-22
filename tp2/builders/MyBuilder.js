import * as THREE from "three";
import { MyTextureBuilder } from "./MyTextureBuilder.js";
import { MyMaterialBuilder } from "./MyMaterialBuilder.js";
import { MyGraphBuilder } from "./MyGraphBuilder.js";

/**
 * Builds the scene's contents from parser data
 */
class MyBuilder {
  constructor(data) {
    this.data = data;

    this.buildTextures();
    this.buildMaterials();
  }

  /**
   * Builds textures from texture parser data
   */
  buildTextures() {
    this.textures = new Map();
    for (let key in this.data.textures) {
      let textureData = this.data.textures[key];
      this.textures.set(textureData.id, MyTextureBuilder.build(textureData));
    }
  }

  /**
   * Builds materials from material parser data
   */
  buildMaterials() {
    if (this.textures === undefined) this.buildTextures();
    this.materials = new Map();
    for (let key in this.data.materials) {
      let material = this.data.materials[key];
      this.materials.set(
        material.id,
        MyMaterialBuilder.build(material, this.textures)
      );
    }
  }

  /**
   * Builds the scene's object graph from parser data 
   * @returns Three.js 3d object
   */
  buildGraph() {
    let graphBuilder = new MyGraphBuilder(this.data.nodes, this.materials);
    return graphBuilder.build(this.data.rootId);
  }
}

export { MyBuilder };
