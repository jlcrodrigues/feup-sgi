import { GameController } from "../controllers/GameController.js";
import { State } from "./State.js";

class GameState extends State {
  constructor(settings) {
    super();
    this.settings = settings ?? {};
    if (!this.settings.track) this.settings.track = "monza";

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
