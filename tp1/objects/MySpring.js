import * as THREE from "three";
import { MyObject } from "./MyObject.js";

class MySpring extends MyObject {
  constructor(x, y, z) {
    super(x, y, z)
    this.loops = 4;

    const dX = 0.2
    const dY = 0.15
    const dZ = 0.05
    for (let i = 0; i < 6; i++) {
        const deltaZ = dZ * 2 * i
      const curveTop = new THREE.CubicBezierCurve3(
        new THREE.Vector3(0, 0, deltaZ),
        new THREE.Vector3(0, dY, deltaZ),
        new THREE.Vector3(dX, dY, dZ + deltaZ),
        new THREE.Vector3(dX, 0, dZ + deltaZ)
      );
      const curveBottom = new THREE.CubicBezierCurve3(
        new THREE.Vector3(0, 0, deltaZ + dZ * 2),
        new THREE.Vector3(0, -dY, deltaZ + dZ * 2),
        new THREE.Vector3(dX, -dY, deltaZ + dZ),
        new THREE.Vector3(dX, 0, deltaZ + dZ)
      );
      const material = new THREE.LineBasicMaterial({ color: 0x774444 });

      let points = curveTop.getPoints(50);
      let geometry = new THREE.BufferGeometry().setFromPoints(points);
      let curveObject = new THREE.Line(geometry, material);
      this.group.add(curveObject);

      points = curveBottom.getPoints(50);
      geometry = new THREE.BufferGeometry().setFromPoints(points);
      curveObject = new THREE.Line(geometry, material);
      this.group.add(curveObject);
    }
  }
}

export { MySpring };
