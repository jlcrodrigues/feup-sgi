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

    this.buttonSize = [1.5,0.5,0.1]
    this.borderSize = [this.buttonSize[0],0.03,this.buttonSize[2]]
    this.lapsSelectorSize = [0.2,0.5,0.1]
    this.raceButtonSize = [1.5,0.5,0.1]

    const borderGeometry = new THREE.BoxGeometry(...this.borderSize);
    const borderMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.border = new THREE.Mesh(borderGeometry, borderMaterial);

    this.garageButtonPosition = [-1.5,0.25,0.02]
    this.tracksButtonPosition = [1.5,0.25,0.02]
    this.lapsLabelPosition = [0,-0.5,0]
    this.lapsSelectorPosition = [0,-1,0.1]
    this.raceButtonPosition = [0,-3, 0.02]

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
        else if (this.selectedPosition == this.tracksButtonPosition){
          this.selectedPosition = this.garageButtonPosition;
        }
        break;
      case 'right': 
        if (this.selectedPosition == this.lapsSelectorPosition) {
          this.laps = Math.min(maxLaps,this.laps+1);
          this.selectedPosition[0] = this.laps - defaultLaps
        }
        else if (this.selectedPosition == this.garageButtonPosition){
          this.selectedPosition = this.tracksButtonPosition;
        }
        break;
      case 'down': 
        if (this.selectedPosition[1] == this.garageButtonPosition[1]){
          this.selectedPosition = this.lapsSelectorPosition; 
          this.border.scale.set(this.lapsSelectorSize[0]/(this.borderSize[0]-0.1),this.lapsSelectorSize[1]/(this.borderSize[1]-0.001),this.lapsSelectorSize[2]/this.buttonSize[2]);
        }
        else if (this.selectedPosition == this.lapsSelectorPosition){
          this.selectedPosition = this.raceButtonPosition
          this.border.scale.set(1,1,1);
        }
        break;
      case 'up': 
        if (this.selectedPosition == this.lapsSelectorPosition){
          this.selectedPosition = this.garageButtonPosition; 
          this.border.scale.set(1,1,1); 
        }
        else if (this.selectedPosition == this.raceButtonPosition){
          this.selectedPosition = this.lapsSelectorPosition
          this.border.scale.set(this.lapsSelectorSize[0]/(this.borderSize[0]-0.1),this.lapsSelectorSize[1]/(this.borderSize[1]-0.001),this.lapsSelectorSize[2]/this.buttonSize[2]);
        } 
        break;
      case 'enter': 
        if (this.selectedPosition == this.garageButtonPosition){ 
          this.state = 'garage'; 
        } else if (this.selectedPosition == this.tracksButtonPosition){
          this.state = 'tracks';
        } else if (this.selectedPosition == this.raceButtonPosition){
          this.state = 'game'
        }
        break;
      case "esc":
        this.state = 'initial';
        break;
    }
  }
}

export { RaceMenuModel };
