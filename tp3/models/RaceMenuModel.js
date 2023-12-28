import { Model } from "./Model.js";
import * as THREE from "three";

const keyInputs = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "up",
  ArrowDown: "down",
  Enter: "enter",
  Escape: "esc"
}

const defaultLaps = 3
const minLaps = 1
const maxLaps = 5

class RaceMenuModel extends Model {
  constructor() {
    super();

    this.buttonSize = [1.5,0.7,0.1]
    this.lapsSelectorSize = [0.2,0.5,0.1]

    const borderGeometry = new THREE.BoxGeometry(this.buttonSize[0]+0.05,0.03,this.buttonSize[2]);
    const borderMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.border = new THREE.Mesh(borderGeometry, borderMaterial);

    this.garageButtonPosition = [-1.5,0.75,0.05]
    this.tracksButtonPosition = [1.5,0.75,0.05]
    this.lapsSelectorPosition = [0,-0.75,0.1]
    this.lapsLabelPosition = [0,-0.1,0]

    this.laps = defaultLaps

    this.selectedPosition = this.garageButtonPosition

  }

  step(){}

  processInput(key){
    const input = keyInputs[key];
    switch (input){
      case 'left': 
        if (this.selectedPosition == this.lapsSelectorPosition) {
          this.laps = Math.max(minLaps,this.laps-1);
          this.selectedPosition[0] = this.laps - defaultLaps
        }
        else{
          this.selectedPosition = this.garageButtonPosition;
        }
        break;
      case 'right': 
        if (this.selectedPosition == this.lapsSelectorPosition) {
          this.laps = Math.min(maxLaps,this.laps+1);
          this.selectedPosition[0] = this.laps - defaultLaps
        }
        else{
          this.selectedPosition = this.tracksButtonPosition;
        }
        break;
      case 'down': 
        this.selectedPosition = this.lapsSelectorPosition; 
        this.border.scale.set(this.lapsSelectorSize[0]/(this.buttonSize[0]-0.05),this.lapsSelectorSize[1]/0.029,this.lapsSelectorSize[2]/this.buttonSize[2]);  
        break;
      case 'up': 
        this.selectedPosition = this.garageButtonPosition; 
        this.border.scale.set(1,1,1);  
        break;
      case 'enter': 
        if (this.selectedPosition == this.garageButtonPosition){ 
          this.state = 'garage'; 
        } else if (this.selectedPosition == this.tracksButtonPosition){
          this.state = 'tracks';
        }
        break;
      case "esc":
        this.state = 'initial';
        break;
    }
  }
}

export { RaceMenuModel };
