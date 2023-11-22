import * as THREE from "three";

/**
 * Builds materials from material parser data
 */
class MyMaterialBuilder {
  /**
   * Builds a material from material parser data
   * @param {*} materialData Material data from parser (MySceneData.js)
   * @param {*} textures Map of textures (MyBuilder.js)
   * @returns {THREE.Material} the material
   */
  static build(materialData, textures) {
    let material;
    if (materialData.shading === "none") {
      material = new THREE.MeshBasicMaterial();
    } else {
      material = new THREE.MeshPhongMaterial({
        specular: materialData.specular,
        emissive: materialData.emissive,
        shininess: materialData.shininess,
        bumpMap: textures.get(materialData.bumpref) ?? null,
        bumpScale: materialData.bumpscale ?? null,
        flatShading: materialData.shading === "flat",
      });
    }
    material.color = materialData.color;
    material.wireframe = materialData.wireframe ?? false;
    material.wireframeOriginal = materialData.wireframe ?? false;
    material.texlength_s = materialData.texlength_s ?? 1;
    material.texlength_t = materialData.texlength_t ?? 1;

    material.map = textures.get(materialData.textureref);
    material.side =
      materialData.twosided ?? false ? THREE.DoubleSide : THREE.FrontSide;
    material.specularMap = textures.get(materialData.specularref) ?? null;

    return material;
  }
}

export { MyMaterialBuilder };
