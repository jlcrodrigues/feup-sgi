import * as THREE from "three";

class MyPlate {
  constructor(x, y, z) {
    this.plateMaterial = new THREE.MeshPhongMaterial({
      color: "#ffffff",
      specular: "#777777",
      emissive: "#000000",
      shininess: 30,
      side: THREE.DoubleSide,
    });
    this.plate = new THREE.CylinderGeometry(0.5, 0.5, 0.05);
    this.plateMesh = new THREE.Mesh(this.plate, this.plateMaterial);

    this.plateMesh.position.x = x;
    this.plateMesh.position.z = z;
    this.plateMesh.position.y = y;
  }

  getMesh() {
    return this.plateMesh;
  }
}

export { MyPlate };
