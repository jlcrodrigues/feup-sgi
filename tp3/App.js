import * as THREE from "three";
import { InitialState } from "./states/InitalState.js";

/**
 * The main App class. This is a singleton class.
 */
class App {
  static instance = null;

  constructor() {
    this.renderer = null;

    this.state = null;
  }

  static getInstance() {
    if (App.instance === null) {
      App.instance = new App();
    }

    return App.instance;
  }

  /**
   * The main entry point of the application. <br>
   * Creates the renderer and the inital state.
   */
  start() {
    this.state = new InitialState();

    // Create a renderer with Antialiasing
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor("#000000");
    // Configure renderer size
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Append Renderer to DOM
    document.getElementById("canvas").appendChild(this.renderer.domElement);

    // manage window resizes
    window.addEventListener("resize", this.onResize.bind(this), false);

    this.render();
  }

  /**
   * Window resize handler.
   */
  onResize() {
    if (this.state.getCamera() !== undefined && this.state.getCamera() !== null) {
      this.state.getCamera().aspect = window.innerWidth / window.innerHeight;
      this.state.getCamera().updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  /**
   * The main render loop. <br>
   * Called in a requestAnimationFrame loop. <br>
   * Uses the `scene` and `camera` from the current state.
   */
  render() {
    // render the scene
    this.renderer.render(this.state.getScene(), this.state.getCamera());

    // subsequent async calls to the render loop
    requestAnimationFrame(this.render.bind(this));
  }

  setState(state) {
    this.state = state;
  }
}

export { App };
