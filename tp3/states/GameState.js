import { GameController } from "../controllers/GameController.js";
import { State } from "./State.js";

class GameState extends State {
  constructor(settings) {
    super();
    this.settings = settings;
    if (!settings.track) settings.track = "monza";

    this.controller = new GameController(settings);
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
