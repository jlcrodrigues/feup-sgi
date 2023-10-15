import * as THREE from "three";

class MyObject {
  constructor(x, y, z) {
    this.group = new THREE.Group();
    this.group.position.set(x, y, z);
  }

  getMesh() {
    return this.group;
  }
}

export { MyObject };
