import { MousePicker } from "../MousePicker.js";
import { PickerModel } from "../models/PickerModel.js";
import { InitialState } from "../states/InitalState.js";
import { PickerView } from "../views/PickerView.js";
import { Controller } from "./Controller.js";
import * as THREE from "three";

class PickerController extends Controller {
  constructor(gameState) {
    super();

    this.gameState = gameState;

    this.model = new PickerModel();
    this.view = new PickerView(this.model);

    //Objects to be considered by the MousePicker
    const objects = [];
    this.view.scene.children[0].children.forEach((child) => {
      if (child instanceof THREE.Group) objects.push(child);
    });
    this.mousePicker = new MousePicker(objects, this.view.camera);

    document.addEventListener("keydown", (event) => {
      this.model.processInput(event.code);
    });
  }

  step() {
    this.mousePicker.step();
    this.model.step(this.mousePicker);
    this.view.step();

    if (this.model.state) { // over
      if (this.model.state == "continue") {
        return this.gameState;
      }
      if (this.model.state == "menu") {
        return new InitialState();
      }
    }
    return null;
  }
}

export { PickerController };
