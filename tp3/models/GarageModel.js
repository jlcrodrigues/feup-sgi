import { CarLoader } from "../loader/CarLoader.js";
import { Model } from "./Model.js";

const carsPath = './assets/cars';

const movements = {
  ArrowLeft: "left",
  ArrowRight: "right",
  Enter: "enter",
};

class GarageModel extends Model {
  constructor(settings) {
    super();

    this.selected = 0;
    this.over = false;

    const carData = this.loadCarData();
    this.cars = carData.map((car) => CarLoader.load(car));
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

      if (movements[code] === "enter") {
        this.over = true;
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
