import { InitialModel } from "../models/InitialModel.js";
import { RaceMenuState } from "../states/RaceMenuState.js";
import { InitialView } from "../views/InitialView.js";
import { Controller } from "./Controller.js";

class InitialController extends Controller {
    constructor() {
        super();

        this.model = new InitialModel();
        this.view = new InitialView(this.model);
        
        document.addEventListener("keydown", (event) => {
            this.model.processInput(event.code);
        });
      
    }

    
    step() {
        // this.model.step();
        this.view.step();
        if (this.model.state == 'play')
            return new RaceMenuState();
        return null;
    }
}

export { InitialController };