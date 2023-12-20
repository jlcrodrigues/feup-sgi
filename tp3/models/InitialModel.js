import { Model } from "./Model.js";
import { MainMenu } from "./menu/MainMenu.js";

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

    this.menu = new MainMenu();

  }

  step(){}

  processInput(key){
    const input = keyInputs[key];
    if (input){
      this.state = this.menu.processInput(input)
    }
  }
}

export { InitialModel };
