class Controller {
  constructor() {
    if (this.constructor === Controller) {
      throw new Error("Cannot instantiate Controller directly");
    }
  }

  view = null;
  model = null;
}

Controller.prototype.step = function () {
  throw new Error("step method must be implemented by subclasses");
};

export { Controller };