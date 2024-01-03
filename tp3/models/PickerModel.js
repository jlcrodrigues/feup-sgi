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
    this.modifiers = ["jump", "plus", "slowDown", "speedUp", "switcheroo"];

    this.selectedModifier = 0;
    this.coords = null;
  }

  step(mousePicker) {
    if (mousePicker.selectedObject) {
      if (this.modifiers.includes(mousePicker.pickedObject.name)) {
        this.selectedModifier = this.modifiers.indexOf(
          mousePicker.pickedObject.name
        );
      }

      if (mousePicker.pickedObject.name == "continue") {
        this.state = "continue";
      }

      if (mousePicker.pickedObject.name == "track") {
        // normalize coords
        let x = -0.58 + (0.58 + mousePicker.mouse.x) / (0.58 + 0.59);
        x *= window.innerWidth / 1362
        let y = -0.45 + (0.45 + mousePicker.mouse.y) / (0.45 + 0.41);
        y *= window.innerHeight / 939
        this.coords = [x, y];
        console.log(x, y);

        let modifier = {
          position: {
            x: (this.coords[0] + 0.58) * 1080 - 480,
            y: 2,
            z: (this.coords[1] + 0.45) * 600,
          },
        };
        console.log(modifier.position);
      }
    }
  }

  processInput(key) {
    const input = keyInputs[key];
    switch (input) {
      case "left":
        this.selectedModifier =
          (this.selectedModifier + this.modifiers.length - 1) %
          this.modifiers.length;
        break;
      case "right":
        this.selectedModifier =
          (this.selectedModifier + 1) % this.modifiers.length;
        break;
      case "enter":
        // TODO: handle exit
        break;
    }
  }
}

export { PickerModel };
