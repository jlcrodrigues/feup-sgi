import { GameModel } from "../models/GameModel.js";
import { GameView } from "../views/game/GameView.js";
import { Controller } from "./Controller.js";

class GameController extends Controller {
  constructor(settings) {
    super();

    this.model = new GameModel(settings);
    this.view = new GameView(this.model);
  }

  step() {
    return null;
  }
}

export { GameController };