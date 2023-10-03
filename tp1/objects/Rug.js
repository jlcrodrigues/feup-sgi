import * as THREE from "three";

class Rug {
  constructor(x, y, z, width=5, depth=7) {
    this.texture = new THREE.TextureLoader().load('textures/rug.png');
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.RepeatWrapping;

    this.material = new THREE.MeshPhongMaterial({
      map: this.texture,
    });

    const rug = new THREE.BoxGeometry(width, 0.05, depth);
    this.rugMesh = new THREE.Mesh(rug, this.material);

    this.rugMesh.position.set(x, y, z)
  }

  getMesh() {
    return this.rugMesh;
  }
}

export { Rug };
