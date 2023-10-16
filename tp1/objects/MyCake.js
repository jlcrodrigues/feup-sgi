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

    let map = new THREE.TextureLoader().load("textures/cake.png");
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(2, 2);
    const cakeMaterial = new THREE.MeshPhongMaterial({
      //color: "#5c300e",
      color: "#64231a",
      diffuse: "#964B00",
      emissive: "#311",
       map:map
    });
    map = new THREE.TextureLoader().load("textures/cake_inside.jpg");
    const cakeInsideMaterial = new THREE.MeshPhongMaterial({
      color: "#fdd",
      emissive: "#311",
      map: map,
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
    const map = new THREE.TextureLoader().load("textures/candle.webp");
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    const candleMaterial = new THREE.MeshPhongMaterial({
      color: "#eeeeee",
      shininess: 30,
      map: map
    });
    const radius = 0.01;
    const candle = new THREE.CylinderGeometry(radius, radius, 0.2);
    const candleMesh = new THREE.Mesh(candle, candleMaterial);

    candleMesh.translateZ(-radius);
    candleMesh.translateY(this.height - 0.08);
    this.group.add(candleMesh);
  }

  buildFlame() {
    const map = new THREE.TextureLoader().load("textures/fire.avif");
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    const flameMaterial = new THREE.MeshPhongMaterial({
      color: "#e25822",
      specular: "#e25822",
      emissive: "#e25822",
      shininess: 50,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
      map: map
    });
    let h = 0.03, r = 0.008
    const flame = new THREE.Group()
    const top = new THREE.ConeGeometry(r, h, 32);
    const topMesh = new THREE.Mesh(top, flameMaterial);
    // draw half a sphere
    const base = new THREE.SphereGeometry(r, 32, 32, 0, Math.PI);
    const baseMesh = new THREE.Mesh(base, flameMaterial);
    baseMesh.translateY(-h / 2);
    baseMesh.rotateX(Math.PI / 2);
    flame.add(topMesh, baseMesh);
    flame.translateY(this.height + 0.04);
    flame.translateZ(-0.01);
    this.group.add(flame);
  }
}

export { MyCake };
