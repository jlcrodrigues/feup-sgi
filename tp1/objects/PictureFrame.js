import * as THREE from "three";

class PictureFrame {
  constructor(x, y, z, texturePath, color="#fff", width=1.1, height=1.4) {
    this.group = new THREE.Group();

    this.canvasTexture = new THREE.TextureLoader().load(texturePath);
    this.canvasTexture.wrapS = THREE.RepeatWrapping;
    this.canvasTexture.wrapT = THREE.RepeatWrapping;

    this.canvasMaterial = new THREE.MeshPhongMaterial({
      color: color,
      map: this.canvasTexture,
    });
    this.frameMaterial = new THREE.MeshPhongMaterial({
      color: "#525826",
      specular: "#000000",
      emissive: "#000000",
      shininess: 60,
    });

    const canvas = new THREE.BoxGeometry(0.04, height - 0.2, width - 0.2);
    this.canvasMesh = new THREE.Mesh(canvas, this.canvasMaterial);
    this.canvasMesh.position.x = 0.001
    this.group.add(this.canvasMesh);

    const frame = new THREE.BoxGeometry(0.04, height, width);
    this.frameMesh = new THREE.Mesh(frame, this.frameMaterial);
    this.group.add(this.frameMesh);
    

    this.group.position.set(x, y, z)
  }

  getMesh() {
    return this.group;
  }
}

export { PictureFrame };
