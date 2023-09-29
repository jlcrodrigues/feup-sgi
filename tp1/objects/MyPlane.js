import * as THREE from "three";

class MyPlane {
  constructor(color, x=0, y=0, z=0) {
    const planeMaterial = new THREE.MeshPhongMaterial({
      color: color,
      specular: "#777777",
      emissive: "#000000",
      shininess: 30,
    });
    this.plane = new THREE.PlaneGeometry(10, 10);
    this.planeMesh = new THREE.Mesh(this.plane, planeMaterial);
    this.planeMesh.position.set(x, y, z)
  }

  getMesh() {
    return this.planeMesh;
  }
}

export { MyPlane };
