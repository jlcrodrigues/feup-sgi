import { GameModel } from "../models/game/GameModel.js";
import { GarageState } from "../states/GarageState.js";
import { GameView } from "../views/game/GameView.js";
import { Controller } from "./Controller.js";

class GameController extends Controller {
  constructor(settings) {
    super();

    this.model = new GameModel(settings);
    this.view = new GameView(this.model);

    document.addEventListener("keydown", (event) => {
      this.model.processInput(event.code, true);
    });

    document.addEventListener("keyup", (event) => {
      this.model.processInput(event.code, false);
    });
  }

  step() {
    this.model.step();
    this.view.step();
    if (this.model.over) {
      this.view.cleanup();
    }
    return null;
  }
}

export { GameController };
