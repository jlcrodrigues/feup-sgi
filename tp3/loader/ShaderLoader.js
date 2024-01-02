import * as THREE from "three";

class ShaderLoader {
  constructor(
    vert_url,
    frag_url,
    uniformValues = null
  ) {
    this.vert_url = vert_url;
    this.frag_url = frag_url;
    this.uniformValues = uniformValues;
    this.material = null;
    this.ready = false;
    this.read(vert_url, true);
    this.read(frag_url, false);
  }

  updateUniformsValue(key, value) {
    if (
      this.uniformValues[key] === null ||
      this.uniformValues[key] === undefined
    ) {
      console.error("shader does not have uniform " + key);
      return;
    }
    this.uniformValues[key].value = value;
    if (this.material !== null) {
      this.material.uniforms[key].value = value;
    }
  }

  read(theUrl, isVertex) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", theUrl, false);
    rawFile.send(null)
    if (isVertex) {
      this.vertexShader = rawFile.responseText;
    }
    else {
      this.fragmentShader = rawFile.responseText;
    }
  }

  buildShader() {
    // are both resources loaded?
    if (this.vertexShader !== undefined && this.fragmentShader !== undefined) {
      // build the shader material
      this.material = new THREE.ShaderMaterial({
        // load uniforms, if any
        uniforms: this.uniformValues !== null ? this.uniformValues : {},
        vertexShader: this.vertexShader,
        fragmentShader: this.fragmentShader,
      });
      return this.material;
    }
  }

  hasUniform(key) {
    return this.uniformValues[key] !== undefined;
  }
}
export { ShaderLoader };
