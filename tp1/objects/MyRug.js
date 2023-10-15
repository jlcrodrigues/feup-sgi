import * as THREE from "three";

class MyRug {
  constructor(x, y, z, width = 5, depth = 7) {
    const texture = new THREE.TextureLoader().load("textures/rug.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    const material = new THREE.MeshPhongMaterial({
      color: "#ecc",
      map: texture,
    });

    const rug = new THREE.BoxGeometry(width, 0.05, depth);
    this.rugMesh = new THREE.Mesh(rug, material);

    this.rugMesh.position.set(x, y, z);
    this.rugMesh.receiveShadow = true;
  }

  getMesh() {
    return this.rugMesh;
  }
}

export { MyRug };
