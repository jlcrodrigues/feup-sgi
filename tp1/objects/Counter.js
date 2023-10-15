import * as THREE from "three";

class Counter {
  constructor(x, y, z) {
    this.group = new THREE.Group();

    this.buildCounter()
    this.buildCounterTop()

    this.group.position.set(x, y, z)
  }

  /**
   * Build counter's wooden section
   */
  buildCounter() {
    let textureBot = new THREE.TextureLoader().load('textures/wood.jpg');
    textureBot.wrapS = THREE.RepeatWrapping;
    textureBot.wrapT = THREE.RepeatWrapping;
    let bottomMaterial = new THREE.MeshPhongMaterial({
      color: "#694b36",
      specular: "#000000",
      emissive: "#000000",
      shininess: 50,
      map: textureBot
    });

    this.b1 = [1, 2, 2.5]
    const bottom1 = new THREE.BoxGeometry(...this.b1);
    let bottom1Mesh = new THREE.Mesh(bottom1, bottomMaterial);
    bottom1Mesh.position.set(...this.b1.map((x) => x / 2))
    this.group.add(bottom1Mesh);

    this.b2 = [1, 2, 1.5]
    const bottom2 = new THREE.BoxGeometry(...this.b2);
    let bottom2Mesh = new THREE.Mesh(bottom2, bottomMaterial);
    bottom2Mesh.position.set(0.115, 2 / 2, 2.68)
    bottom2Mesh.rotateY(- Math.PI / 4)
    this.group.add(bottom2Mesh);
  }

  buildCounterTop() {
    let textureTop = new THREE.TextureLoader().load('textures/granite.jpg');
    textureTop.wrapS = THREE.RepeatWrapping;
    textureTop.wrapT = THREE.RepeatWrapping;
    let topMaterial = new THREE.MeshPhongMaterial({
      specular: "#000000",
      emissive: "#000000",
      shininess: 50,
      map: textureTop
    });

    textureTop.repeat.set(1, 2)
    let edgeWidth = 0.05
    let t1 = this.b1.map((x) => x + edgeWidth)
    t1[1] = 0.1
    const top1 = new THREE.BoxGeometry(...t1);
    let top1Mesh = new THREE.Mesh(top1, topMaterial);
    top1Mesh.position.set(this.b1[0] / 2 - 0.01, 2, this.b1[2] / 2)
    top1Mesh.receiveShadow = true;
    this.group.add(top1Mesh);

    let t2 = this.b2.map((x) => x + edgeWidth)
    t2[1] = 0.1
    const top2 = new THREE.BoxGeometry(...t2);
    let top2Mesh = new THREE.Mesh(top2, topMaterial);
    top2Mesh.position.set(0.115, 2, 2.67)
    top2Mesh.rotateY(- Math.PI / 4)
    top2Mesh.receiveShadow = true;
    this.group.add(top2Mesh);
  }

  getMesh() {
    return this.group;
  }
}

export { Counter };
