import { Model } from "./Model.js";
import * as THREE from "three";

const keyInputs = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "up",
  ArrowDown: "down",
  Enter: "enter"
}

const defaultLaps = 3
const minLaps = 1
const maxLaps = 5

class RaceMenuModel extends Model {
  constructor() {
    super();

    this.buttonSize = [1.5,0.7,0.1]
    this.lapsButtonSize = [0.2,0.5,0.1]

    const borderGeometry = new THREE.BoxGeometry(this.buttonSize[0]+0.05,this.buttonSize[1]+0.05,this.buttonSize[2]);
    const borderMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    this.border = new THREE.Mesh(borderGeometry, borderMaterial);

    this.garageButtonPosition = [-1.5,0.75,0.05]
    this.trackButtonPosition = [1.5,0.75,0.05]
    this.lapsButtonPosition = [0,-0.75,0.1]

    this.laps = defaultLaps

    this.selectedPosition = this.garageButtonPosition

  }

  step(){}

  processInput(key){
    const input = keyInputs[key];
    switch (input){
      case 'left': 
        if (this.selectedPosition == this.lapsButtonPosition) {
          this.laps = Math.max(minLaps,this.laps-1);
          this.selectedPosition[0] = this.laps - defaultLaps
        }
        else{
          this.selectedPosition = this.garageButtonPosition;
        }
        break;
      case 'right': 
        if (this.selectedPosition == this.lapsButtonPosition) {
          this.laps = Math.min(maxLaps,this.laps+1);
          this.selectedPosition[0] = this.laps - defaultLaps
        }
        else{
          this.selectedPosition = this.trackButtonPosition;
        }
        break;
      case 'down': 
        this.selectedPosition = this.lapsButtonPosition; 
        this.border.scale.set(this.lapsButtonSize[0]/this.buttonSize[0],this.lapsButtonSize[1]/this.buttonSize[1],this.lapsButtonSize[2]/this.buttonSize[2]);  
        break;
      case 'up': this.selectedPosition = this.garageButtonPosition; break;
      case 'enter': if (this.selectedPosition == this.garageButtonPosition){ this.state = 'garage'; break;}
    }
  }
}

export { RaceMenuModel };
