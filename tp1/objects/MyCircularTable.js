import * as THREE from "three";

class MyCircularTable {
  static top;

  constructor(x, y, z, height = 2) {
    this.group = new THREE.Group();

    this.woodenTexture = new THREE.TextureLoader().load("textures/wood.jpg");
    this.woodenTexture.wrapS = THREE.RepeatWrapping;
    this.woodenTexture.wrapT = THREE.RepeatWrapping;

    this.tableMaterialPrimary = new THREE.MeshPhongMaterial({
      color: "#525826",
      specular: "#000000",
      emissive: "#000000",
      shininess: 50,
      map: this.woodenTexture,
    });
    this.tableMaterialSecondary = new THREE.MeshPhongMaterial({
      color: "#ffe1c2",
      specular: "#777777",
      emissive: "#000000",
      shininess: 60,
      map: this.woodenTexture,
    });

    if (this.bottom === undefined)
      this.bottom = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 32);
    let bottomMesh = new THREE.Mesh(this.bottom, this.tableMaterialPrimary);

    if (this.top === undefined)
      this.top = new THREE.CylinderGeometry(0.8, 0.8, 0.1, 32);
    let topMesh = new THREE.Mesh(this.top, this.tableMaterialSecondary);
    topMesh.position.set(0, height, 0);

    let column = new THREE.CylinderGeometry(0.05, 0.05, height, 32);
    let columnMesh = new THREE.Mesh(column, this.tableMaterialPrimary);
    columnMesh.position.set(0, height / 2, 0);

    this.group.add(bottomMesh, topMesh, columnMesh);

    this.group.position.set(x, y, z);
    this.group.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
    });
  }

  getMesh() {
    return this.group;
  }
}

export { MyCircularTable };
