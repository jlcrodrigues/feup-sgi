/**
 * Abstract View Class. <br>
 * Each view belongs to a state and must define `scene` and `camera`.
 */
class View {
  constructor(model) {
    if (this.constructor === View) {
      throw new Error("Cannot instantiate View directly");
    }

    this.model = model;
  }

  scene = null;
  camera = null;
}

export { View };