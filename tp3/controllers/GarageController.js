import { GarageModel } from "../models/GarageModel.js";
import { GameState } from "../states/GameState.js";
import { RaceMenuState } from "../states/RaceMenuState.js";
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

    if (this.settings.race && this.model.state === "race"){
      this.settings.car = this.model.cars[this.model.selected];
      this.view.cleanup();
      return new GameState(this.settings);
    }else if (this.model.state === "menu"){
        return new RaceMenuState();
    }
    return null;
  }
}

export { GarageController };
