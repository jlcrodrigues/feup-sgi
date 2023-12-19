class Model {
  constructor() {
    if (this.constructor === Model) {
      throw new Error("Cannot instantiate Model directly");
    }
  }
}

export { Model };