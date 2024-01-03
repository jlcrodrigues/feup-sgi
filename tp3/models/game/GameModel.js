import { Model } from "../Model.js";
import { Car } from "./Car.js";
import { Track } from "./Track.js";
import * as THREE from "three";

const movements = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "up",
  ArrowDown: "down",
  KeyW: "up",
  KeyA: "left",
  KeyS: "down",
  KeyD: "right",
};

class GameModel extends Model {
  constructor(settings) {
    super();
    this.settings = settings;

    this.track = new Track(settings.track ?? "monza");

    this.car = settings.car;
    if (this.car == null) {
      this.car = new Car();
    }
    this.car.position = this.track.start;
    this.car.position.x -= 10;

    this.opponent = settings.opponent;
    if (this.opponent == null) {
      this.opponent = new Car();
    }
    this.opponent.position = this.track.start;

    this.laps = 0;
    this.checkpoint = new THREE.Vector3(
      ...this.track.path[Math.floor(this.track.path.length / 2)]
    );
    this.checkpoint.x = this.checkpoint.x;
    this.start = new THREE.Vector3(
      this.track.start.x,
      this.track.start.y,
      this.track.start.z
    );
    this.start.x = this.start.x;
    this.lastLap = null;
    this.lapsTotal = 0;

    this.modifiers = this.track.modifiers;
    this.modifier = null;
    this.modifierStart = null;
    this.modifierDuration = 5;

    this.selectedCamera = 0;
    this.cameras = 0;

    this.startDelay = 5;
    
    this.over = false;
    this.playAgainPos = [10,-15,0]
    this.backPos = [-10,-15,0]
    this.selectedPosition = this.playAgainPos;

    const borderGeometry = new THREE.BoxGeometry(17, 0.2, 0.1);
    const borderMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.border = new THREE.Mesh(borderGeometry, borderMaterial);
  }

  step(mousePicker) {
    if (!this.startTime) {
      this.startTime = new Date();
    }

    if (new Date() - this.startTime < this.startDelay * 1000) {
      return;
    }
    if (!this.lapStart) {
      this.lapStart = new Date();
    }
    this.car.move();

    if (this.modifier != "slowDown") {
      // Opponent collision
      if (
        this.car.model.position.distanceTo(this.opponent.model.position) < 3
      ) {
        this.car.setMaxSpeed(this.car.maxSpeed * 0.7);
        this.setModifier("slowDown", 3);
      }
    }

    // Laps
    if (
      this.car.model.position.distanceTo(this.start) <= this.track.width &&
      this.laps - Math.floor(this.laps) != 0
    ) {
      this.lastLap = (new Date() - this.lapStart) / 1000;
      this.lapsTotal += this.lastLap
      this.lapStart = new Date();
      this.laps += 0.5;
    }
    if (
      this.car.model.position.distanceTo(this.checkpoint) <=
        this.track.width * 2 &&
      this.laps - Math.floor(this.laps) == 0
    ) {
      this.laps += 0.5;
    }

    if (this.laps >= this.settings.laps) {
      this.laps = this.settings.laps
      this.over = true;
    }

    this.stepModifiers();

    if (mousePicker)  {
      if (mousePicker.pickedObject){
        if (mousePicker.pickedObject.position.x > 0){
          this.selectedPosition = this.playAgainPos;
        }
        else{
          this.selectedPosition = this.backPos;
        }
      }
      if(mousePicker.selectedObject){
        if (this.selectedPosition == this.playAgainPos)
            this.state = 'play';
          if (this.selectedPosition == this.backPos)
            this.state = 'initial';
      }
    }
  }

  setOutsideTrack() {
    if (this.modifier == null && this.modifier != "slowDown") {
      this.car.setMaxSpeed(this.car.maxSpeed * 0.7);
      this.setModifier("slowDown", 3);
    }
  }

  processInput(code, down) {
    // Change camera
    if (code == "KeyV" && down) {
      this.selectedCamera = (this.selectedCamera + 1) % this.cameras;
      return;
    }

    const direction = movements[code];
    if (direction) {
      this.car.processInput(direction, down);
    }
  }

  stepModifiers() {
    if (this.modifier != null) {
      if (new Date() - this.modifierStart > this.modifierDuration * 1000) {
        if (this.modifier == "speedUp") {
          this.car.resetMaxSpeed();
        } else if (this.modifier == "slowDown") {
          this.car.resetMaxSpeed();
        } else if (this.modifier == "switcheroo") {
          this.car.switched = false;
        }
        this.modifier = null;
      }
      return;
    }

    for (let i = 0; i < this.modifiers.length; i++) {
      if (this.car.model.position.distanceTo(this.modifiers[i].position) <= 4) {
        if (this.modifiers[i].type == "speedUp") {
          this.setModifier("speedUp");
          this.car.setMaxSpeed(this.car.maxSpeed * 2);
        } else if (this.modifiers[i].type == "slowDown") {
          this.setModifier("slowDown");
          this.car.setMaxSpeed(this.car.maxSpeed * 0.7);
        } else if (this.modifiers[i].type == "jump") {
          this.setModifier("jump");
          this.car.jump();
        } else if (this.modifiers[i].type == "switcheroo") {
          this.setModifier("switcheroo");
          this.car.switched = true;
        } else if (this.modifiers[i].type == "plus") {
          this.setModifier("plus", 5);
          this.state = "picker";
        }
      }
    }
  }

  setModifier(name, duration = 5) {
    this.modifier = name;
    this.modifierStart = new Date();
    this.modifierDuration = duration;
  }
}

export { GameModel };
