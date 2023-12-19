import { InitialModel } from "../models/InitialModel.js";
import { GameState } from "../states/GameState.js";
import { InitialView } from "../views/InitialView.js";
import { Controller } from "./Controller.js";

class InitialController extends Controller {
    constructor() {
        super();

        this.model = new InitialModel();
        this.view = new InitialView();
    }

    step() {
        this.model.counter++;
        if (this.model.counter > 20) {
            return new GameState();
        }
        return null;
    }
}

export { InitialController };