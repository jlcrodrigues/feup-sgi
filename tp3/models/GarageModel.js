import { CarLoader } from "../loader/CarLoader.js";
import { Model } from "./Model.js";

const carsPath = './assets/cars';

const movements = {
  ArrowLeft: "left",
  ArrowRight: "right",
};

class GarageModel extends Model {
  constructor(settings) {
    super();

    const carData = this.loadCarData();
    this.cars = carData.map((car) => CarLoader.load(car));
  }

  step() {}

  processInput(code) {}

  loadCarData() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${carsPath}/cars.json`, false);
    xhr.send();
    const data = JSON.parse(xhr.responseText);

    return data.cars;
  }
}

export { GarageModel };
