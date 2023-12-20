import { SceneLoader } from "../../loader/SceneLoader.js";
import { View } from "../View.js";
import * as THREE from "three";


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
    this.camera.position.z = -50;
    this.camera.position.y = 30;

    new SceneLoader(this.scene).load("./assets/scenes/garage/scene.xml");
    this.scene.add(this.model.cars[0].model)
  }

  step() {
  }
}

export { GarageView };
