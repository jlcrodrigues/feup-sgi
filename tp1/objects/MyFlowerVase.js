import * as THREE from "three";
import { MyNurbsBuilder } from "../MyNurbsBuilder.js";
import { MyFlower } from "./MyFlower.js";
import { MyObject } from "./MyObject.js";

class MyFlowerVase extends MyObject {
  constructor(x, y, z) {
    super(x, y, z);

    const map = new THREE.TextureLoader().load("textures/clay.avif");
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.rotation = Math.PI / 2;
    map.anisotropy = 16;
    map.colorSpace = THREE.SRGBColorSpace;

    this.material = new THREE.MeshLambertMaterial({
      map: map,
      side: THREE.DoubleSide,
    });

    this.samplesU = 12;
    this.samplesV = 12;

    const mesh = this.createNurb();
    this.group.add(mesh);
    const mesh2 = mesh.clone();
    mesh2.rotation.y = Math.PI;
    this.group.add(mesh2);

    this.createFlowers();

    this.createDirt();

    this.group.position.set(x, y, z);
    this.group.translateY(-0.1);
  }

  createFlowers() {
    const flower1 = new MyFlower(0, 0, 0, "#e0115f");
    this.group.add(flower1.getMesh());

    const flower2 = new MyFlower(-0.2, 0, -0.05, "#f19cbb");
    flower2.getMesh().scale.divideScalar(1.5);
    flower2.getMesh().rotateY(Math.PI / 2);
    this.group.add(flower2.getMesh());

    const flower3 = new MyFlower(-0.2, 0, 0.2, "#f88379");
    flower3.getMesh().scale.divideScalar(1.5);
    flower3.getMesh().rotateY(-Math.PI / 2);
    this.group.add(flower3.getMesh());
  }

  createNurb() {
    const orderU = 3;
    const orderV = 3;

    // z, y, x
    let controlPoints = [
      // U = 0
      [
        // V = 0..1;
        [0, 0.0, -0.1, 1],
        [0.0, 0.0, -0.2, 1],
        [0.0, 0.25, -0.25, 1],
        [0, 0.25, -0.15, 1],
      ],
      // U = 1
      [
        // V = 0..1
        [0, 0.0, -0.2, 1],
        [0.33, 0.0, -0.2, 1],
        [0.33, 0.25, -0.2, 1],
        [0.25, 0.25, -0.2, 1],
      ],
      // U = 1
      [
        // V = 0..1
        [0, 0.0, 0.2, 1],
        [0.33, 0.0, 0.2, 1],
        [0.33, 0.25, 0.2, 1],
        [0.25, 0.25, 0.2, 1],
      ],
      // U = 3
      [
        // V = 0..1
        [0, 0.0, 0.1, 1],
        [0, 0.0, 0.2, 1],
        [0, 0.25, 0.25, 1],
        [0, 0.25, 0.15, 1],
      ],
    ];

    const builder = new MyNurbsBuilder();
    const surfaceData = builder.build(
      controlPoints,
      orderU,
      orderV,
      this.samplesU,
      this.samplesV,
      this.material
    );

    const mesh = new THREE.Mesh(surfaceData, this.material);
    return mesh;
  }

  createDirt() {
    const map = new THREE.TextureLoader().load("textures/dirt.jpg");
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;
    map.colorSpace = THREE.SRGBColorSpace;

    this.centerMaterial = new THREE.MeshPhongMaterial({
      map: map,
      color: "#9b7653",
    });

    const center = new THREE.CylinderGeometry(0.2, 0, 0.2, 32);
    let meshCenter = new THREE.Mesh(center, this.centerMaterial);
    meshCenter.translateY(0.1);
    this.group.add(meshCenter);
  }
}

export { MyFlowerVase };
