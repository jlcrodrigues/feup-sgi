import { SceneLoader } from "../../loader/SceneLoader.js";
import { View } from "../View.js";
import * as THREE from "three";
import { TrackBuilder } from "./TrackBuilder.js";
import { ModifierView } from "./ModifierView.js";
import { App } from "../../App.js";
import { Car } from "../../models/game/Car.js";
import { Fireworks } from "../Fireworks.js";
import { FontLoader } from "../../loader/FontLoader.js";

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
    // this.camera.position.z = -20;
    // this.camera.position.x = -150;
    // this.camera.position.y = 200;
    this.camera.position.x = 0;
    this.camera.position.y = 30;
    this.camera.position.z = -20;   
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

    this.loadedOver = false;

  }

  step() {
    this.fireworks.step();
    if(this.fireworks.dest.length%5===0){
      this.fireworks.launch(2, new THREE.Vector3(-170, 35, 60));
      this.fireworks.launch(2, new THREE.Vector3(-130, 35, 60));
    }
    if (!this.model.over){
      this.stepHud();
      this.stepCar();

      const targetPosition = this.car.position.clone();
      targetPosition.y += 10;
      targetPosition.x -= 10 * Math.cos(-this.car.rotation.y);
      targetPosition.z -= 10 * Math.sin(-this.car.rotation.y);

      if (!App.controlsActive && !this.model.over) {
        this.camera.position.lerp(targetPosition, dampingFactor);
        this.camera.lookAt(this.car.position);
      }

      this.mixers.forEach((mixer) => {
        mixer.update(0.01);
      });
    }

    else {
      if (!this.loadedOver){
        this.loadOver();
        this.loadedOver = true;
      }
          
      this.model.border.position.set(this.model.selectedPosition[0],this.model.selectedPosition[1]-1,this.model.selectedPosition[2]-0.1)

      const targetPosition = this.camera.position.clone();
      targetPosition.x = -150
      targetPosition.y = 60
      targetPosition.z = 10
      if (!App.controlsActive){
        this.camera.position.lerp(targetPosition,dampingFactor);
        this.camera.lookAt(-150,45,60);
      }
    }
  }

  loadOver(){
    this.panelGroup = new THREE.Group()

    const panelGeometry = new THREE.BoxGeometry(40, 40, 0.1);
    const panelMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
    const panel = new THREE.Mesh(panelGeometry, panelMaterial);
    this.panelGroup.add(panel)

    const playerCar = new THREE.Group();
    const playerCarArray = new FontLoader().getMeshArray("Player Car: "+this.model.car.name);
    playerCar.add(...playerCarArray[0]);
    playerCar.rotation.set(0,Math.PI,0);
    playerCar.scale.set(11,11,1);
    playerCar.position.set(17,16,0);
    this.panelGroup.add(playerCar);

    const opponentCar = new THREE.Group();
    const opponentCarArray = new FontLoader().getMeshArray("Opponent Car: "+this.model.car.name);
    opponentCar.add(...opponentCarArray[0]);
    opponentCar.rotation.set(0,Math.PI,0);
    opponentCar.scale.set(11,11,1);
    opponentCar.position.set(17,13,0);
    this.panelGroup.add(opponentCar);

    const playerTime = new THREE.Group();
    const playerTimeString = this.model.lapsTotal
    const playerTimeArray = new FontLoader().getMeshArray("Player Time: "+playerTimeString);
    playerTime.add(...playerTimeArray[0]);
    playerTime.rotation.set(0,Math.PI,0);
    playerTime.scale.set(11,11,1);
    playerTime.position.set(17,7,0);
    this.panelGroup.add(playerTime);
  
    const opponentTime = new THREE.Group();
    const opponentTimeString = 46.853 * this.model.settings.laps

    const opponentTimeArray = new FontLoader().getMeshArray("Opponent Time: "+opponentTimeString);
    opponentTime.add(...opponentTimeArray[0]);
    opponentTime.rotation.set(0,Math.PI,0);
    opponentTime.scale.set(11,11,1);
    opponentTime.position.set(17,4,0);
    this.panelGroup.add(opponentTime);

    var winnerString = ""
    var loserString = ""
    if (playerTimeString<opponentTimeString) {
      winnerString = this.model.settings.playerName
      loserString = "AI Master Drifter"
    }
    else{
      winnerString = "AI Master Drifter"
      loserString = this.model.settings.playerName
    } 

    const winner = new THREE.Group();
    const winnerArray = new FontLoader().getMeshArray("Winner: "+winnerString);
    winner.add(...winnerArray[0]);
    winner.rotation.set(0,Math.PI,0);
    winner.scale.set(12,12,1);
    winner.position.set(16,-2,0);
    this.panelGroup.add(winner);

    const loser = new THREE.Group();
    const loserArray = new FontLoader().getMeshArray("Loser: "+loserString);
    loser.add(...loserArray[0]);
    loser.rotation.set(0,Math.PI,0);
    loser.scale.set(12,12,1);
    loser.position.set(16,-5,0);
    this.panelGroup.add(loser);

    const playButton = new THREE.Group();
    const playButtonArray = new FontLoader().getMeshArray("PLAY AGAIN");
    playButton.add(...playButtonArray[0]);
    playButton.rotation.set(0,Math.PI,0);
    playButton.scale.set(15,15,1);
    playButton.position.set(this.model.playAgainPos[0]+playButtonArray[1]*12,this.model.playAgainPos[1],this.model.playAgainPos[2]);
    this.panelGroup.add(playButton);

    const backButton = new THREE.Group();
    const backButtonArray = new FontLoader().getMeshArray("MAIN MENU");
    backButton.add(...backButtonArray[0]);
    backButton.rotation.set(0,Math.PI,0);
    backButton.scale.set(15,15,1);
    backButton.position.set(this.model.backPos[0]+backButtonArray[1]*12,this.model.backPos[1],this.model.backPos[2]);
    this.panelGroup.add(backButton);

    this.panelGroup.add(this.model.border);

    this.panelGroup.rotation.set(Math.PI/8,0,0);
    this.panelGroup.position.set(-150,50,60);

    this.scene.add(this.panelGroup);

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

    this.limit =
      this.model.track.route.times[this.model.track.route.times.length - 1];
    const positionClip = new THREE.AnimationClip("positionClip", this.limit, [
      positionKF,
    ]);
    const rotationClip = new THREE.AnimationClip("rotationClip", this.limit, [
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
