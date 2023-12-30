import { State } from "./State.js";
import { InitialController } from "../controllers/InitialController.js";

class InitialState extends State {
  constructor() {
    super();

    this.controller = new InitialController();
  }

  step() {
    const state = this.controller.step();
    if (state != null) {
      return state;
    }
    return this;
  }
}

export { InitialState };
