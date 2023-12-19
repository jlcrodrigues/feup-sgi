/**
 * Abstract State class. <br>
 * Each state must have a model, view and controller and implement step().
 */
class State {
  constructor() {
    if (this.constructor === State) {
      throw new Error("Cannot instantiate State directly");
    }
  }

  view = null;
  camera = null;

  getScene() {
    return this.view.scene;
  }

  getCamera() {
    return this.view.camera;
  }
}

State.prototype.step = function () {
  throw new Error("step method must be implemented by subclasses");
};

export { State };