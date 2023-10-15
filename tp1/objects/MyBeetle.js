import * as THREE from "three";

class MyBeetle {
  constructor(x, y, z, width = 1.1, height = 1.4) {
    this.width = width;
    this.height = height;
    this.group = new THREE.Group();

    const canvasMaterial = new THREE.MeshPhongMaterial({
      color: "#fff",
      specular: "#000000",
      emissive: "#000000",
      shininess: 60,
    });
    const frameMaterial = new THREE.MeshPhongMaterial({
      color: "#525826",
      specular: "#000000",
      emissive: "#000000",
      shininess: 60,
    });

    const canvas = new THREE.BoxGeometry(0.04, height - 0.2, width - 0.2);
    const canvasMesh = new THREE.Mesh(canvas, canvasMaterial);
    canvasMesh.receiveShadow = true;
    canvasMesh.position.x = 0.001;
    this.group.add(canvasMesh);

    const frame = new THREE.BoxGeometry(0.04, height, width);
    const frameMesh = new THREE.Mesh(frame, frameMaterial);
    this.group.add(frameMesh);

    this.group.position.set(x, y, z);

    this.createCurves();
  }

  createCurves() {
    this.curveGroup = new THREE.Group();
    const oX = -4; // start on X axis
    const oY = -2; // start on Y axis
    let r = 4,
      h = this.getQuarterH(r);
    this.createCurve([
      [-r, -r / 2],
      [-r, -r / 2 + h],
      [-h, r / 2],
      [0, r / 2],
    ]); // back
    (r = 1.5), (h = r * (4 / 3));
    this.createCurve([
      [oX, oY],
      [oX, oY + h],
      [oX + r * 2, oY + h],
      [oX + r * 2, oY],
    ]); // wheel left
    this.createCurve([
      [1, oY],
      [1, oY + h],
      [1 + r * 2, oY + h],
      [1 + r * 2, oY],
    ]); // wheel right
    (r = 2), (h = this.getQuarterH(r));
    this.createCurve([
      [0, r],
      [h, r],
      [r, h],
      [r, 0],
    ]); // front
    this.createCurve([
      [2, 0],
      [2 + h, 0],
      [2 + r, -r + h],
      [2 + r, -r],
    ]); // bumper

    this.curveGroup.rotateY(Math.PI / 2);
    this.curveGroup.position.x = 0.05;
    this.group.add(this.curveGroup);
  }

  createCurve(points) {
    const curve = new THREE.CubicBezierCurve(
      new THREE.Vector2(points[0][0], points[0][1]),
      new THREE.Vector2(points[1][0], points[1][1]),
      new THREE.Vector2(points[2][0], points[2][1]),
      new THREE.Vector2(points[3][0], points[3][1])
    );
    const curvePoints = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);

    const material = new THREE.LineBasicMaterial({ color: 0x000 });

    const curveObject = new THREE.Line(geometry, material);
    curveObject.scale.divideScalar(10);
    this.curveGroup.add(curveObject);
  }

  getQuarterH(r) {
    return r * (4 / 3) * (Math.sqrt(2) - 1);
  }

  getMesh() {
    return this.group;
  }
}

export { MyBeetle };
