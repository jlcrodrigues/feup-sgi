import * as THREE from "three";

const interpolation = 0.1;
const explosionCount = 30;

class Fireworks {
  constructor(scene) {
    this.material = new THREE.PointsMaterial({
      size: 0.5,
      color: 0xffffff,
      vertexColors: true,
    });

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([], 3)
    );
    this.geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute([], 3)
    );
    this.points = new THREE.Points(this.geometry, this.material);
    this.scene = scene;
    this.scene.add(this.points);

    this.dest = [];
    this.ids = [];
    this.curId = 0;
    this.toExplode = [];
  }

  launch(count, position) {
    let positions = Array.from(this.geometry.attributes.position.array);
    let colors = Array.from(this.geometry.attributes.color.array);
    for (let i = 0; i < count; i++) {
      const point = position.clone();

      positions.push(point.x, point.y, point.z);

      const theta = Math.random() * Math.PI * 2;
      const delta = 5 + Math.random() * 5;
      const deltaY = 20;

      colors.push(...this.getRandomColor());

      this.dest.push(
        new THREE.Vector3(
          point.x + delta * Math.cos(theta),
          point.y + deltaY + Math.random() * deltaY,
          point.z + delta * Math.sin(theta)
        )
      );

      this.toExplode.push(this.curId);
      this.ids.push(this.curId);
      this.curId++;
    }
    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    this.geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );
  }

  step() {
    let positions = Array.from(this.geometry.attributes.position.array);
    let colors = Array.from(this.geometry.attributes.color.array);

    for (let i = 0; i < positions.length; i += 3) {
      const dest = this.dest[i / 3];
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      positions[i] = THREE.MathUtils.lerp(x, dest.x, interpolation);
      positions[i + 1] = THREE.MathUtils.lerp(y, dest.y, interpolation);
      positions[i + 2] = THREE.MathUtils.lerp(z, dest.z, interpolation);

      if (new THREE.Vector3(x, y, z).distanceTo(dest) < 0.4) {
        positions.splice(i, 3);
        this.dest.splice(i / 3, 1);
        colors.splice(i, 3);

        if (this.toExplode.includes(this.ids[i / 3])) {
          this.explode(positions, colors, x, y, z);
          this.toExplode.splice(this.toExplode.indexOf(this.ids[i / 3]), 1);
        }
        this.ids.splice(i / 3, 1);
      }
    }

    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    this.geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );
  }

  explode(positions, colors, x, y, z) {
    for (let j = 0; j < explosionCount; j++) {
      const theta = Math.random() * Math.PI * 2;
      const d0 = 0.5
      const d = 6

      positions.push(x, y, z);

      colors.push(...this.getRandomColor());

      this.dest.push(
        new THREE.Vector3(
          x + Math.cos(Math.random() * Math.PI * 2) * (d0 + d * Math.random()),
          y + Math.sin(Math.random() * Math.PI * 2) * (d0 + d * Math.random()),
          z + Math.cos(Math.random() * Math.PI * 2) * (d0 + d * Math.random())
        )
      );

      this.ids.push(this.curId);
    }
  }

  getRandomColor() {
    let color = new THREE.Color();
    color.setHSL(Math.random() * 0.4, 1, 0.2);
    return [color.r, color.g, color.b];
  }
}

export { Fireworks };
