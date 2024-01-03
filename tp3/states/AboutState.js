import { AboutController } from "../controllers/AboutController.js";
import { State } from "./State.js";

class AboutState extends State{
    constructor(settings){
        super();

        this.controller = new AboutController(settings);
    }

    step(){
        const state = this.controller.step();
        if (state != null){
            return state;
        }
        return this;
    }
}

export { AboutState };