import * as THREE from "three";

class Beetle {
  constructor(x, y, z, width = 1.1, height = 1.4) {
    this.width = width;
    this.height = height;
    this.group = new THREE.Group();

    this.canvasMaterial = new THREE.MeshPhongMaterial({
      color: "#fff",
      specular: "#000000",
      emissive: "#000000",
      shininess: 60,
    });
    this.frameMaterial = new THREE.MeshPhongMaterial({
      color: "#525826",
      specular: "#000000",
      emissive: "#000000",
      shininess: 60,
    });

    const canvas = new THREE.BoxGeometry(0.04, height - 0.2, width - 0.2);
    this.canvasMesh = new THREE.Mesh(canvas, this.canvasMaterial);
    this.canvasMesh.position.x = 0.001;
    this.group.add(this.canvasMesh);

    const frame = new THREE.BoxGeometry(0.04, height, width);
    this.frameMesh = new THREE.Mesh(frame, this.frameMaterial);
    this.group.add(this.frameMesh);

    this.group.position.set(x, y, z);

    this.createCurves();
  }

  createCurves() {
    this.curveGroup = new THREE.Group();
    this.createCurve([[-4, -4], [-4, 4], [0, 4], [0, 4]]) // back
    this.createCurve([[-4, -4], [-4, -1], [-1, -1], [-1, -4]]) // wheel left
    this.createCurve([[1, -4], [1, -1], [4, -1], [4, -4]]) // wheel right
    this.createCurve([[0, 4], [2, 4], [2, 0], [2, 0]]) // front
    this.createCurve([[2, 0], [4, 0], [4, -4], [4, -4]]) // bumper

    this.curveGroup.rotateY(Math.PI / 2);
    this.curveGroup.position.x = 0.05;
    this.group.add(this.curveGroup);
  }

  createCurve(points) {
    let unitX = this.width / 14;
    let unitY = this.height / 18;
    let curve = 
      new THREE.CubicBezierCurve(
        new THREE.Vector2(unitX * points[0][0], unitY * points[0][1]),
        new THREE.Vector2(unitX * points[1][0], unitY * points[1][1]),
        new THREE.Vector2(unitX * points[2][0], unitY * points[2][1]),
        new THREE.Vector2(unitX * points[3][0], unitY * points[3][1]),
      )
    const curvePoints = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);

    const material = new THREE.LineBasicMaterial({ color: 0x000 });

    const curveObject = new THREE.Line(geometry, material);
    this.curveGroup.add(curveObject);
  }

  getMesh() {
    return this.group;
  }
}

export { Beetle };
