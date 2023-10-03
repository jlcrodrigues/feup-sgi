import * as THREE from "three";

class MyCake {
  constructor(x, y, z) {
    this.cakeHeight = 0.3;
    this.buildCake(x, y, z);
    this.buildCandle(x, y, z);
    this.buildFlame(x, y, z);
  }

  buildCake(x, y, z) {
    this.cake = new THREE.Group()
    const radius = 0.3
    const cakeMaterial = new THREE.MeshPhongMaterial({
      color: "#5c300e",
      specular: "#777777",
      emissive: "#000000",
      shininess: 50,
      side: THREE.DoubleSide,
    });
    const cakeInsideMaterial = new THREE.MeshPhongMaterial({
      color: "#ff0000",
      specular: "#777777",
      emissive: "#000000",
      side: THREE.DoubleSide,
    });
    const cakeGeometry = new THREE.CylinderGeometry(
      radius,
      radius,
      this.cakeHeight,
      32,
      1,
      false,
      0,
      (Math.PI * 15) / 8
    );
    const slice1 = new THREE.PlaneGeometry(radius * 2, this.cakeHeight);
    slice1.rotateY(Math.PI/2)
    const sliceMesh1 = new THREE.Mesh(slice1, cakeInsideMaterial)
    sliceMesh1.position.set(x, y, z)

    const slice2 = new THREE.PlaneGeometry(radius * 2, this.cakeHeight);
    slice2.rotateY(Math.PI/2 + -Math.PI/8)
    const sliceMesh2 = new THREE.Mesh(slice2, cakeInsideMaterial)
    sliceMesh2.position.set(x, y, z)

    const cakeMesh = new THREE.Mesh(cakeGeometry, cakeMaterial);
    cakeMesh.position.set(x, y, z);

    this.cake.add(cakeMesh, sliceMesh1, sliceMesh2)
  };

  buildCandle(x, y, z) {
    this.candleMaterial = new THREE.MeshPhongMaterial({
      color: "#eeeeee",
      specular: "#777777",
      emissive: "#000000",
      shininess: 30,
      side: THREE.DoubleSide,
    });
    const radius = 0.01
    this.candle = new THREE.CylinderGeometry(radius, radius, 0.2);
    this.candleMesh = new THREE.Mesh(this.candle, this.candleMaterial);

    this.candleMesh.position.x = x;
    this.candleMesh.position.z = z;
    this.candleMesh.position.y = y + this.cakeHeight - 0.08;
  };

  buildFlame(x, y, z) {
    const flameMaterial = new THREE.MeshPhongMaterial({
      color: "#e25822",
      specular: "#e25822",
      emissive: "#e25822",
      shininess: 50,
      side: THREE.DoubleSide,
    });
    const flame = new THREE.ConeGeometry(0.01, 0.03, 32);
    flame.rotateX(Math.PI)
    
    this.flameMesh = new THREE.Mesh(flame, flameMaterial);
    
    this.flameMesh.position.set(x, y + this.cakeHeight + 0.04, z);
  }

  getMesh() {
    let group = new THREE.Group()
    group.add(this.cake)
    group.add(this.candleMesh)
    group.add(this.flameMesh); 
    return group;
  }
}

export { MyCake };
