import * as THREE from "three";
import { MyObject } from "./MyObject.js";

class MyTableLeg extends MyObject {
  constructor(x, y, z, height = 1.2) {
    super(x, y, z);

    const legMesh = this.buildMesh(height);
    legMesh.translateY(height / 2);
    this.group.add(legMesh);
  }

  buildMesh(height) {
    const legMaterial = new THREE.MeshPhongMaterial({
      color: "#b58c46",
      specular: "#b58c46",
      emissive: "#000000",
      shininess: 50,
    });
    const tableLeg = new THREE.CylinderGeometry(0.15, 0.15, height, 32);
    return new THREE.Mesh(tableLeg, legMaterial);
  }
}

export { MyTableLeg };
