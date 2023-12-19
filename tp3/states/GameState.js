import { GameController } from "../controllers/GameController.js";
import { State } from "./State.js";

class GameState extends State {
  constructor() {
    super();

    this.controller = new GameController();
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
