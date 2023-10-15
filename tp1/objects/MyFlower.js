import * as THREE from "three";
import { MyNurbsBuilder } from "../MyNurbsBuilder.js";

class MyFlower {
  constructor(x, y, z, color = "#faa") {
    this.color = color;
    this.group = new THREE.Group();

    this.createMaterials();

    this.createStem();
    this.createHead();

    this.group.position.set(x, y, z);
    this.group.translateY(0.45)
    this.group.translateX(0.15)
  }

  /** Creates all the flower's petals and center */
  createHead() {
    const head = new THREE.Group();
    const center = new THREE.CylinderGeometry(0.03, 0.03, 0.02, 32);
    let meshCenter = new THREE.Mesh(center, this.centerMaterial);
    head.add(meshCenter);

    let petal = this.createPetal();

    let petals = 8;
    for (let i = 0; i < petals; i++) {
      let mesh = petal.clone();
      mesh.rotateY((Math.PI * 2 * i) / petals);
      head.add(mesh);
    }
    head.rotateZ(- Math.PI / 7);

    this.group.add(head);
  }

  /** Creates a single petal */
  createPetal() {
    this.samplesU = 12;
    this.samplesV = 20;

    let controlPoints = [
      // U = 0
      [
        // V = 0..1;
        [-0.0, 0.6, -4.0, 1],
        [-1.8, 0.2, -4.0, 1],
        [-1.0, 0.0, 0.0, 1],
      ],
      [
        // V = 0..1;
        [-0.0, 0.6, -4.0, 1],
        [-0.0, 0.6, -4.0, 1],
        [-0.0, 0.2, 0.0, 1],
      ],
      // U = 1
      [
        // V = 0..1
        [0.0, 0.6, -4.0, 1],
        [1.8, 0.2, -4.0, 1],
        [1.0, 0.0, 0.0, 1],
      ],
    ];

    let builder = new MyNurbsBuilder();
    let surfaceData = builder.build(
      controlPoints,
      controlPoints.length - 1,
      controlPoints[0].length - 1,
      this.samplesU,
      this.samplesV,
      this.material
    );

    let mesh = new THREE.Mesh(surfaceData, this.petalMaterial);
    mesh.scale.divideScalar(25);
    return mesh;
  }

  createStem() {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.7, -2.0, 0),
      new THREE.Vector3(-0.7, -0.45, 0),
      new THREE.Vector3(0.0, 0, 0)
    );

    const geometry = new THREE.TubeGeometry(curve, 64, 0.04);

    let mesh = new THREE.Mesh(geometry, this.stemMaterial);
    mesh.scale.divideScalar(5);
    this.group.add(mesh);
  }

  createMaterials() {
    const map = new THREE.TextureLoader().load("textures/petal.jpg");
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;
    map.colorSpace = THREE.SRGBColorSpace;

    this.centerMaterial = new THREE.MeshPhongMaterial({
      map: map,
      color: "#DEAA26",
    });

    this.petalMaterial = new THREE.MeshLambertMaterial({
      map: map,
      color: this.color,
      side: THREE.DoubleSide,
    });

    this.stemMaterial = new THREE.MeshLambertMaterial({
      map: map,
      color: "#006c00",
      side: THREE.DoubleSide,
    });
  }

  getMesh() {
    return this.group;
  }
}

export { MyFlower };