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
    // TODO: is this the material type?
    let material = new THREE.MeshPhongMaterial({
      color: materialData.color,
      specular: materialData.specular,
      emissive: materialData.emissive,
      shininess: materialData.shininess,
      wireframe: materialData.wireframe ?? false,
      // TODO: shading
      map: textures.get(materialData.textureref),
      // TODO: texlength_s
      // TODO: texlength_t
      side: (materialData.side ?? false) ? THREE.DoubleSide : THREE.FrontSide,
      // TODO: bump_ref
      // TODO: bump_scale
    });
    return material;
  }
}

export { MyMaterialBuilder };
