import * as THREE from "three";
import { MyAxis } from "./MyAxis.js";
import { MyBuilder } from "./builders/MyBuilder.js";
import { MyFileReader } from "./parser/MyFileReader.js";
import { MyCamerasBuilder } from "./builders/MyCamerasBuilder.js";
import { MySkyboxBuilder } from "./builders/MySkyboxBuilder.js";
/**
 *  This class contains the contents of out application
 */
class MyContents {
  /**
       constructs the object
       @param {MyApp} app The application object
    */
  constructor(app) {
    this.app = app;
    this.axis = null;

    this.reader = new MyFileReader(app, this, this.onSceneLoaded);
    this.reader.open("scenes/demo/demo.xml");
  }

  /**
   * initializes the contents
   */
  init() {
    // create once
    if (this.axis === null) {
      // create and attach the axis to the scene
      this.axis = new MyAxis(this);
      this.app.scene.add(this.axis);
    }
  }

  /**
   * Called when the scene xml file load is complete
   * @param {MySceneData} data the entire scene data object
   */
  onSceneLoaded(data) {
    // Build Materials and Textures
    let builder = new MyBuilder(data);
    // Build scene graph
    this.app.scene.add(builder.buildGraph());

    // Build Cameras
    MyCamerasBuilder.build(this.app, data);

    // Set global settings: fov, ambient & background
    this.app.scene.fog = new THREE.Fog(
      data.fog.color,
      data.fog.near,
      data.fog.far
    );
    const ambientLight = new THREE.AmbientLight(data.options.ambient);
    this.app.scene.add(ambientLight);
    this.app.scene.background = data.options.background;

    // Build Skybox
    for (let sbKey in data.skyboxes) {
      this.app.scene.add(MySkyboxBuilder.build(data.skyboxes[sbKey]))
    }

    // TODO: lod
    // Build LOD

    console.info(
      "scene data loaded " +
        data +
        ". visit MySceneData javascript class to check contents for each data item."
    );
    this.onAfterSceneLoadedAndBeforeRender(data);
  }

  output(obj, indent = 0) {
    console.log(
      "" +
        new Array(indent * 4).join(" ") +
        " - " +
        obj.type +
        " " +
        (obj.id !== undefined ? "'" + obj.id + "'" : "")
    );
  }

  onAfterSceneLoadedAndBeforeRender(data) {
    // refer to descriptors in class MySceneData.js
    // to see the data structure for each item

    this.output(data.options);
    console.log("textures:");
    for (var key in data.textures) {
      let texture = data.textures[key];
      this.output(texture, 1);
    }

    console.log("materials:");
    for (var key in data.materials) {
      let material = data.materials[key];
      this.output(material, 1);
    }

    console.log("cameras:");
    for (var key in data.cameras) {
      let camera = data.cameras[key];
      this.output(camera, 1);
    }

    console.log("nodes:");
    for (var key in data.nodes) {
      let node = data.nodes[key];
      this.output(node, 1);
      for (let i = 0; i < node.children.length; i++) {
        let child = node.children[i];
        if (child.type === "primitive") {
          console.log(
            "" +
              new Array(2 * 4).join(" ") +
              " - " +
              child.type +
              " with " +
              child.representations.length +
              " " +
              child.subtype +
              " representation(s)"
          );
          if (child.subtype === "nurbs") {
            console.log(
              "" +
                new Array(3 * 4).join(" ") +
                " - " +
                child.representations[0].controlpoints.length +
                " control points"
            );
          }
        } else {
          this.output(child, 2);
        }
      }
    }
  }

  update() {}
}

export { MyContents };
