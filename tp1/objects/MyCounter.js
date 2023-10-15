import * as THREE from "three";
import { MyObject } from "./MyObject.js";

class MyCounter extends MyObject {
  constructor(x, y, z) {
    super(x, y, z);

    this.buildCounter();
    this.buildCounterTop();
  }

  /** Build counter's wooden section */
  buildCounter() {
    const textureBot = new THREE.TextureLoader().load("textures/wood.jpg");
    const bottomMaterial = new THREE.MeshPhongMaterial({
      color: "#694b36",
      specular: "#000000",
      emissive: "#000000",
      shininess: 50,
      map: textureBot,
    });

    this.b1 = [1, 2, 2.5];
    const bottom1 = new THREE.BoxGeometry(...this.b1);
    const bottom1Mesh = new THREE.Mesh(bottom1, bottomMaterial);
    bottom1Mesh.position.set(...this.b1.map((x) => x / 2));
    this.group.add(bottom1Mesh);

    this.b2 = [1, 2, 1.5];
    const bottom2 = new THREE.BoxGeometry(...this.b2);
    const bottom2Mesh = new THREE.Mesh(bottom2, bottomMaterial);
    bottom2Mesh.position.set(0.115, 2 / 2, 2.68);
    bottom2Mesh.rotateY(-Math.PI / 4);
    this.group.add(bottom2Mesh);
  }

  /** Build Counter's granite section */
  buildCounterTop() {
    let textureTop = new THREE.TextureLoader().load("textures/granite.jpg");
    textureTop.wrapS = THREE.RepeatWrapping;
    textureTop.wrapT = THREE.RepeatWrapping;
    let topMaterial = new THREE.MeshPhongMaterial({
      specular: "#000000",
      emissive: "#000000",
      shininess: 50,
      map: textureTop,
    });

    textureTop.repeat.set(1, 2);
    let edgeWidth = 0.05;
    let t1 = this.b1.map((x) => x + edgeWidth);
    t1[1] = 0.1;
    const top1 = new THREE.BoxGeometry(...t1);
    let top1Mesh = new THREE.Mesh(top1, topMaterial);
    top1Mesh.position.set(this.b1[0] / 2 - 0.01, 2, this.b1[2] / 2);
    top1Mesh.receiveShadow = true;
    this.group.add(top1Mesh);

    let t2 = this.b2.map((x) => x + edgeWidth);
    t2[1] = 0.1;
    const top2 = new THREE.BoxGeometry(...t2);
    let top2Mesh = new THREE.Mesh(top2, topMaterial);
    top2Mesh.position.set(0.115, 2, 2.67);
    top2Mesh.rotateY(-Math.PI / 4);
    top2Mesh.receiveShadow = true;
    this.group.add(top2Mesh);
  }
}

export { MyCounter };
