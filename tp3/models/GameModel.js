import { Model } from "./Model.js";
import { Track } from "./game/Track.js";

class GameModel extends Model {
  constructor(settings) {
    super();

    this.carSpeedFactor = 0.2;
    this.carMaxSpeed = 0.5;

    this.track = new Track(settings.track ?? "monza");
    this.carSpeed = { x: 0, y: 0, z: 0 };
    this.carPosition = this.track.start;

    this.moving = {
      up: false,
      down: false,
      left: false,
      right: false,
    }
  }

  moveCar() {
    this.carPosition.x += this.carSpeed.x;
    this.carPosition.z += this.carSpeed.z;

    this.carSpeed.x *= 0.95;
    this.carSpeed.z *= 0.95;

    this.updateSpeed();
  }

  updateSpeed() {
    if (this.moving.up) {
      this.carSpeed.x = Math.min(this.carSpeed.x + this.carSpeedFactor, this.carMaxSpeed);
    }
    if (this.moving.down) {
      this.carSpeed.x = Math.max(this.carSpeed.x - this.carSpeedFactor, -this.carMaxSpeed);
    }
    if (this.moving.left) {
      this.carSpeed.z = Math.max(this.carSpeed.z - this.carSpeedFactor, -this.carMaxSpeed);
    }
    if (this.moving.right) {
      this.carSpeed.z = Math.min(this.carSpeed.z + this.carSpeedFactor, this.carMaxSpeed);
    }
  }

  accelerateCar(direction, accelerate) {
    this.moving[direction] = accelerate;
  }
}

export { GameModel };
