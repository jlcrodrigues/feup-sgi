import { TracksController } from "../controllers/TracksController.js";
import { State } from "./State.js";

class TracksState extends State {
    constructor(settings) {
        super();
        
        this.controller = new TracksController(settings);
    }

    step(){
        const state = this.controller.step();
        if (state != null ) {
            return state;
        }
        return this;
    }
}

export {TracksState}