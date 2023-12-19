import { GameModel } from "../models/GameModel.js";
import { GameView } from "../views/GameView.js";
import { Controller } from "./Controller.js";

class GameController extends Controller {
  constructor() {
    super();

    this.model = new GameModel();
    this.view = new GameView();
  }

  step() {
    return null;
  }
}

export { GameController };