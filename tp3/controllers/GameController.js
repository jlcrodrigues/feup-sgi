import { GameModel } from "../models/GameModel.js";
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
    return null;
  }
}

export { GameController };
