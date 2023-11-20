import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { MyApp } from "./MyApp.js";
import { MyContents } from "./MyContents.js";

/**
    This class customizes the gui interface for the app
*/
class MyGuiInterface {
  /**
   *
   * @param {MyApp} app The application object
   */
  constructor(app) {
    this.app = app;
    this.datgui = new GUI();
    this.contents = null;
  }

  /**
   * Set the contents object
   * @param {MyContents} contents the contents objects
   */
  setContents(contents) {
    this.contents = contents;
  }

  /**
   * Initialize the gui interface
   */
  init() {
    this.initCamerasFolder();

    const viewFolder = this.datgui.addFolder("View");

    viewFolder.add(this.app.config.getVar("axis"), "active").name("Axis");
    viewFolder.add(this.app.config.getVar("wireframe"), "active").name("Wireframes");
    viewFolder.add(this.app.config.getVar("shadows"), "active").name("Shadows");
    viewFolder.add(this.app.config.getVar("skybox"), "active").name("Skybox");

    const lightsFolder = viewFolder.addFolder("Lights");
    lightsFolder.open();
    lightsFolder.add(this.app.config.getVar("lights"), "active").name("Lights");
    lightsFolder
      .add(this.app.config.getVar("lightHelpers"), "active")
      .name("Light Helpers");
  }

  initCamerasFolder() {
    const cameraFolder = this.datgui.addFolder("Camera");
    let cameraNames = Object.keys(this.app.cameras);
    cameraFolder
      .add(this.app.config.getVar("cameraName"), "active", cameraNames)
      .name("Active Camera");
    cameraFolder.open();

    const positionFolder = cameraFolder.addFolder("Position");
    const cDelta = 50;
    positionFolder
      .add(this.app.config.getVar("cameraPosX"), "active", -cDelta, cDelta)
      .name("X").listen();
    positionFolder
      .add(this.app.config.getVar("cameraPosY"), "active", -cDelta, cDelta)
      .name("Y").listen();
    positionFolder
      .add(this.app.config.getVar("cameraPosZ"), "active", -cDelta, cDelta)
      .name("Z").listen();

    const targetFolder = cameraFolder.addFolder("Target");
    targetFolder.close();
    targetFolder
      .add(this.app.config.getVar("cameraTargetX"), "active", -cDelta, cDelta)
      .name("X").listen();
    targetFolder
      .add(this.app.config.getVar("cameraTargetY"), "active", -cDelta, cDelta)
      .name("Y").listen();
    targetFolder
      .add(this.app.config.getVar("cameraTargetZ"), "active", -cDelta, cDelta)
      .name("Z").listen();
  }
}

export { MyGuiInterface };
