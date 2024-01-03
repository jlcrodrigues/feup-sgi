import { Model } from "./Model.js";

const keyInputs = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "left",
  ArrowDown: "right",
  Enter: "enter",
};

class PickerModel extends Model {
  constructor() {
    super();

    this.continueButtonPosition = [-0.9, 0, 0.05];
    this.menuButtonPosition = [1.2, 0, 0.05];

    this.selectedPosition = this.continueButtonPosition;
  }

  step(mousePicker) {
    if (mousePicker.pickedObject) {
      if (mousePicker.pickedObject.position.x < 0) {
        this.selectedPosition = this.continueButtonPosition;
      } else {
        this.selectedPosition = this.menuButtonPosition;
      }
    }

    if (mousePicker.selectedObject) {
      if (this.selectedPosition == this.continueButtonPosition) {
        this.state = "continue";
      }
      if (this.selectedPosition == this.menuButtonPosition)
        this.state = "menu";
    }
  }

  processInput(key) {
    const input = keyInputs[key];
    switch (input) {
      case "left":
        this.selectedPosition = this.continueButtonPosition;
        break;
      case "right":
        this.selectedPosition = this.menuButtonPosition;
        break;
      case "enter":
        if (this.selectedPosition == this.continueButtonPosition)
          this.state = "continue";
        if (this.selectedPosition == this.menuButtonPosition)
          this.state = "menu";
    }
  }
}

export { PickerModel };
