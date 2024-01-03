import { GameController } from "../controllers/GameController.js";
import { CarLoader } from "../loader/CarLoader.js";
import { Car } from "../models/game/Car.js";
import { PauseState } from "./PauseState.js";
import { State } from "./State.js";

class GameState extends State {
  constructor(settings) {
    super();
    this.settings = settings ?? {};
    if (!this.settings.track) this.settings.track = "monza";
    if (!this.settings.car) {
      this.loadDefaultCar();
    }
    if (!this.settings.opponent && this.settings.car) {
      this.settings.opponent = JSON.parse(JSON.stringify(this.settings.car));
      this.settings.opponent.model = this.settings.car.model.clone();
    }
    this.settings.laps = this.settings.laps ?? 3;

    this.controller = new GameController(this.settings);
  }

  step() {
    const state = this.controller.step();
    if (state) {
      if (state == "pause") {
        return new PauseState(this);
      }
      return state;
    }
    return this;
  }

  /**
   * Loads a default car in case non is specified. <br>
   * Primarily used for testing.
   */
  loadDefaultCar() {
    const carsPath = "./assets/cars";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${carsPath}/cars.json`, false);
    xhr.send();
    const data = JSON.parse(xhr.responseText);
    this.settings.car = CarLoader.load(data.cars[1]);
    this.settings.car.name = "default"
    this.settings.opponent = CarLoader.load(data.cars[1]);
  }
}

export { GameState };
