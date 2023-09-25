import * as THREE from "three";

class MyTableLeg {
  constructor(x, y, z) {
    this.legMaterial = new THREE.MeshPhongMaterial({
      color: "#4a4d2d",
      specular: "#000000",
      emissive: "#000000",
      shininess: 50,
    });
    this.tableLeg = new THREE.CylinderGeometry(0.15, 0.15, 1.5, 32);
    this.legMesh = new THREE.Mesh(this.tableLeg, this.legMaterial);
    this.legMesh.position.set(x, y, z);
  }

  getMesh() {
    return this.legMesh;
  }
}

export { MyTableLeg };
