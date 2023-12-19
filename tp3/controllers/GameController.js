import { GameModel } from "../models/GameModel.js";
import { InitialState } from "../states/InitalState.js";
import { GameView } from "../views/GameView.js";
import { Controller } from "./Controller.js";

class GameController extends Controller {
  constructor() {
    super();

    this.model = new GameModel();
    this.view = new GameView();
  }

  step() {
    this.model.counter++;
    if (this.model.counter > 20) {
      return new InitialState();
    }
    return null;
  }
}

export { GameController };