import { GameController } from "../controllers/GameController.js";
import { State } from "./State.js";

class GameState extends State {
  constructor(settings) {
    super();
    this.settings = settings ?? {};
    if (!this.settings.track) this.settings.track = "monza";
    if (!this.settings.opponent && this.settings.car) {
      this.settings.opponent = JSON.parse(JSON.stringify(this.settings.car));
      this.settings.opponent.model = this.settings.car.model.clone()
    }
    this.settings.laps = this.settings.laps ?? 3;

    this.controller = new GameController(this.settings);
  }

  step() {
    const state = this.controller.step();
    if (state) {
      return state;
    }
    return this;
  }
}

export { GameState };
