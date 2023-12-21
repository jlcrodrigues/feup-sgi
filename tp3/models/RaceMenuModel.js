import { Model } from "./Model.js";

const keyInputs = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "left",
  ArrowDown: "right",
  Enter: "enter"
}

class RaceMenuModel extends Model {
  constructor() {
    super();

    this.garageButtonPosition = -1.5
    this.trackButtonPosition = 1.5

    this.selected = this.garageButtonPosition

  }

  step(){}

  processInput(key){
    const input = keyInputs[key];
    switch (input){
      case 'left': this.selected = this.garageButtonPosition; break;
      case 'right': this.selected = this.trackButtonPosition; break;
      case 'enter': if (this.selected == this.garageButtonPosition){ this.state = 'garage';}
    }
  }
}

export { RaceMenuModel };
