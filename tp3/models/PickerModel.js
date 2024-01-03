import { Model } from "./Model.js";

const keyInputs = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "left",
  ArrowDown: "right",
  Enter: "enter",
};

class PickerModel extends Model {
  constructor(gameState) {
    super();

    this.gameState = gameState;
    this.modifiers = ["jump", "plus", "slowDown", "speedUp", "switcheroo"]

    this.selectedModifier = 0;
  }

  step(mousePicker) {
    if (mousePicker.selectedObject) {
      if (this.modifiers.includes(mousePicker.pickedObject.name)) {
        this.selectedModifier = this.modifiers.indexOf(mousePicker.pickedObject.name);
      }

      if (mousePicker.pickedObject.name == "continue") {
        this.state = "continue";
      }
    }
  }

  processInput(key) {
    const input = keyInputs[key];
    switch (input) {
      case "left":
        this.selectedModifier = (this.selectedModifier + this.modifiers.length - 1) % this.modifiers.length;
        break;
      case "right":
        this.selectedModifier = (this.selectedModifier + 1) % this.modifiers.length;
        break;
      case "enter":
        // TODO: handle exit
        break;
    }
  }
}

export { PickerModel };
