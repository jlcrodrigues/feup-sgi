import * as THREE from "three";
import { MyObject } from "./MyObject.js";

class MyCake extends MyObject {
  constructor(x, y, z) {
    super(x, y, z);
    this.height = 0.3;

    this.buildCake();
    this.buildCandle();
    this.buildFlame();

    this.group.traverse((child) => {
      child.castShadow = false;
      child.receiveShadow = true;
    });
  }

  buildCake() {
    const radius = 0.3;

    const cakeMaterial = new THREE.MeshPhongMaterial({
      color: "#5c300e",
    });
    const cakeInsideMaterial = new THREE.MeshPhongMaterial({
      color: "#ff0000",
      emissive: "#000000",
      side: THREE.DoubleSide,
    });

    const cakeGeometry = new THREE.CylinderGeometry(
      radius,
      radius,
      this.height,
      32,
      1,
      false,
      0,
      (Math.PI * 15) / 8
    );
    const cakeMesh = new THREE.Mesh(cakeGeometry, cakeMaterial);

    const slice1 = new THREE.PlaneGeometry(radius * 2, this.height);
    slice1.rotateY(Math.PI / 2);
    const sliceMesh1 = new THREE.Mesh(slice1, cakeInsideMaterial);

    const slice2 = new THREE.PlaneGeometry(radius * 2, this.height);
    const sliceMesh2 = new THREE.Mesh(slice2, cakeInsideMaterial);
    sliceMesh2.rotateY(Math.PI / 2 + -Math.PI / 8);

    this.group.add(cakeMesh, sliceMesh1, sliceMesh2);
  }

  buildCandle() {
    const candleMaterial = new THREE.MeshPhongMaterial({
      color: "#eeeeee",
      shininess: 30,
    });
    const radius = 0.01;
    const candle = new THREE.CylinderGeometry(radius, radius, 0.2);
    const candleMesh = new THREE.Mesh(candle, candleMaterial);

    candleMesh.translateZ(-radius);
    candleMesh.translateY(this.height - 0.08);
    this.group.add(candleMesh);
  }

  buildFlame() {
    const flameMaterial = new THREE.MeshPhongMaterial({
      color: "#e25822",
      specular: "#e25822",
      emissive: "#e25822",
      shininess: 50,
      side: THREE.DoubleSide,
    });
    const flame = new THREE.ConeGeometry(0.01, 0.03, 32);
    flame.rotateX(Math.PI);
    const flameMesh = new THREE.Mesh(flame, flameMaterial);
    flameMesh.translateY(this.height + 0.04);
    this.group.add(flameMesh);
  }
}

export { MyCake };
