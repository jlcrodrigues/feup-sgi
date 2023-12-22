import { RaceMenuModel } from "../models/RaceMenuModel.js";
import { GarageState } from "../states/GarageState.js";
import { TracksState } from "../states/TracksState.js";
import { RaceMenuView } from "../views/RaceMenuView.js";
import { Controller } from "./Controller.js";

class RaceMenuController extends Controller {
    constructor() {
        super();

        this.model = new RaceMenuModel();
        this.view = new RaceMenuView(this.model);
        
        document.addEventListener("keydown", (event) => {
            this.model.processInput(event.code);
        });
      
    }

    
    step() {
        // this.model.step();
        this.view.step();
        if (this.model.state == 'garage')
            return new GarageState();
        else if (this.model.state == 'tracks')
            return new TracksState();
        return null;
    }
}

export { RaceMenuController };