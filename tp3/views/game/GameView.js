import { SceneLoader } from "../../loader/SceneLoader.js";
import { View } from "../View.js";
import * as THREE from "three";
import { TrackBuilder } from "./TrackBuilder.js";
import { ModifierView } from "./ModifierView.js";
import { App } from "../../App.js";
import { Car } from "../../models/game/Car.js";
import { Fireworks } from "../Fireworks.js";

const dampingFactor = 0.1;
const modifierAnimationDuration = 2;

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
    this.camera.position.z = -15;
    this.camera.position.x = -20;
    this.camera.position.y = 20;
    this.mixers = [];

    // Load the track scene
    new SceneLoader(this.scene).load("assets/scenes/monza/scene.xml");
    // Load the track
    this.track = new TrackBuilder().build(model.track);
    this.scene.add(this.track);

    // Load player's car
    this.car = this.model.car.model;
    this.scene.add(this.car);

    if (this.model.car.name === "Toyota AE86") {
      this.car.wheel1 = this.car.getObjectByName("Wheel1");
      this.car.wheel2 = this.car.getObjectByName("Wheel3");
      this.car.wheel1.originalRotationX = this.car.wheel1.rotation.x;
      this.car.wheel2.originalRotationX = this.car.wheel2.rotation.x;
    }

    // Load opponent's car
    this.loadOpponent();

    // Load modifiers
    this.loadModifiers();

    this.loadHud();

    this.fireworks = new Fireworks(this.scene);

    this.fireworks.launch(5, new THREE.Vector3(5, 0, 0));
  }

  step() {
    this.stepHud();
    this.stepCar();

    if (!this.startTime) {
      this.startTime = new Date();
    }

    this.stepShaders();

    const targetPosition = this.car.position.clone();
    targetPosition.y += 10;
    targetPosition.x -= 10 * Math.cos(-this.car.rotation.y);
    targetPosition.z -= 10 * Math.sin(-this.car.rotation.y);

    if (!App.controlsActive) {
      this.camera.position.lerp(targetPosition, dampingFactor);
      this.camera.lookAt(this.car.position);
    }

    this.fireworks.step();
    if (this.fireworks.dest.length === 0) {
      this.fireworks.launch(5, new THREE.Vector3(5, 0, 0));
    }

    this.mixers.forEach((mixer) => {
      mixer.update(0.01);
    });
  }

  loadOpponent() {
    this.opponent = this.model.opponent.model;
    this.opponent.position.x = this.model.opponent.position.x - 100;
    this.scene.add(this.opponent);

    const positionKF = new THREE.VectorKeyframeTrack(
      ".position",
      this.model.track.route.times,
      this.model.track.route.values
    );

    let rotations = [0, 0, 0, 1];
    const route = this.model.track.route.values;
    for (let i = 0; i < route.length - 6; i += 3) {
      const value = new THREE.Vector3(route[i], route[i + 1], route[i + 2]);
      const nextValue = new THREE.Vector3(
        route[i + 3],
        route[i + 4],
        route[i + 5]
      );
      const nextNextValue = new THREE.Vector3(
        route[i + 6],
        route[i + 7],
        route[i + 8]
      );
      const q1 = this.getQuaternion(value, nextValue);
      const q2 = this.getQuaternion(value, nextNextValue);

      rotations.push(q1.x, q1.y, q1.z, q1.w);
      rotations.push(q2.x, q2.y, q2.z, q2.w);
    }

    const times = this.model.track.route.times;
    let qTimes = [];
    for (let i = 0; i < times.length - 1; i++) {
      qTimes.push(times[i], (times[i] + times[i + 1]) / 2);
    }
    rotations.push(0, 0, 0, 1);

    const quaternionKF = new THREE.QuaternionKeyframeTrack(
      ".quaternion",
      qTimes,
      rotations
    );

    const limit =
      this.model.track.route.times[this.model.track.route.times.length - 1];
    const positionClip = new THREE.AnimationClip("positionClip", limit, [
      positionKF,
    ]);
    const rotationClip = new THREE.AnimationClip("rotationClip", limit, [
      quaternionKF,
    ]);

    const mixer = new THREE.AnimationMixer(this.opponent);
    const positionAction = mixer.clipAction(positionClip);
    const rotationAction = mixer.clipAction(rotationClip);
    this.mixers.push(mixer);
    positionAction.play();
    rotationAction.play();
  }

  /**
   * Get the quaternion to rotate from a to b.
   */
  getQuaternion(a, b) {
    const yAxis = new THREE.Vector3(0, 1, 0);
    const direction = new THREE.Vector3().subVectors(b, a);
    direction.normalize();
    const angle = Math.atan2(direction.x, direction.z) - Math.PI / 2;
    const quaternion = new THREE.Quaternion().setFromAxisAngle(yAxis, angle);
    return quaternion;
  }

  loadHud() {
    document.querySelector("#top-left").innerHTML = '<p id="laps"></p>';
    document.querySelector("#top-center").innerHTML +=
      '<p id="elapsed-time"></p>';
    document.querySelector("#top-left").innerHTML += '<p id="last-lap"></p>';

    document.querySelector("#bottom-left").innerHTML += '<p id="modifier"></p>';
    document.querySelector("#bottom-left").innerHTML +=
      '<p id="modifierTime"></p>';

    document.querySelector("#bottom-right").innerHTML += '<p id="speed"></p>';
  }

  stepShaders() {
    // set time for each modifier
    this.modifiers.forEach((modifier) => {
      modifier.shader.updateUniformsValue(
        "time",
        (Date.now() - this.startTime) / 1000
      );
    });

    if (this.scene.recursiveFrames === undefined) {
      this.scene.recursiveFrames = [];
      this.scene.traverse((object) => {
        if (object.name == "tvDisplay") {
          this.scene.recursiveFrames.push(object);
        }
      });
    }

    if (this.lastTvUpdate === undefined) {
      this.lastTvUpdate = new Date();
    }

    if (new Date() - this.lastTvUpdate > 500) {
      const tex = new THREE.CanvasTexture(
        document.getElementById("canvas").firstChild
      );
      const app = App.getInstance();
      const depthBuffer = app.depthTarget.depthTexture;
      this.scene.recursiveFrames.forEach((tvDisplay) => {
        tvDisplay.shader.updateUniformsValue("cameraNear", app.camera.near);
        tvDisplay.shader.updateUniformsValue("cameraFar", app.camera.far);
        tvDisplay.shader.updateUniformsValue("uSampler", tex);
        tvDisplay.shader.updateUniformsValue("uSamplerGray", depthBuffer);
      });
      this.lastTvUpdate = new Date();
    }
  }

  stepHud() {
    document.querySelector("#laps").innerHTML = `Lap ${Math.floor(
      this.model.laps
    )} / ${this.model.settings.laps}`;
    document.querySelector("#elapsed-time").innerHTML = `${(
      (new Date() - this.model.lapStart) /
      1000
    ).toFixed(3)} s`;
    if (this.model.lastLap) {
      document.querySelector(
        "#last-lap"
      ).innerHTML = `Last: ${this.model.lastLap.toFixed(3)} s`;
    }

    if (this.model.modifier) {
      document.querySelector("#modifier").innerHTML = `${this.model.modifier}`;
      document.querySelector("#modifierTime").innerHTML = `${
        this.model.modifierDuration -
        Math.floor((new Date() - this.model.modifierStart) / 1000)
      } s`;
    } else {
      document.querySelector("#modifier").innerHTML = "";
      document.querySelector("#modifierTime").innerHTML = "";
    }

    document.querySelector(
      "#speed"
    ).innerHTML = `<div>Speed</div><div>${Math.floor(
      this.model.car.speed * Car.speedConverter
    )} km/h</div>`;
  }

  loadModifiers() {
    this.modifiers = [];
    this.model.track.modifiers.forEach((modifier) => {
      const mesh = ModifierView.build(modifier);
      this.scene.add(mesh);
      this.modifiers.push(mesh);

      const rotationKF = new THREE.NumberKeyframeTrack(
        ".rotation[y]",
        [0, 3],
        [0, Math.PI * 2]
      );

      const positionKF = new THREE.NumberKeyframeTrack(
        ".position[y]",
        [0, 1.5, 3],
        [3, 4, 3]
      );

      const clip = new THREE.AnimationClip("positionClip", 3, [
        rotationKF,
        positionKF,
      ]);

      const mixer = new THREE.AnimationMixer(mesh);
      const action = mixer.clipAction(clip);
      this.mixers.push(mixer);
      action.play();
    });
  }

  stepCar() {
    this.car.position.x = this.model.car.position.x;
    this.car.position.z = this.model.car.position.z;
    this.car.position.y = this.model.car.position.y;

    this.car.rotation.y = -this.model.car.rotation;
    this.car.rotation.x = this.model.car.angularSpeed;

    this.checkCarPosition();

    // Rotate wheels
    if (this.model.car.name === "Toyota AE86") {
      const dist = this.model.car.speed;
      let car = this.car.getObjectByName("Car");
      for (let i = 0; i < car.children.length; i++) {
        car.children[i].rotateZ(dist);
      }
      this.car.wheel1.rotation.x =
        this.car.wheel1.originalRotationX + this.model.car.angularSpeed * 10;
      this.car.wheel2.rotation.x =
        this.car.wheel2.originalRotationX + this.model.car.angularSpeed * 10;
    }
  }

  /** Checks if the car is outside the track. */
  checkCarPosition() {
    const raycaster = new THREE.Raycaster();

    const direction = new THREE.Vector3(0, -1, 0);
    const carPos = new THREE.Vector3(
      this.model.car.position.x,
      10,
      this.model.car.position.z
    );

    raycaster.set(carPos, direction);

    const intersects = raycaster.intersectObject(this.track);
    if (intersects.length == 0) {
      this.model.setOutsideTrack();
    }
  }

  cleanup() {
    document.querySelector("#top-left").innerHTML = "";
    document.querySelector("#top-center").innerHTML = "";
    document.querySelector("#top-left").innerHTML = "";
    document.querySelector("#bottom-left").innerHTML = "";
    document.querySelector("#bottom-right").innerHTML = "";
  }
}

export { GameView };
