import { Model } from "./Model.js";

const keyInputs = {
    Enter: "enter"
  }

class TracksModel extends Model{
    constructor(settings) {
        super();

    }

    processInput(key){
        const input = keyInputs[key];
        if (input == 'enter')
            this.state = 'menu'
    }
}

export {TracksModel}