import { MousePicker } from "../MousePicker.js";
import { GameModel } from "../models/game/GameModel.js";
import { GarageState } from "../states/GarageState.js";
import { PauseState } from "../states/PauseState.js";
import { GameState } from "../states/GameState.js";
import { InitialState } from "../states/InitalState.js";
import { RaceMenuState } from "../states/RaceMenuState.js";
import { GameView } from "../views/game/GameView.js";
import { Controller } from "./Controller.js";
import * as THREE from "three" ;

class GameController extends Controller {
  constructor(settings) {
    super();

    this.pausing = false;

    this.settings = settings
    this.model = new GameModel(this.settings);
    this.view = new GameView(this.model);
    // console.log(this.view.scene)

    this.objects = []
    this.loadedObjects = false
    this.mousePicker = null

    document.addEventListener("keydown", (event) => {
      this.model.processInput(event.code, true);
    });

    document.addEventListener("keyup", (event) => {
      if (event.code === "Escape") {
        this.pausing = true;
      }
      this.model.processInput(event.code, false);
    });
  }

  step() {
    
    if (this.model.over) {
      
      this.view.cleanup();
      if (!this.loadedObjects){
        this.view.scene.children[13].children.forEach(child => {
          if(child instanceof THREE.Group) this.objects.push(child)
        });
        this.mousePicker = new MousePicker(this.objects,this.view.camera);
        this.loadedObjects = true
      }
    }
    if (this.mousePicker)
      this.mousePicker.step();
    this.model.step(this.mousePicker);
    this.view.step();
    if (this.pausing) {
      this.pausing = false;
      this.view.cleanup();
      return "pause";
    }
    if (this.model.state == "picker") {
      this.view.cleanup();
      return "picker";
    }

    if (this.model.state == 'play'){
      return new RaceMenuState(this.settings);
    }
    else if (this.model.state == 'initial'){
        return new InitialState(this.settings);
    }

    return null;
  }
}

export { GameController };
