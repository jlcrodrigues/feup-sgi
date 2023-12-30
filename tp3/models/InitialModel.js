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
    this.aboutButtonPosition = [0.8,0,0.05]

    this.selectedPosition = this.playButtonPosition

  }

  step(mousePicker){
    if (mousePicker.pickedObject){
      if (mousePicker.pickedObject.position.x < 0){
        this.selectedPosition = this.playButtonPosition;
      }
      else{
        this.selectedPosition = this.aboutButtonPosition;
      }
    }

    if(mousePicker.selectedObject){
      if (this.selectedPosition == this.playButtonPosition)
          this.state = 'play';
        if (this.selectedPosition == this.aboutButtonPosition)
          this.state = 'about';
    }
  }

  processInput(key){
    const input = keyInputs[key];
    switch (input){
      case 'left': this.selectedPosition = this.playButtonPosition; break;
      case 'right': this.selectedPosition = this.aboutButtonPosition; break;
      case 'enter': 
        if (this.selectedPosition == this.playButtonPosition)
          this.state = 'play';
        if (this.selectedPosition == this.aboutButtonPosition)
          this.state = 'about';
    }
  }
}

export { InitialModel };
