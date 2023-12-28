import { GarageModel } from "../models/GarageModel.js";
import { GameState } from "../states/GameState.js";
import { GarageView } from "../views/garage/GarageView.js";
import { Controller } from "./Controller.js";

class GarageController extends Controller {
  constructor(settings) {
    super();
    this.settings = settings ?? {}

    this.model = new GarageModel(this.settings);
    this.view = new GarageView(this.model);

    document.addEventListener("keydown", (event) => {
      this.model.processInput(event.code);
    });
  }

  step() {
    this.model.step()
    this.view.step();

    if (this.model.over) {
      this.settings.car = this.model.cars[this.model.selected];
      this.view.cleanup();
      return new GameState(this.settings);
    }
    return null;
  }
}

export { GarageController };
