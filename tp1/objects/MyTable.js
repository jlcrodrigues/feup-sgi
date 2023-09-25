import * as THREE from "three";
import { MyTableLeg } from "./MyTableLeg.js";

class MyTable {
  constructor(x, y, z) {
    this.group = new THREE.Group();
    this.group.position.set(x, y, z)

    this.tableMaterialPrimary = new THREE.MeshPhongMaterial({
      color: "#4a4d2d",
      specular: "#000000",
      emissive: "#000000",
      shininess: 50,
    });
    this.tableMaterialSecondary = new THREE.MeshPhongMaterial({
      color: "#ffe1c2",
      specular: "#eed0b1",
      emissive: "#000000",
      shininess: 500,
    });

    this.table = new THREE.BoxGeometry(3.5, 0.2, 2.5);
    this.tableTop = new THREE.BoxGeometry(3, 0.21, 2);

    this.tableMesh = new THREE.Mesh(this.table, this.tableMaterialPrimary);
    this.tableTopMesh = new THREE.Mesh(this.tableTop, this.tableMaterialSecondary);

    this.group.add(this.tableMesh);
    this.group.add(this.tableTopMesh);
    this.group.add(new MyTableLeg(1.4, -0.74, 0.9).getMesh());
    this.group.add(new MyTableLeg(1.4, -0.74, -0.9).getMesh());
    this.group.add(new MyTableLeg(-1.4, -0.74, 0.9).getMesh());
    this.group.add(new MyTableLeg(-1.4, -0.74, -0.9).getMesh());
  }

  getMesh() {
    return this.group;
  }
}

export { MyTable };
