import * as THREE from "three";
import { MyTableLeg } from "./MyTableLeg.js";

class MyTable {
  constructor(x, y, z) {
    this.group = new THREE.Group();

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

    const table = new THREE.BoxGeometry(3.5, 0.2, 2.5);
    const tableTop = new THREE.BoxGeometry(3, 0.21, 2);

    this.tableMesh = new THREE.Mesh(table, this.tableMaterialPrimary);
    this.tableTopMesh = new THREE.Mesh(tableTop, this.tableMaterialSecondary);
    this.tableMesh.position.set(3.5 / 2, 1.5, 2.5 / 2)
    this.tableTopMesh.position.set(3.5 / 2, 1.5, 2.5 / 2)

    this.group.add(this.tableMesh);
    this.group.add(this.tableTopMesh);
    this.group.add(new MyTableLeg(3, 0, 2).getMesh());
    this.group.add(new MyTableLeg(3, 0, 0.5).getMesh());
    this.group.add(new MyTableLeg(0.5, 0, 2).getMesh());
    this.group.add(new MyTableLeg(0.5, 0, 0.5).getMesh());
    this.group.position.set(x, y, z)
  }

  getMesh() {
    return this.group;
  }
}

export { MyTable };
