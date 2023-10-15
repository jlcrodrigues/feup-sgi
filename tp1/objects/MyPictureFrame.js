import * as THREE from "three";
import { MyObject } from "./MyObject.js";

class MyPictureFrame extends MyObject {
  constructor(x, y, z, texturePath, color = "#fff", width = 1.1, height = 1.4) {
    super(x, y, z);
    const canvasTexture = new THREE.TextureLoader().load(texturePath);
    canvasTexture.wrapS = THREE.RepeatWrapping;
    canvasTexture.wrapT = THREE.RepeatWrapping;

    const canvasMaterial = new THREE.MeshPhongMaterial({
      color: color,
      map: canvasTexture,
    });
    const frameMaterial = new THREE.MeshPhongMaterial({
      color: "#525826",
      shininess: 60,
    });

    const canvas = new THREE.BoxGeometry(0.04, height - 0.2, width - 0.2);
    const canvasMesh = new THREE.Mesh(canvas, canvasMaterial);
    canvasMesh.position.x = 0.001;
    this.group.add(canvasMesh);

    const frame = new THREE.BoxGeometry(0.04, height, width);
    const frameMesh = new THREE.Mesh(frame, frameMaterial);
    this.group.add(frameMesh);

    this.group.traverse((child) => {
      child.receiveShadow = true;
    });
  }
}

export { MyPictureFrame };
