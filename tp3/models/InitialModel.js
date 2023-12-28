import { Model } from "./Model.js";

const keyInputs = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "left",
  ArrowDown: "right",
  Enter: "enter"
}

class InitialModel extends Model {
  constructor() {
    super();

    this.playButtonPosition = [-0.9,0,0.05]
    this.exitButtonPosition = [0.8,0,0.05]

    this.selectedPosition = this.playButtonPosition

  }

  step(){}

  processInput(key){
    const input = keyInputs[key];
    switch (input){
      case 'left': this.selectedPosition = this.playButtonPosition; break;
      case 'right': this.selectedPosition = this.exitButtonPosition; break;
      case 'enter': if (this.selectedPosition == this.playButtonPosition){ this.state = 'play';}
    }
  }
}

export { InitialModel };
