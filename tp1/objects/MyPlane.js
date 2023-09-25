import * as THREE from "three";

class MyPlane {
  constructor(color, x=0, y=0, z=0, rotated=false) {
    const planeMaterial = new THREE.MeshPhongMaterial({
      color: color,
      specular: "#777777",
      emissive: "#000000",
      shininess: 30,
      side: THREE.DoubleSide,
    });
    this.plane = new THREE.PlaneGeometry(10, 10);
    if (rotated) {
        this.plane.rotateY(Math.PI / 2)
    }
    this.planeMesh = new THREE.Mesh(this.plane, planeMaterial);
    this.planeMesh.position.set(x, y, z)
  }

  getMesh() {
    return this.planeMesh;
  }
}

export { MyPlane };
