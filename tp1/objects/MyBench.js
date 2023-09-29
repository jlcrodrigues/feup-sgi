import * as THREE from "three";
import { MyTableLeg } from "./MyTableLeg.js";

class MyBench {
  constructor(x, y, z) {
    this.group = new THREE.Group();

    this.benchMaterial = new THREE.MeshPhongMaterial({
      color: "#4a4d2d",
      specular: "#000000",
      emissive: "#000000",
      shininess: 50,
    });
    this.aabenchMaterial = new THREE.MeshPhongMaterial({
      color: "#ffe1c2",
      specular: "#777777",
      emissive: "#000000",
      shininess: 60,
    });

    let legHeight = 0.8
    const top = new THREE.BoxGeometry(1, 0.2, 1);
    this.topMesh = new THREE.Mesh(top, this.benchMaterial);
    this.topMesh.position.set(1.3 / 2, legHeight - 0.1, 1.3 / 2)

    this.group.add(this.topMesh);
    this.group.add(new MyTableLeg(1.1, 0, 1.1, legHeight).getMesh());
    this.group.add(new MyTableLeg(1.1, 0, 0.2, legHeight).getMesh());
    this.group.add(new MyTableLeg(0.2, 0, 1.1, legHeight).getMesh());
    this.group.add(new MyTableLeg(0.2, 0, 0.2, legHeight).getMesh());
    this.group.position.set(x, y, z)
  }

  getMesh() {
    return this.group;
  }
}

export { MyBench };
