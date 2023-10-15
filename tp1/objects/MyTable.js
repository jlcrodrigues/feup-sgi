import * as THREE from "three";
import { MyTableLeg } from "./MyTableLeg.js";

class MyTable {
  constructor(x, y, z) {
    this.group = new THREE.Group();

    this.woodenTexture = new THREE.TextureLoader().load("textures/wood.jpg");
    this.woodenTexture.wrapS = THREE.RepeatWrapping;
    this.woodenTexture.wrapT = THREE.RepeatWrapping;
    let boxMaterial = new THREE.MeshPhongMaterial({
      map: this.boxTexture,
    });

    this.tableMaterialPrimary = new THREE.MeshPhongMaterial({
      color: "#525826",
      specular: "#000000",
      emissive: "#000000",
      shininess: 50,
      map: this.woodenTexture
    });
    this.tableMaterialSecondary = new THREE.MeshPhongMaterial({
      color: "#ffe1c2",
      specular: "#777777",
      emissive: "#000000",
      shininess: 60,
      map: this.woodenTexture
    });

    this.width = 3.5
    this.height = 1
    this.depth = 1.8

    const table = new THREE.BoxGeometry(this.width, this.height - 0.8, this.depth);
    const tableTop = new THREE.BoxGeometry(this.width - 0.3, this.height - 0.99, this.depth - 0.3);

    this.tableMesh = new THREE.Mesh(table, this.tableMaterialPrimary);
    this.tableTopMesh = new THREE.Mesh(tableTop, this.tableMaterialSecondary);
    this.tableMesh.position.set(this.width / 2,  this.height, this.depth / 2)
    this.tableTopMesh.position.set(this.width / 2, this.height + 0.1, this.depth / 2)

    this.group.add(this.tableMesh);
    this.group.add(this.tableTopMesh);
    this.group.add(new MyTableLeg(this.width - 0.3, 0, this.depth - 0.3, this.height).getMesh());
    this.group.add(new MyTableLeg(this.width - 0.3, 0, 0.3, this.height).getMesh());
    this.group.add(new MyTableLeg(0.3, 0, this.depth - 0.3, this.height).getMesh());
    this.group.add(new MyTableLeg(0.3, 0, 0.3, this.height).getMesh());
    this.group.position.set(x, y, z)
    this.group.traverse((child) => {child.castShadow = true; child.receiveShadow = true})
  }

  getMesh() {
    return this.group;
  }

  getYTop() {
    return this.height + 0.2
  }
}

export { MyTable };
