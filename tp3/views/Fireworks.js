import * as THREE from "three";

const interpolation = 0.03;

class Fireworks {
  constructor(scene) {
    this.material = new THREE.PointsMaterial({
      size: 1,
      color: 0xffffff,
    });

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute("position", new THREE.Float32BufferAttribute([], 3));
    this.points = new THREE.Points(this.geometry, this.material);
    this.scene = scene;
    this.scene.add(this.points);

    this.dest = [];
  }

  launch(count, position) {
    let positions = Array.from(this.geometry.attributes.position.array)
    for (let i = 0; i < count; i++) {
      const point = position.clone();

      positions.push(point.x, point.y, point.z);

      const theta = Math.random() * Math.PI * 2;
      const delta = 5 + Math.random() * 5;

      this.dest.push(new THREE.Vector3(point.x + delta * Math.cos(theta), point.y + 20, point.z + delta * Math.sin(theta)));
    }
    this.geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
    )
  }

  step() {
    let positions = Array.from(this.geometry.attributes.position.array)

    for (let i = 0; i < positions.length; i += 3) {
      const dest = this.dest[i / 3];
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      positions[i] = THREE.MathUtils.lerp(x, dest.x, interpolation);
      positions[i + 1] = THREE.MathUtils.lerp(y, dest.y, interpolation);
      positions[i + 2] = THREE.MathUtils.lerp(z, dest.z, interpolation);

      if (new THREE.Vector3(x, y, z).distanceTo(dest) < 0.2) {
        // remove from array
        positions.splice(i, 3);
        this.dest.splice(i / 3, 1);
      }

    }

    this.geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
    )
    this.geometry.attributes.position.needsUpdate = true;
  }
}

export { Fireworks };
