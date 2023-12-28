import { App } from "../../App.js";
import { SceneLoader } from "../../loader/SceneLoader.js";
import { View } from "../View.js";
import * as THREE from "three";

const carDistance = 20;
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
    this.camera.position.z = 26;
    this.camera.position.y = 6;

    new SceneLoader(this.scene).load("./assets/scenes/garage/scene.xml");

    let i = 0;
    for (const car of this.model.cars) {
      const group = new THREE.Group();
      group.add(car.model);
      group.position.x = i * carDistance;
      group.position.z = 10;
      group.rotation.y = -Math.PI / 2 + 0.2;
      this.scene.add(group);
      i++;
    }

    console.log(this.model.cars);

    this.loadHud();
  }

  step() {
    const targetPosition = this.camera.position.clone();
    targetPosition.x = carDistance * this.model.selected;

    if (!App.controlsActive) {
      this.camera.position.lerp(targetPosition, dampingFactor);
      const lookAt = this.camera.position.clone();
      this.camera.lookAt(lookAt.x, 0, 0);
    }

    this.stepHud();
  }

  stepHud() {
    document.querySelector("#car-name").innerHTML =
      this.model.cars[this.model.selected].name;
    document.querySelector("#car-description").innerHTML =
      this.model.cars[this.model.selected].description ?? "";

    const barInHeight = 8;
    const barOutHeight = 10;
    const barMaxWidth = 100;
    document.querySelector("#specs-in").innerHTML = `
    <div class="range">
      <p>Speed</p>
      <div style="width:${barMaxWidth}; height:${barInHeight}" class="range-out">
        <div style="width:${
          (this.model.cars[this.model.selected].maxSpeed /
            this.model.maxMaxSpeed) *
          barMaxWidth
        }; height:${barOutHeight}px;" class="range-in"></div>
        </div>
      </div>

    <div class="range">
      <p>Acceleration</p>
      <div style="width:${barMaxWidth}; height:${barInHeight}" class="range-out">
        <div style="width:${
          (this.model.cars[this.model.selected].maxAcceleration /
            this.model.maxAcceleration) *
          barMaxWidth
        }; height:${barOutHeight}px;" class="range-in"></div>
        </div>
        </div>

    <div class="range">
      <p>Handling</p>
      <div style="width:${barMaxWidth}; height:${barInHeight}" class="range-out">
        <div style="width:${
          (this.model.cars[this.model.selected].defaultAngularSpeed /
            this.model.maxAngularSpeed) *
          barMaxWidth
        }; height:${barOutHeight}px;" class="range-in"></div>
        </div>
        </div>
        
    </div>
    `;
  }

  loadHud() {
    document.querySelector("#center-bottom").innerHTML = `
    <div id="garage-hud">
      <div>
        <div id="car-name"></div>
        <div id="car-description"></div>
      </div>
      <div id="specs">
        <p>Car Specs</p>
        <div id="specs-in"></div>
      </div>
      </div>
    `;
  }

  cleanup() {
    document.querySelector("#center-bottom").innerHTML = "";
  }
}

export { GarageView };
