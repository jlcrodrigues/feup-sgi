import { GameModel } from "../models/GameModel.js";
import { GameView } from "../views/game/GameView.js";
import { Controller } from "./Controller.js";

class GameController extends Controller {
  constructor(settings) {
    super();

    this.model = new GameModel(settings);
    this.view = new GameView(this.model);

    const movements = {
      "ArrowLeft": "left",
      "ArrowRight": "right",
      "ArrowUp": "up",
      "ArrowDown": "down",
      "KeyW": "up",
      "KeyA": "left",
      "KeyS": "down",
      "KeyD": "right",
    }

    document.addEventListener("keydown", (event) => {
      this.model.accelerateCar(movements[event.code], true);
    });

    document.addEventListener("keyup", (event) => {
      this.model.accelerateCar(movements[event.code], false);
    });
  }

  step() {
    this.model.moveCar();
    this.view.step();
    return null;
  }
}

export { GameController };
