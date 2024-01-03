import { MousePicker } from "../MousePicker.js";
import { GameModel } from "../models/game/GameModel.js";
import { GameState } from "../states/GameState.js";
import { RaceMenuState } from "../states/RaceMenuState.js";
import { GameView } from "../views/game/GameView.js";
import { Controller } from "./Controller.js";
import * as THREE from "three" ;

class GameController extends Controller {
  constructor(settings) {
    super();

    this.settings = settings
    this.model = new GameModel(this.settings);
    this.view = new GameView(this.model);

    const objects = []
    this.view.scene.children[10].children.forEach(child => {
            if(child instanceof THREE.Group) objects.push(child)
        });
    this.mousePicker = new MousePicker(objects,this.view.camera);

    document.addEventListener("keydown", (event) => {
      this.model.processInput(event.code, true);
    });

    document.addEventListener("keyup", (event) => {
      this.model.processInput(event.code, false);
    });
  }

  step() {
    this.mousePicker.step();
    this.model.step(this.mousePicker);
    this.view.step();
    if (this.model.over) {
      this.view.cleanup();
    }
    if (this.model.state == 'play'){
      return new GameState(this.settings);
    }
    else if (this.model.state == 'menu'){
        return new RaceMenuState(this.settings);
    }

    return null;
  }
}

export { GameController };
