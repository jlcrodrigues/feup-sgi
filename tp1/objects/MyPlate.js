import * as THREE from "three";
import { MyObject } from "./MyObject.js";

class MyPlate extends MyObject {
  constructor(x, y, z, radius = 0.5, height = 0.05) {
    super(x, y, z);
    const plateMaterial = new THREE.MeshPhongMaterial({
      color: "#aaa",
      side: THREE.DoubleSide,
    });
    const plate = new THREE.CylinderGeometry(radius, radius, height);
    const plateMesh = new THREE.Mesh(plate, plateMaterial);
    this.group.add(plateMesh);
  }
}

export { MyPlate };
