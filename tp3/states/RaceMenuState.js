import { State } from "./State.js";
import { RaceMenuController } from "../controllers/RaceMenuController.js";
import { GarageState } from "./GarageState.js";
import { TracksState } from "./TracksState.js";

class RaceMenuState extends State {
  constructor(settings) {
    super();

    this.controller = new RaceMenuController(settings);
  }

  step() {
    const state = this.controller.step();
    if (state != null) {
      return state;
    }
    return this;
  }
}

export { RaceMenuState };
