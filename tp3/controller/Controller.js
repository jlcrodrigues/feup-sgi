class Controller {
  constructor() {
    if (this.constructor === Controller) {
      throw new Error("Cannot instantiate Controller directly");
    }
  }
}

AbstractController.prototype.step = function () {
  throw new Error("step method must be implemented by subclasses");
};
