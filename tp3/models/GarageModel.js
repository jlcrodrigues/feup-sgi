import { CarLoader } from "../loader/CarLoader.js";
import { Model } from "./Model.js";

const carsPath = './assets/cars';

const movements = {
  ArrowLeft: "left",
  ArrowRight: "right",
  Enter: "enter",
  Escape: "esc"
};

class GarageModel extends Model {
  constructor(settings) {
    super();

    this.selected = 0;

    const carData = this.loadCarData();
    this.cars = carData.map((car) => CarLoader.load(car));
    this.maxMaxSpeed = Math.max(...this.cars.map((car) => car.maxSpeed));
    this.maxAngularSpeed = Math.max(...this.cars.map((car) => car.defaultAngularSpeed));
    this.maxAcceleration = Math.max(...this.cars.map((car) => car.maxAcceleration));
  }

  step() {}

  processInput(code) {
    if (movements[code]) {
      if (movements[code] === "left") {
        this.selected = Math.max(0, this.selected - 1);
      }
      else if (movements[code] === "right") {
        this.selected = Math.min(this.cars.length - 1, this.selected + 1);
      }
      else if (movements[code] === "esc") {
        this.state = "menu";
      }
      else if (movements[code] === "enter"){
        this.state = "race";
      }
    }
  }

  loadCarData() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${carsPath}/cars.json`, false);
    xhr.send();
    const data = JSON.parse(xhr.responseText);

    return data.cars;
  }
}

export { GarageModel };
