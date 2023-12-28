import { RaceMenuModel } from "../models/RaceMenuModel.js";
import { GameState } from "../states/GameState.js";
import { GarageState } from "../states/GarageState.js";
import { InitialState } from "../states/InitalState.js";
import { TracksState } from "../states/TracksState.js";
import { RaceMenuView } from "../views/RaceMenuView.js";
import { Controller } from "./Controller.js";

class RaceMenuController extends Controller {
    constructor(settings) {
        super();

        this.settings = settings ?? {}
        this.settings.race = false;

        this.model = new RaceMenuModel();
        this.view = new RaceMenuView(this.model);
        
        document.addEventListener("keydown", (event) => {
            this.model.processInput(event.code);
        });
      
    }

    
    step() {
        // this.model.step();
        this.view.step();
        if (this.model.state == 'garage'){
            return new GarageState(this.settings);
        }
        else if (this.model.state == 'tracks'){
            return new TracksState(this.settings);
        }
        else if (this.model.state == 'initial')
            return new InitialState();
        else if (this.model.state == 'race'){
            this.settings.laps = this.model.laps 
            this.settings.race = true;
            return new TracksState(this.settings);
        }
        return null;
    }
}

export { RaceMenuController };