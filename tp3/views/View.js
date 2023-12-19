/**
 * Abstract View Class. <br>
 * Each view belongs to a state and must define `scene` and `camera`.
 */
class View {
  constructor() {
    if (this.constructor === View) {
      throw new Error("Cannot instantiate View directly");
    }
  }

  scene = null;
  camera = null;
}

/*
AbstractController.prototype.render = function () {
  throw new Error("step method must be implemented by subclasses");
};

*/

export { View };