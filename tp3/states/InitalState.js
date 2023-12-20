import { State } from "./State.js";
import { InitialController } from "../controllers/InitialController.js";
import { GameState } from "./GameState.js";

class InitialState extends State {
  constructor() {
    super();

    this.controller = new InitialController();
    console.log(this.controller)
  }

  step() {
    const state = this.controller.step();
    if (state == 'game' ) {
      return new GameState();
    }
    return this;
  }
}

export { InitialState };
