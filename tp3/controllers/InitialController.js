import { InitialModel } from "../models/InitialModel.js";
import { GameState } from "../states/GameState.js";
import { InitialView } from "../views/InitialView.js";
import { Controller } from "./Controller.js";

class InitialController extends Controller {
    constructor() {
        super();

        this.model = new InitialModel();
        this.view = new InitialView(this.model);
        
        const movements = {
            "ArrowLeft": "left",
            "ArrowRight": "right",
            "ArrowUp": "left",
            "ArrowDown": "right",
            "Enter": "enter"
        }

        document.addEventListener("keydown", (event) => {
            this.model.updateMenuPanel(movements[event.code], true);
        });
      
    }

    
    step() {
        this.view.step();
        if (this.model.state == 'game')
            return "game";
        return null;
    }
}

export { InitialController };