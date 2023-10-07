import * as THREE from "three";

class Spring {
  constructor(x, y, z, width = 1.1, height = 1.4) {
    this.width = width;
    this.height = height;
    this.loops = 4;
    this.group = new THREE.Group();

    let dX = 0.2
    let dY = 0.15
    let dZ = 0.05
    for (let i = 0; i < 6; i++) {
        let deltaZ = dZ * 2 * i
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

    this.group.position.set(x, y, z);

    this.createCurves();
  }

  createCurves() {}

  getMesh() {
    return this.group;
  }
}

export { Spring };
