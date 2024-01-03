import { GameModel } from "../models/game/GameModel.js";
import { GarageState } from "../states/GarageState.js";
import { PauseState } from "../states/PauseState.js";
import { GameView } from "../views/game/GameView.js";
import { Controller } from "./Controller.js";

class GameController extends Controller {
  constructor(settings) {
    super();

    this.pausing = false;

    this.model = new GameModel(settings);
    this.view = new GameView(this.model);

    document.addEventListener("keydown", (event) => {
      this.model.processInput(event.code, true);
    });

    document.addEventListener("keyup", (event) => {
      if (event.code === "Escape") {
        this.pausing = true;
      }
      this.model.processInput(event.code, false);
    });
  }

  step() {
    if (this.model.step()) {
      this.view.cleanup();
      return new GarageState();
    }
    this.view.step();
    if (this.pausing) {
      this.pausing = false;
      this.view.cleanup();
      return "pause";
    }
    return null;
  }
}

export { GameController };
