import { State } from "./State.js";
import { PickerController } from "../controllers/PickerController.js";

class PickerState extends State {
  constructor(gameState) {
    super();

    this.gameState = gameState;

    this.controller = new PickerController(gameState);
  }

  step() {
    const state = this.controller.step();
    if (state != null) {
      return state;
    }
    return this;
  }
}

export { PickerState };
