import { Model } from "./Model.js";

const keyInputs = {
    Enter: "enter",
    Escape: "esc"
  }

class TracksModel extends Model{
    constructor(settings) {
        super();

    }

    processInput(key){
        const input = keyInputs[key];
        if (input === "esc")
            this.state = "menu"
        else if (input === "enter")
            this.state = "garage"
    }
}

export {TracksModel}