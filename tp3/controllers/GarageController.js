import { GarageModel } from "../models/GarageModel.js";
import { GarageView } from "../views/garage/GarageView.js";
import { Controller } from "./Controller.js";

class GarageController extends Controller {
  constructor(settings) {
    super();

    this.model = new GarageModel(settings);
    this.view = new GarageView(this.model);

    document.addEventListener("keydown", (event) => {
      this.model.processInput(event.code);
    });
  }

  step() {
    this.model.step();
    this.view.step();
    return null;
  }
}

export { GarageController };
