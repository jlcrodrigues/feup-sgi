import * as THREE from "three";
import { MyObject } from "./MyObject.js";

class MySofa extends MyObject {
  constructor(x, y, z, width = 4, color = "#d05317") {
    super(x, y, z);

    const texture = new THREE.TextureLoader().load("textures/fabric.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    const material = new THREE.MeshPhongMaterial({
      color: color,
      shininess: 50,
      map: texture,
    });

    let depth = 2;
    let armHeight = 0.8;

    const bottom = new THREE.BoxGeometry(width, armHeight, depth);
    const bottomMesh = new THREE.Mesh(bottom, material);
    bottomMesh.position.set(0, armHeight / 2, 0);
    this.group.add(bottomMesh);

    const back = new THREE.BoxGeometry(width, armHeight / 2, depth);
    back.rotateX(Math.PI / 2 - 0.2);
    const backMesh = new THREE.Mesh(back, material);
    backMesh.position.set(0, armHeight, -depth / 2 + 0.15);
    this.group.add(backMesh);

    const arm = new THREE.CylinderGeometry(0.3, 0.3, depth);
    arm.rotateX(Math.PI / 2);
    const armMesh1 = new THREE.Mesh(arm, material);
    armMesh1.position.set(width / 2, armHeight, 0);
    const armMesh2 = new THREE.Mesh(arm, material);
    armMesh2.position.set(-width / 2, armHeight, 0);
    this.group.add(armMesh1, armMesh2);

    this.group.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
    });
  }
}

export { MySofa };
