import * as THREE from "three";

/**
 * Builds textures from texture parser data
 */
class MyTextureBuilder {
  /**
   * Builds a texture from texture parser data
   * @returns {THREE.Texture} the texture
   */
  static build(textureData) {
    let texture = new THREE.TextureLoader().load(textureData.filepath);
    if (textureData.isVideo) {
      texture = new THREE.VideoTexture(textureData.filepath);
    }
    // TODO: filters (later classes)
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.mipmaps = textureData.mipmaps ?? true;
    texture.anisotropy = textureData.anisotropy ?? 1;
    // TODO: mipmaps
    return texture;
  }
}

export { MyTextureBuilder };
