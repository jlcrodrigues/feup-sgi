import { TracksModel } from "../models/TracksModel.js";
import { RaceMenuState } from "../states/RaceMenuState.js";
import { TracksView } from "../views/TracksView.js";
import { Controller } from "./Controller.js";

class TracksController extends Controller {
    constructor() {
        super();

        this.model = new TracksModel();
        this.view = new TracksView();

        document.addEventListener("keydown", (event) => {
            this.model.processInput(event.code);
        });
    }

    step(){
        // this.model.step();
        this.view.step();

        if (this.model.state == 'menu')
            return new RaceMenuState();

        return null;
    }
}

export { TracksController };