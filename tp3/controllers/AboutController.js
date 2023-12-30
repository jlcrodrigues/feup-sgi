import { AboutModel } from "../models/AboutModel.js";
import { InitialState } from "../states/InitalState.js";
import { AboutView } from "../views/AboutView.js";
import { Controller } from "./Controller.js";

class AboutController extends Controller {
    constructor() {
        super();

        this.model = new AboutModel();
        this.view = new AboutView(this.model);
        
        document.addEventListener("keydown", (event) => {
            this.model.processInput(event.code);
        });
      
    }
    
    step() {
        // this.model.step();
        this.view.step();
        if (this.model.state == 'initial')
            return new InitialState();
        return null;
    }
}

export { AboutController };