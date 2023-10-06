import * as THREE from "three";

class MyTableLeg {
  constructor(x, y, z, height=1.2) {
    this.legMaterial = new THREE.MeshPhongMaterial({
      color: "#b58c46",
      specular: "#b58c46",
      emissive: "#000000",
      shininess: 50,
    });
    this.tableLeg = new THREE.CylinderGeometry(0.15, 0.15, height, 32);
    this.legMesh = new THREE.Mesh(this.tableLeg, this.legMaterial);
    this.legMesh.position.set(x, y + height / 2, z);
  }

  getMesh() {
    return this.legMesh;
  }
}

export { MyTableLeg };
