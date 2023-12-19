import { InitialView } from "../views/InitialView.js";
import { State } from "./State.js";

class InitialState extends State {
  constructor() {
    super();

    this.view = new InitialView();
  }

  step() {
    return this;
  }
}

export { InitialState };
