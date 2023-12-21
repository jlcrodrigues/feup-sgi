import { SceneLoader } from "../../loader/SceneLoader.js";
import { View } from "../View.js";
import * as THREE from "three";
import { TrackBuilder } from "./TrackBuilder.js";

const dampingFactor = 0.1;

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

    this.car = this.model.car.model;
    this.scene.add(this.car);

    this.loadOpponent();
  }

  step() {
    this.car.position.x = this.model.car.position.x;
    this.car.position.z = this.model.car.position.z;

    this.car.rotation.y = -this.model.car.rotation;

    const targetPosition = this.car.position.clone();
    targetPosition.y += 10;
    targetPosition.x -= 20 * Math.cos(-this.car.rotation.y);
    targetPosition.z -= 20 * Math.sin(-this.car.rotation.y);

    //this.camera.position.lerp(targetPosition, dampingFactor);
    //this.camera.lookAt(this.car.position);


    const currentPosition = this.opponent.position.clone();
    if (this.mixer) this.mixer.update(0.01);
    const nextPosition = this.opponent.position.clone();

    const direction = new THREE.Vector3().subVectors(
      nextPosition, currentPosition
    );

    direction.normalize();
    const angle = Math.atan2(direction.x, direction.z) - Math.PI / 2;
    this.opponent.rotation.y = angle;
  }

  loadOpponent() {
    this.opponent = this.model.opponent.model;
    this.scene.add(this.opponent);

    const positionKF = new THREE.VectorKeyframeTrack(
      ".position",
      this.model.track.route.times,
      this.model.track.route.values
    );

    const limit = this.model.track.route.times[this.model.track.route.times.length - 1]
    const clip = new THREE.AnimationClip("positionClip", limit, [positionKF]);

    this.mixer = new THREE.AnimationMixer(this.opponent);
    const action = this.mixer.clipAction(clip);
    action.play();
  }
}

export { GameView };
