import * as THREE from "three";
import { MyNurbsBuilder } from "../MyNurbsBuilder.js";
import { MyObject } from "./MyObject.js";

class MyNewspaper extends MyObject {
  constructor(x, y, z) {
    super(x, y, z)

    const map = new THREE.TextureLoader().load("textures/newspaper.png");
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.rotation = Math.PI / 2
    map.anisotropy = 16;
    map.colorSpace = THREE.SRGBColorSpace;

    this.material = new THREE.MeshLambertMaterial({
      map: map,
      side: THREE.DoubleSide,
    });

    this.createNurb();

    this.group.position.set(x, y, z);
  }

  createNurb() {
    let orderU = 1;
    let orderV = 3;

    let controlPoints = [
      // U = 0
      [
        // V = 0..1;
        [0, 0, 0.0, 1],
        [0.1, -0.1, 0.0, 1],
        [0.7, -0.1, 0.0, 1],
        [0.8, 0, 0.0, 1],
      ],
      // U = 1
      [
        // V = 0..1
        [0, 0, 1.2, 1],
        [0.1, -0.1, 1.2, 1],
        [0.7, -0.1, 1.2, 1],
        [0.8, 0.0, 1.2, 1],
      ],
    ];

    const samplesU = 12;
    const samplesV = 12;

    const builder = new MyNurbsBuilder();
    const surfaceData = builder.build(
      controlPoints,
      orderU,
      orderV,
      samplesU,
      samplesV,
      this.material
    );

    const mesh = new THREE.Mesh(surfaceData, this.material);
    this.group.add(mesh);
  }
}

export { MyNewspaper };
