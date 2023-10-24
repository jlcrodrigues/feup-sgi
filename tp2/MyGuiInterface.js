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
    // adds a folder to the gui interface for the camera
    // TODO: fix cameras missing from interface
    const cameraFolder = this.datgui.addFolder("Camera");
    let cameraNames = this.contents.app.cameras.map(
      (camera) => camera.custom_id
    );
    console.log(">>>>>>>>>>><<", this.app.cameras);
    console.log("---", this.contents.app.cameras);
    cameraFolder
      .add(this.app, "activeCameraName", cameraNames)
      .name("Active Camera");
    cameraFolder.open();
  }
}

export { MyGuiInterface };
