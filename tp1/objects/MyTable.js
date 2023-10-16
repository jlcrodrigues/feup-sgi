import * as THREE from "three";
import { MyTableLeg } from "./MyTableLeg.js";
import { MyObject } from "./MyObject.js";

class MyTable extends MyObject {
  constructor(x, y, z) {
    super(x, y, z)

    const woodenTexture = new THREE.TextureLoader().load("textures/wood.jpg");
    woodenTexture.wrapS = THREE.RepeatWrapping;
    woodenTexture.wrapT = THREE.RepeatWrapping;

    const tableMaterialPrimary = new THREE.MeshPhongMaterial({
      color: "#525826",
      shininess: 50,
      map: woodenTexture
    });
    const tableMaterialSecondary = new THREE.MeshPhongMaterial({
      color: "#ffe1c2",
      specular: "#333",
      shininess: 60,
      map: woodenTexture
    });

    this.width = 3.5
    this.height = 1
    this.depth = 1.8

    const table = new THREE.BoxGeometry(this.width, this.height - 0.8, this.depth);
    const tableTop = new THREE.BoxGeometry(this.width - 0.3, this.height - 0.99, this.depth - 0.3);

    const tableMesh = new THREE.Mesh(table, tableMaterialPrimary);
    tableMesh.position.set(this.width / 2,  this.height, this.depth / 2)
    const tableTopMesh = new THREE.Mesh(tableTop, tableMaterialSecondary);
    tableTopMesh.position.set(this.width / 2, this.height + 0.1, this.depth / 2)

    this.group.add(tableMesh, tableTopMesh);
    this.group.add(new MyTableLeg(this.width - 0.3, 0, this.depth - 0.3, this.height).getMesh());
    this.group.add(new MyTableLeg(this.width - 0.3, 0, 0.3, this.height).getMesh());
    this.group.add(new MyTableLeg(0.3, 0, this.depth - 0.3, this.height).getMesh());
    this.group.add(new MyTableLeg(0.3, 0, 0.3, this.height).getMesh());
    this.group.traverse((child) => {child.castShadow = true; child.receiveShadow = true})
  }

  getYTop() {
    return this.height + 0.2
  }
}

export { MyTable };
