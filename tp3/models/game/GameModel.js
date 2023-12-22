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
    this.car.position = this.track.start;

    this.opponent = settings.opponent;
    this.opponent.position = this.track.start;

    this.laps = 0;
    this.checkpoint = new THREE.Vector3(
      ...this.track.path[this.track.path.length / 2]
    );
    this.checkpoint.x = this.checkpoint.x;
    this.start = new THREE.Vector3(
      this.track.start.x,
      this.track.start.y,
      this.track.start.z
    );
    this.start.x = this.start.x;
    this.lapStart = new Date();
    this.lastLap = null;

    this.modifiers = this.track.modifiers;
    this.modifier = null;
    this.modifierStart = null;
    this.modifierDuration = 5;
  }

  step() {
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
      return true;
    }

    this.stepModifiers();
  }

  setOutsideTrack() {
    if (this.modifier == null && this.modifier != "slowDown") {
      this.car.setMaxSpeed(this.car.maxSpeed * 0.7);
      this.setModifier("slowDown", 3);
    }
  }

  processInput(code, down) {
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
