import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { MyContents } from "./MyContents.js";
import { MyGuiInterface } from "./MyGuiInterface.js";
import Stats from "three/addons/libs/stats.module.js";
import { Config } from "./model/Config.js";

/**
 * This class contains the application object
 */
class MyApp {
  /**
   * the constructor
   */
  constructor() {
    this.scene = null;
    this.stats = null;

    // camera related attributes
    this.activeCamera = null;
    this.cameras = [];
    this.frustumSize = 20;

    this.config = new Config();
    this.config.add("cameraName", null);
    this.config.add("cameraPosX", 0);
    this.config.add("cameraPosY", 0);
    this.config.add("cameraPosZ", 0);
    this.config.add("cameraTargetX", 0);
    this.config.add("cameraTargetY", 0);
    this.config.add("cameraTargetZ", 0);

    this.config.add("axis", false);
    this.config.add("wireframe", false);
    this.config.add("shadows", true);
    this.config.add("skybox", true);
    this.config.add("lights", true);
    this.config.add("lightHelpers", false);

    // other attributes
    this.renderer = null;
    this.controls = null;
    this.gui = null;
    this.contents == null;
  }
  /**
   * initializes the application
   */
  init() {
    // Create an empty scene
    this.scene = new THREE.Scene();
    //this.scene.background = new THREE.Color(0x101010);

    this.stats = new Stats();
    this.stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom);

    // Create a renderer with Antialiasing
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor("#000000");
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;

    // Configure renderer size
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Append Renderer to DOM
    document.getElementById("canvas").appendChild(this.renderer.domElement);

    // manage window resizes
    window.addEventListener("resize", this.onResize.bind(this), false);
  }

  /**
   * sets the active camera by name
   * @param {String} cameraName
   */
  setActiveCamera(cameraName) {
    this.config.set("cameraName", cameraName);
    this.activeCamera = this.cameras[cameraName];
  }

  /**
   * the window resize handler
   */
  onResize() {
    if (this.activeCamera !== undefined && this.activeCamera !== null) {
      this.activeCamera.aspect = window.innerWidth / window.innerHeight;
      this.activeCamera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
  /**
   *
   * @param {MyContents} contents the contents object
   */
  setContents(contents) {
    this.contents = contents;
  }

  /**
   * @param {MyGuiInterface} contents the gui interface object
   */
  setGui(gui) {
    this.gui = gui;
  }

  /**
   * the main render function. Called in a requestAnimationFrame loop
   */
  render() {
    this.stats.begin();
    this.updateIfRequired();

    // update the animation if contents were provided
    if (this.activeCamera !== undefined && this.activeCamera !== null) {
      this.contents.update();
    }

    // required if controls.enableDamping or controls.autoRotate are set to true
    this.controls.update();

    // render the scene
    this.renderer.render(this.scene, this.activeCamera);

    // subsequent async calls to the render loop
    requestAnimationFrame(this.render.bind(this));

    this.config.update("cameraName");
    this.stats.end();
  }

  /**
   * Make necessary updates after interface changes
   */
  updateIfRequired() {
    if (this.config.differ("cameraName")) this.updateCamera();
    if (this.config.differ("cameraPosX")) this.updateCameraPosition();
    if (this.config.differ("cameraPosY")) this.updateCameraPosition();
    if (this.config.differ("cameraPosZ")) this.updateCameraPosition();
    if (this.config.differ("cameraTargetX")) this.updateCameraTargetPosition();
    if (this.config.differ("cameraTargetY")) this.updateCameraTargetPosition();
    if (this.config.differ("cameraTargetZ")) this.updateCameraTargetPosition();
    if (this.config.differ("axis")) this.updateAxis();
    if (this.config.differ("wireframe")) this.updateWireframes();
    if (this.config.differ("shadows")) this.updateShadows();
    if (this.config.differ("skybox")) this.updateSkybox();
    if (this.config.differ("lights")) this.updateLights();
    if (this.config.differ("lightHelpers")) this.updateLightHelpers();
  }

  updateCameraPosition() {
    for (const delta of ["x", "y", "z"].values()) {
      const configName = "cameraPos" + delta.toUpperCase();
      this.config.update(configName);
      this.activeCamera.position[delta] = this.config.get(configName);
    }
  }

  updateCameraTargetPosition() {
    for (const delta of ["x", "y", "z"].values()) {
      const configName = "cameraTarget" + delta.toUpperCase();
      this.config.update(configName);
      this.controls.target[delta] = this.config.get(configName);
    }
  }

  updateAxis() {
    this.config.update("axis");
    this.contents.axis.visible = this.config.get("axis");
  }

  updateWireframes() {
    this.config.update("wireframe");
    this.contents.updateWireframes(this.config.get("wireframe"));
  }

  updateShadows() {
    this.config.update("shadows");
    this.renderer.shadowMap.enabled = this.config.get("shadows");
    this.scene.traverse(function (child) {
      if (child.material) {
        child.material.needsUpdate = true;
      }
    });
  }

  updateSkybox() {
    this.config.update("skybox");
    this.contents.viewSkybox(this.config.get("skybox"));
  }

  updateLights() {
    this.config.update("lights");
    this.contents.updateLights(this.config.get("lights"));
  }

  updateLightHelpers() {
    this.config.update("lightHelpers");
    this.contents.updateLightHelpers(this.config.get("lightHelpers"));
  }

  /**
   * updates the active camera if required
   * this function is called in the render loop
   * when the active camera name changes
   * it updates the active camera and the controls
   */
  updateCamera() {
    this.config.update("cameraName");
    this.activeCamera = this.cameras[this.config.get("cameraName")];
    document.getElementById("camera").innerHTML = this.config.get("cameraName");

    // call on resize to update the camera aspect ratio
    // among other things
    this.onResize();

    // are the controls yet?
    if (this.controls === null) {
      // Orbit controls allow the camera to orbit around a target.
      this.controls = new OrbitControls(
        this.activeCamera,
        this.renderer.domElement
      );
      this.controls.enableZoom = true;
      this.controls.update();
    } else {
      this.controls.object = this.activeCamera;
    }

    this.config.set("cameraPosX", this.activeCamera.position.x, true);
    this.config.set("cameraPosY", this.activeCamera.position.y, true);
    this.config.set("cameraPosZ", this.activeCamera.position.z, true);

    this.config.set("cameraTargetX", this.controls.target.x, true);
    this.config.set("cameraTargetY", this.controls.target.y, true);
    this.config.set("cameraTargetZ", this.controls.target.z, true);
  }
}

export { MyApp };
