import * as THREE from "three";

class MyBench {
  static legSupport;
  static top;

  constructor(x, y, z, height = 1) {
    this.group = new THREE.Group();
    this.edge = 0.3;
    this.height = height;

    this.buildTop();
    this.buildLegs();

    this.group.position.set(x, y, z);
    this.group.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
    });
  }

  buildTop() {
    let clothTexture = new THREE.TextureLoader().load(
      "textures/rose_cloth.jpg"
    );
    clothTexture.wrapS = THREE.RepeatWrapping;
    clothTexture.wrapT = THREE.RepeatWrapping;

    let topMaterial = new THREE.MeshPhongMaterial({
      color: "#edd",
      specular: "#000000",
      emissive: "#000000",
      shininess: 50,
      map: clothTexture,
    });

    let topHeight = 0.3;
    if (this.top === undefined)
      this.top = new THREE.BoxGeometry(this.edge * 2, topHeight, this.edge * 2);
    let top = this.top;
    let topMesh = new THREE.Mesh(top, topMaterial);
    topMesh.position.set(0, this.height + topHeight / 2, 0);
    this.group.add(topMesh);
  }

  buildLegs() {
    let woodenTexture = new THREE.TextureLoader().load("textures/wood.jpg");
    woodenTexture.wrapS = THREE.RepeatWrapping;
    woodenTexture.wrapT = THREE.RepeatWrapping;

    let legMaterial = new THREE.MeshPhongMaterial({
      color: "#7d533e",
      specular: "#000000",
      emissive: "#000000",
      shininess: 50,
      map: woodenTexture,
    });

    let d = 0.1;
    let dx = [-1, -1, 1, 1];
    let dy = [-1, 1, -1, 1];

    let leg = new THREE.BoxGeometry(d, this.height, d);
    for (let i = 0; i < 4; i++) {
      let legMesh = new THREE.Mesh(leg, legMaterial);
      legMesh.position.set(
        dx[i] * (this.edge - d / 2),
        this.height / 2,
        dy[i] * (this.edge - d / 2)
      );
      this.group.add(legMesh);
    }

    let legSupportHeight = this.height * 0.4;
    if (this.legSupport === undefined)
      this.legSupport = new THREE.BoxGeometry(this.edge * 2, d, d);
    let legSupport = this.legSupport;
    let legSupportMesh1 = new THREE.Mesh(legSupport, legMaterial);
    legSupportMesh1.position.set(0, legSupportHeight, this.edge / 2 + d);
    this.group.add(legSupportMesh1);
    this.group.add(legSupportMesh1.clone().translateZ(-this.edge - d * 2));
    this.group.add(
      legSupportMesh1
        .clone()
        .rotateY(Math.PI / 2)
        .translateZ(-this.edge / 2 - d)
        .translateX(this.edge / 2 + d)
    );
    this.group.add(
      legSupportMesh1
        .clone()
        .rotateY(Math.PI / 2)
        .translateZ(this.edge / 2 + d)
        .translateX(this.edge / 2 + d)
    );
  }

  getMesh() {
    return this.group;
  }
}

export { MyBench };
