/**
 * Abstract State class. <br>
 * Each state must have a controller and implement step().
 */
class State {
  constructor() {
    if (this.constructor === State) {
      throw new Error("Cannot instantiate State directly");
    }
  }

  getScene() {
    return this.controller.view.scene;
  }

  getCamera() {
    return this.controller.view.camera;
  }
}

State.prototype.step = function () {
  throw new Error("step method must be implemented by subclasses");
};

export { State };