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

      const material = new THREE.LineBasicMaterial({ color: '#f19cbb' });

      let radius = 0.004
      let ts = 100
      let rs = 20
      let geometry = new THREE.TubeGeometry(curveTop, ts, radius, rs);
      let curveObject = new THREE.Line(geometry, material);
      this.group.add(curveObject);

      geometry = new THREE.TubeGeometry(curveBottom, ts, radius, rs);
      curveObject = new THREE.Line(geometry, material);
      this.group.add(curveObject);
    }
  }
}

export { MySpring };
