import { State } from "./State.js";
import { PauseController } from "../controllers/PauseController.js";

class PauseState extends State {
  constructor(gameState) {
    super();

    this.gameState = gameState;

    this.controller = new PauseController(gameState);
  }

  step() {
    const state = this.controller.step();
    if (state != null) {
      return state;
    }
    return this;
  }
}

export { PauseState };
