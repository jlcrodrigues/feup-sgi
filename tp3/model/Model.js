class Model {
  constructor() {
    if (this.constructor === Model) {
      throw new Error("Cannot instantiate Model directly");
    }
  }
}

/*
AbstractController.prototype.render = function () {
  throw new Error("step method must be implemented by subclasses");
};

*/