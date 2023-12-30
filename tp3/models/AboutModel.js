import { Model } from "./Model.js";

const keyInputs = {
  // ArrowUp: "up",
  // ArrowDown: "down",
  // Enter: "enter",
  Escape: "esc"
}

class AboutModel extends Model {
  constructor() {
    super();

  }

  step(){}

  processInput(key){
    const input = keyInputs[key];
    switch (input){
      case 'esc': this.state = 'initial';
    }
  }
}

export { AboutModel };
