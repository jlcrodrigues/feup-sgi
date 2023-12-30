import { MousePicker } from "../MousePicker.js";
import { InitialModel } from "../models/InitialModel.js";
import { AboutState } from "../states/AboutState.js";
import { RaceMenuState } from "../states/RaceMenuState.js";
import { InitialView } from "../views/InitialView.js";
import { Controller } from "./Controller.js";
import * as THREE from "three";

class InitialController extends Controller {
    constructor() {
        super();

        this.model = new InitialModel();
        this.view = new InitialView(this.model);
        
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
        this.model.step(this.mousePicker);
        this.view.step();
        this.mousePicker.step();
        
        if (this.model.state == 'play'){
            return new RaceMenuState();
        }
        if (this.model.state == 'about'){
            return new AboutState();
        }
        return null;
    }
}

export { InitialController };