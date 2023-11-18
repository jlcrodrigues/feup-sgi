import * as THREE from "three";

const MIPMAP_LEVELS = 8;

/**
 * Builds textures from texture parser data
 */
class MyTextureBuilder {
  /**
   * Builds a texture from texture parser data
   * @returns {THREE.Texture} the texture
   */
  static build(textureData) {
    let texture;
    if (textureData.isVideo) {
      const video = document.createElement("video");
      video.src = textureData.filepath;
      video.loop = true;
      video.muted = true;
      video.autoplay = true;

      texture = new THREE.VideoTexture(video);
      texture.generateMipmaps = true;
    } else {
      texture = new THREE.TextureLoader().load(textureData.filepath);
    }

    texture.magFilter = this.getMagFilter(textureData.magFilter);
    texture.minFilter = this.getMinFilter(textureData.minFilter);

    if (textureData.mipmap0 != null) {
      texture.generateMipmaps = false;
      texture.mipmaps = [];
      for (let i = 0; i < MIPMAP_LEVELS; i++) {
        const path = textureData['mipmap' + i];
        if (path == null) break;
        this.loadMipmap(texture, i, path);
      }
    }
    texture.anisotropy = textureData.anisotropy ?? 1;
    return texture;
  }

  static getMagFilter(filter) {
    const magFilters = {
      NearestFilter: THREE.NearestFilter,
      LinearFilter: THREE.LinearFilter,
    };
    return magFilters[filter] ?? THREE.LinearFilter;
  }

  static getMinFilter(filter) {
    const minFilters = {
      NearestFilter: THREE.NearestFilter,
      NearestMipMapLinearFilter: THREE.NearestMipMapLinearFilter,
      NearestMipMapNearestFilter: THREE.NearestMipMapNearestFilter,
      LinearFilter: THREE.LinearFilter,
      LinearMipMapLinearFilter: THREE.LinearMipMapLinearFilter,
      LinearMipmapNearestFilter: THREE.LinearMipmapNearestFilter,
    };
    return minFilters[filter] ?? THREE.LinearMipMapLinearFilter;
  }

  /**
   * load an image and create a mipmap to be added to a texture
   * at the defined level. In between, add the image some text
   * and control squares. These items become part of the picture
   *
   * @param {*} parentTexture the texture to which the mipmap is added
   * @param {*} level the level of the mipmap
   * @param {*} path the path for the mipmap image
   */
  static loadMipmap(parentTexture, level, path) {
    // load texture. On loaded call the function to create the mipmap for the specified level
    new THREE.TextureLoader().load(
      path,
      function (
        mipmapTexture // onLoad callback
      ) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        ctx.scale(1, 1);

        // const fontSize = 48
        const img = mipmapTexture.image;
        canvas.width = img.width;
        canvas.height = img.height;

        // first draw the image
        ctx.drawImage(img, 0, 0);

        // set the mipmap image in the parent texture in the appropriate level
        parentTexture.mipmaps[level] = canvas;
      },
      undefined, // onProgress callback currently not supported
      function (err) {
        console.error(
          "Unable to load the image " +
            path +
            " as mipmap level " +
            level +
            ".",
          err
        );
      }
    );
  }
}

export { MyTextureBuilder };
