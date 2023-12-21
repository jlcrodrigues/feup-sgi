import { State } from "./State.js";
import { InitialController } from "../controllers/InitialController.js";
import { RaceMenuState } from "./RaceMenuState.js";

class InitialState extends State {
  constructor() {
    super();

    this.controller = new InitialController();
  }

  step() {
    const state = this.controller.step();
    if (state instanceof RaceMenuState ) {
      return state;
    }
    return this;
  }
}

export { InitialState };
