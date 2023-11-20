/**
 * Defines configuration to be used together with the GUI. <br>
 * Each config will have an active and last properties, to keep track of updates.
 */
class Config {
  config;
  constructor() {
    this.config = new Map();
  }

  /**
   * Adds a new config to the list
   * @param {String} name Name of the config
   * @param {*} value Initial value
   */
  add(name, value) {
    this.config.set(name, { active: value, last: value });
  }

  /**
   * Get the active value of a config
   * @param {String} name Name of the config
   * @returns {*} The active value
   */
  get(name) {
    return this.config.get(name).active;
  }

  /**
   * Check if a config has changed
   * @param {String} name Name of the config
   * @returns {Boolean} True if the config has changed
   */
  differ(name) {
    return this.config.get(name).active != this.config.get(name).last;
  }

  /**
   * Set the active value of a config
   * @param {*} name
   * @param {*} value
   */
  set(name, value, update=false) {
    this.config.get(name).active = value;
    if (update) this.update(name);
  }

  /**
   * Update config. last = active <br>
   * Do this after updating the active value and dealing with the change
   * @param {*} name Name of the config
   */
  update(name) {
    this.config.get(name).last = this.config.get(name).active;
  }

  /**
   * Get the active var of a config <br>
   * This is meant to be used with the GUI
   * @param {String} name Name of the config
   * @returns {*} The active value
   */
  getVar(name) {
    return this.config.get(name);
  }
}

export { Config };
