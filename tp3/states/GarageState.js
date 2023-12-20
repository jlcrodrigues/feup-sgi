import { State } from "./State.js";
import { GarageController } from "../controllers/GarageController.js";

class GarageState extends State {
  constructor(settings) {
    super();

    this.controller = new GarageController(settings);
  }

  step() {
    const state = this.controller.step();
    if (state != null ) {
      return state;
    }
    return this;
  }
}

export { GarageState };
