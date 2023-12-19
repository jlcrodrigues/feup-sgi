import * as THREE from "three";
import { MyBuilder } from "./builders/MyBuilder.js";
import { MyFileReader } from "./parser/MyFileReader.js";
import { MyCamerasBuilder } from "./builders/MyCamerasBuilder.js";
import { MySkyboxBuilder } from "./builders/MySkyboxBuilder.js";
import { App } from "../App.js";
/**
 *  This class contains the contents of out application
 */
class SceneLoader {
  /**
       constructs the object
    */
  constructor(scene) {
    this.scene = scene;
  }
  
  load() {
    this.reader = new MyFileReader(App.getInstance(), this, this.onSceneLoaded);
    this.reader.open("assets/scenes/t08g10/SGI_TP2_XML_T08_G10_v02.xml");
  }

  /**
   * Called when the scene xml file load is complete
   * @param {MySceneData} data the entire scene data object
   */
  onSceneLoaded(data) {
    // Build Materials and Textures
    this.builder = new MyBuilder(data);
    // Build scene graph
    this.scene.add(this.builder.buildGraph());

    // Build Cameras
    this.cameras = MyCamerasBuilder.build(data);

    // Set global settings: fov, ambient & background
    this.scene.fog = new THREE.Fog(
      data.fog.color,
      data.fog.near,
      data.fog.far
    );
    const ambientLight = new THREE.AmbientLight(data.options.ambient);
    this.scene.add(ambientLight);
    this.scene.background = data.options.background;

    // Build Skybox
    this.skyboxes = [];
    for (let sbKey in data.skyboxes) {
      const skybox = MySkyboxBuilder.build(data.skyboxes[sbKey]);
      this.scene.add(skybox);
      this.skyboxes.push(skybox);
    }

    /*
    console.info(
      "scene data loaded " +
        data +
        ". visit MySceneData javascript class to check contents for each data item."
    );
    this.onAfterSceneLoadedAndBeforeRender(data);
    */
    //console.log(data);
  }
}

export { SceneLoader };
