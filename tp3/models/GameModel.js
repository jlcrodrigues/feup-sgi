import { Model } from "./Model.js";
import { Car } from "./game/Car.js";
import { Track } from "./game/Track.js";

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
  }

  step() {
    this.car.move();
  }

  processInput(code, down) {
    const direction = movements[code];
    if (direction) {
      this.car.processInput(direction, down);
    }
  }
}

export { GameModel };
