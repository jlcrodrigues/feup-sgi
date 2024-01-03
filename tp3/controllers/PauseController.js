import { MousePicker } from "../MousePicker.js";
import { PauseModel } from "../models/PauseModel.js";
import { InitialState } from "../states/InitalState.js";
import { PauseView } from "../views/PauseView.js";
import { Controller } from "./Controller.js";
import * as THREE from "three";

class PauseController extends Controller {
  constructor(gameState) {
    super();

    this.gameState = gameState;

    this.model = new PauseModel();
    this.view = new PauseView(this.model);

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

export { PauseController };
