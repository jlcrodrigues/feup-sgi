import * as THREE from "three";
import { MyObject } from "./MyObject.js";

const edge = 0.3

class MyBench extends MyObject {
  static legSupport;
  static top;

  constructor(x, y, z, height = 1) {
    super(x, y, z)
    this.height = height;

    this.buildTop();
    this.buildLegs();

    this.group.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
    });
  }

  buildTop() {
    const clothTexture = new THREE.TextureLoader().load(
      "textures/rose_cloth.jpg"
    );
    clothTexture.wrapS = THREE.RepeatWrapping;
    clothTexture.wrapT = THREE.RepeatWrapping;

    const topMaterial = new THREE.MeshPhongMaterial({
      color: "#edd",
      specular: "#000000",
      emissive: "#000000",
      shininess: 50,
      map: clothTexture,
    });

    const topHeight = 0.3;
    if (this.top === undefined)
      this.top = new THREE.BoxGeometry(edge * 2, topHeight, edge * 2);
    const topMesh = new THREE.Mesh(this.top, topMaterial);
    topMesh.position.set(0, this.height + topHeight / 2, 0);
    this.group.add(topMesh);
  }

  buildLegs() {
    const woodenTexture = new THREE.TextureLoader().load("textures/wood.jpg");
    woodenTexture.wrapS = THREE.RepeatWrapping;
    woodenTexture.wrapT = THREE.RepeatWrapping;

    const legMaterial = new THREE.MeshPhongMaterial({
      color: "#7d533e",
      specular: "#000000",
      emissive: "#000000",
      shininess: 50,
      map: woodenTexture,
    });

    const d = 0.1;
    const dx = [-1, -1, 1, 1];
    const dy = [-1, 1, -1, 1];

    const leg = new THREE.BoxGeometry(d, this.height, d);
    for (let i = 0; i < 4; i++) {
      const legMesh = new THREE.Mesh(leg, legMaterial);
      legMesh.position.set(
        dx[i] * (edge - d / 2),
        this.height / 2,
        dy[i] * (edge - d / 2)
      );
      this.group.add(legMesh);
    }

    const legSupportHeight = this.height * 0.4;
    if (this.legSupport === undefined)
      this.legSupport = new THREE.BoxGeometry(edge * 2, d, d);
    const legSupport = this.legSupport;
    const legSupportMesh1 = new THREE.Mesh(legSupport, legMaterial);
    legSupportMesh1.position.set(0, legSupportHeight, edge / 2 + d);
    this.group.add(legSupportMesh1);
    this.group.add(legSupportMesh1.clone().translateZ(-edge - d * 2));
    this.group.add(
      legSupportMesh1
        .clone()
        .rotateY(Math.PI / 2)
        .translateZ(-edge / 2 - d)
        .translateX(edge / 2 + d)
    );
    this.group.add(
      legSupportMesh1
        .clone()
        .rotateY(Math.PI / 2)
        .translateZ(edge / 2 + d)
        .translateX(edge / 2 + d)
    );
  }
}

export { MyBench };
