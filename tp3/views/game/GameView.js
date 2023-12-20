import { SceneLoader } from "../../loader/SceneLoader.js";
import { View } from "../View.js";
import * as THREE from "three";
import { TrackBuilder } from "./TrackBuilder.js";

const dampingFactor = 0.1

class GameView extends View {
  constructor(model) {
    super(model);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = -20;
    this.camera.position.y = 20;

    new SceneLoader(this.scene).load("assets/scenes/monza/scene.xml");
    this.scene.add(new TrackBuilder().build(model.track));

    this.car = this.model.car.model
    this.scene.add(this.car);
  }

  step() {
    this.car.position.x = this.model.car.position.x;
    this.car.position.z = this.model.car.position.z;

    this.car.rotation.y = -this.model.car.rotation;

    const targetPosition = this.car.position.clone();
    targetPosition.y += 10;
    targetPosition.x -= 20 * Math.cos(-this.car.rotation.y);
    targetPosition.z -= 20 * Math.sin(-this.car.rotation.y);

    this.camera.position.lerp(targetPosition, dampingFactor);
    this.camera.lookAt(this.car.position);
  }
}

export { GameView };
