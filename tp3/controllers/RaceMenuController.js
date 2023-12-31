import { MousePicker } from "../MousePicker.js";
import { RaceMenuModel } from "../models/RaceMenuModel.js";
import { GarageState } from "../states/GarageState.js";
import { InitialState } from "../states/InitalState.js";
import { TracksState } from "../states/TracksState.js";
import { RaceMenuView } from "../views/RaceMenuView.js";
import { Controller } from "./Controller.js";
import * as THREE from "three";

class RaceMenuController extends Controller {
    constructor(settings) {
        super();

        this.settings = settings ?? {}
        this.settings.race = false;

        this.model = new RaceMenuModel();
        this.view = new RaceMenuView(this.model);

        // Objects to be considered by the MousePicker
        const objects = []
        this.view.scene.children[0].children[1].children.slice(0,4).forEach(child => {
            if(child instanceof THREE.Group) objects.push(child)
        });
        this.mousePicker = new MousePicker(objects,this.view.camera);
        
        document.addEventListener("keydown", (event) => {
            this.model.processInput(event.code);
        });
      
    }

    
    step() {
        this.mousePicker.step();
        this.model.step(this.mousePicker);
        this.view.step();
        
        if (this.model.state == 'garage'){
            return new GarageState(this.settings);
        }
        else if (this.model.state == 'tracks'){
            return new TracksState(this.settings);
        }
        else if (this.model.state == 'initial')
            return new InitialState();
        else if (this.model.state == 'race'){
            this.settings.laps = this.model.laps 
            this.settings.race = true;
            return new TracksState(this.settings);
        }
        return null;
    }
}

export { RaceMenuController };