import { MousePicker } from "../MousePicker.js";
import { InitialModel } from "../models/InitialModel.js";
import { AboutState } from "../states/AboutState.js";
import { RaceMenuState } from "../states/RaceMenuState.js";
import { InitialView } from "../views/InitialView.js";
import { Controller } from "./Controller.js";
import * as THREE from "three";

class InitialController extends Controller {
    constructor(settings) {
        super();

        this.settings = settings ?? {}
        this.model = new InitialModel();
        this.view = new InitialView(this.model);

        if (!this.settings.playerName){
            var playerName = prompt("Please enter your name:");
            this.settings.playerName = playerName
        }

        //Objects to be considered by the MousePicker
        const objects = []
        this.view.scene.children[0].children.forEach(child => {
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
        
        if (this.model.state == 'play'){
            return new RaceMenuState(this.settings);
        }
        if (this.model.state == 'about'){
            return new AboutState(this.settings);
        }
        return null;
    }
}

export { InitialController };