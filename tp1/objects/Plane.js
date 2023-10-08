import * as THREE from "three";

class Plane {
  constructor(x = 0, y = 0, z = 0, options) {
    const planeMaterial = new THREE.MeshPhongMaterial({
      color: options.color ?? "#fff",
      specular: "#000",
      emissive: "#000000",
      shininess: 30,
    });
    if (options.texturePath != null) {
      let canvasTexture = new THREE.TextureLoader().load(options.texturePath);
      canvasTexture.repeat.set(2, 2)
      if(options.texturePath == 'textures/coffee_window.jpg')
        canvasTexture.repeat.set(1,1)
      canvasTexture.wrapS = THREE.RepeatWrapping;
      canvasTexture.wrapT = THREE.RepeatWrapping;
      planeMaterial.map = canvasTexture;
    }
    this.plane = new THREE.PlaneGeometry(10, 10);
    this.planeMesh = new THREE.Mesh(this.plane, planeMaterial);
    this.planeMesh.position.set(x, y, z);
  }

  getMesh() {
    return this.planeMesh;
  }
}

export { Plane };
