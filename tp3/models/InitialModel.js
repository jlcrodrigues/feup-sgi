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

    this.playButtonPosition = [-1,0,0.05]
    this.exitButtonPosition = [1,0,0.05]

    this.selected = this.playButtonPosition

  }

  step(){}

  processInput(key){
    const input = keyInputs[key];
    switch (input){
      case 'left': this.selected = this.playButtonPosition; break;
      case 'right': this.selected = this.exitButtonPosition; break;
      case 'enter': if (this.selected == this.playButtonPosition){ this.state = 'play';}
    }
  }
}

export { InitialModel };
