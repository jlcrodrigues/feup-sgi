import * as THREE from "three";
import { MyObject } from "./MyObject.js";

class MyCircularTable extends MyObject {
  static top;
  static bottom;

  constructor(x, y, z, height = 2) {
    super(x, y, z);
    const woodenTexture = new THREE.TextureLoader().load("textures/wood.jpg");
    woodenTexture.wrapS = THREE.RepeatWrapping;
    woodenTexture.wrapT = THREE.RepeatWrapping;

    const tableMaterialPrimary = new THREE.MeshPhongMaterial({
      color: "#525826",
      shininess: 50,
      map: woodenTexture,
    });
    const tableMaterialSecondary = new THREE.MeshPhongMaterial({
      color: "#ffe1c2",
      shininess: 60,
      map: woodenTexture,
    });

    if (this.bottom === undefined)
      this.bottom = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 32);
    let bottomMesh = new THREE.Mesh(this.bottom, tableMaterialPrimary);

    if (this.top === undefined)
      this.top = new THREE.CylinderGeometry(0.8, 0.8, 0.1, 32);
    let topMesh = new THREE.Mesh(this.top, tableMaterialSecondary);
    topMesh.position.set(0, height, 0);

    let column = new THREE.CylinderGeometry(0.05, 0.05, height, 32);
    let columnMesh = new THREE.Mesh(column, tableMaterialPrimary);
    columnMesh.position.set(0, height / 2, 0);

    this.group.add(bottomMesh, topMesh, columnMesh);

    this.group.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
    });
  }
}

export { MyCircularTable };
