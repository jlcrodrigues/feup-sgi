import { SceneLoader } from "../../loader/SceneLoader.js";
import { View } from "../View.js";
import * as THREE from "three";
import { TrackBuilder } from "./TrackBuilder.js";
import { ModifierView } from "./ModifierView.js";

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
    this.camera.position.z = -20;
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

    // Load opponent's car
    this.loadOpponent();

    // Load modifiers
    this.loadModifiers();

    this.loadHud();
  }

  step() {
    this.stepHud();

    this.car.position.x = this.model.car.position.x;
    this.car.position.z = this.model.car.position.z;
    this.car.position.y = this.model.car.position.y;

    this.car.rotation.y = -this.model.car.rotation;

    this.checkCarPosition();

    const targetPosition = this.car.position.clone();
    targetPosition.y += 10;
    targetPosition.x -= 20 * Math.cos(-this.car.rotation.y);
    targetPosition.z -= 20 * Math.sin(-this.car.rotation.y);

    this.camera.position.lerp(targetPosition, dampingFactor);
    this.camera.lookAt(this.car.position);

    const currentPosition = this.opponent.position.clone();
    this.mixers.forEach((mixer) => {
      mixer.update(0.01);
    });
    const nextPosition = this.opponent.position.clone();

    const direction = new THREE.Vector3().subVectors(
      nextPosition,
      currentPosition
    );

    direction.normalize();
    const angle = Math.atan2(direction.x, direction.z) - Math.PI / 2;
    this.opponent.rotation.y = angle;
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

    const limit =
      this.model.track.route.times[this.model.track.route.times.length - 1];
    const clip = new THREE.AnimationClip("positionClip", limit, [positionKF]);

    const mixer = new THREE.AnimationMixer(this.opponent);
    const action = mixer.clipAction(clip);
    this.mixers.push(mixer);
    action.play();
  }

  loadHud() {
    document.querySelector("#top-left").innerHTML = '<p id="laps"></p>';
    document.querySelector("#top-left").innerHTML +=
      '<p id="elapsed-time"></p>';
    document.querySelector("#top-left").innerHTML += '<p id="last-lap"></p>';

    document.querySelector("#bottom-left").innerHTML += '<p id="modifier"></p>';
    document.querySelector("#bottom-left").innerHTML +=
      '<p id="modifierTime"></p>';
  }

  stepHud() {
    document.querySelector("#laps").innerHTML = `${Math.floor(
      this.model.laps
    )} / ${this.model.settings.laps}`;
    document.querySelector("#elapsed-time").innerHTML = `${Math.floor(
      (new Date() - this.model.lapStart) / 1000
    )} s`;
    if (this.model.lastLap) {
      document.querySelector(
        "#last-lap"
      ).innerHTML = `Last lap: ${this.model.lastLap.toFixed(3)} s`;
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
  }

  loadModifiers() {
    this.model.track.modifiers.forEach((modifier) => {
      const mesh = ModifierView.build(modifier);
      this.scene.add(mesh);

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

  /** Checks if the car is outside the track. */
  checkCarPosition() {
    const raycaster = new THREE.Raycaster();

    const direction = new THREE.Vector3(0, -1, 0);
    const carPos = new THREE.Vector3(this.model.car.position.x, 10, this.model.car.position.z);

    raycaster.set(carPos, direction);

    const intersects = raycaster.intersectObject(this.track);
    if (intersects.length == 0) {
      this.model.setOutsideTrack();
    }


  }
}

export { GameView };
