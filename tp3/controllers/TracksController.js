import { TracksModel } from "../models/TracksModel.js";
import { GarageState } from "../states/GarageState.js";
import { RaceMenuState } from "../states/RaceMenuState.js";
import { TracksView } from "../views/TracksView.js";
import { Controller } from "./Controller.js";

class TracksController extends Controller {
    constructor(settings) {
        super();
        this.settings = settings ?? {} 

        this.model = new TracksModel(this.settings);
        this.view = new TracksView(this.model);

        document.addEventListener("keydown", (event) => {
            this.model.processInput(event.code);
        });
    }

    step(){
        // this.model.step();
        this.view.step();

        if (this.model.state == 'menu')
            return new RaceMenuState();
        else if (this.settings.race && this.model.state == 'garage')
            return new GarageState(this.settings);

        return null;
    }
}

export { TracksController };