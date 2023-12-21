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

    this.playPosition = -1
    this.exitPosition = 1

    this.selected = this.playPosition

  }

  step(){}

  processInput(key){
    const input = keyInputs[key];
    switch (input){
      case 'left': this.selected = this.playPosition; break;
      case 'right': this.selected = this.exitPosition; break;
      case 'enter': if (this.selected == -1){ this.state = 'play';}
    }
  }
}

export { InitialModel };
