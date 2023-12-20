import { SceneLoader } from "../../loader/SceneLoader.js";
import { View } from "../View.js";
import * as THREE from "three";

const carDistance = 15;
const dampingFactor = 0.1;

class GarageView extends View {
  constructor(model) {
    super(model);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 20;
    this.camera.position.y = 8;

    new SceneLoader(this.scene).load("./assets/scenes/garage/scene.xml");

    let i = 0;
    for (const car of this.model.cars) {
      const group = new THREE.Group();
      group.add(car.model)
      group.position.x = i * carDistance;
      group.rotation.y = -Math.PI / 2 - Math.PI/5;
      this.scene.add(group);
      i++;
    }
  }

  step() {
    const targetPosition = this.camera.position.clone();
    targetPosition.x = carDistance * this.model.selected;

    this.camera.position.lerp(targetPosition, dampingFactor);

    const lookAt = this.camera.position.clone();
    this.camera.lookAt(lookAt.x, 0, 0);
  }
}

export { GarageView };
