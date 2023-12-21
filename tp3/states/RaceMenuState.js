import { State } from "./State.js";
import { RaceMenuController } from "../controllers/RaceMenuController.js";
import { GarageState } from "./GarageState.js";

class RaceMenuState extends State {
  constructor() {
    super();

    this.controller = new RaceMenuController();
  }

  step() {
    const state = this.controller.step();
    if (state instanceof GarageState ) {
      return state;
    }
    return this;
  }
}

export { RaceMenuState };
