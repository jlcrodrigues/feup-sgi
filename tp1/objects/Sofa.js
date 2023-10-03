import * as THREE from "three";

class Sofa {
  constructor(x, y, z, width=4, color="#d05317") {
    this.group = new THREE.Group();

    this.texture = new THREE.TextureLoader().load('textures/fabric.png');
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.RepeatWrapping;

    this.material = new THREE.MeshPhongMaterial({
      color: color,
      specular: "#000000",
      emissive: "#000000",
      shininess: 50,
      map: this.texture
    });

    let depth = 2
    let armHeight = 0.8

    const bottom = new THREE.BoxGeometry(width, armHeight, depth);
    this.bottomMesh = new THREE.Mesh(bottom, this.material);
    this.bottomMesh.position.set(0, armHeight / 2, 0)
    this.group.add(this.bottomMesh);

    const back = new THREE.BoxGeometry(width, armHeight / 2, depth);
    back.rotateX(Math.PI / 2 - 0.2)
    this.bottomMesh = new THREE.Mesh(back, this.material);
    this.bottomMesh.position.set(0, armHeight, - depth / 2 + 0.15)
    this.group.add(this.bottomMesh);

    const arm = new THREE.CylinderGeometry(0.3, 0.3, depth);
    arm.rotateX(Math.PI / 2)
    this.armMesh1 = new THREE.Mesh(arm, this.material);
    this.armMesh1.position.set(width / 2, armHeight, 0)
    this.armMesh2 = new THREE.Mesh(arm, this.material);
    this.armMesh2.position.set(- width / 2, armHeight, 0)
    this.group.add(this.armMesh1, this.armMesh2);

    this.group.position.set(x, y, z)
  }

  getMesh() {
    return this.group;
  }
}

export { Sofa };
