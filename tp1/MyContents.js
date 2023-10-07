import * as THREE from "three";
import { MyAxis } from "./MyAxis.js";
import { MyCake } from "./objects/MyCake.js";
import { Plane } from "./objects/Plane.js";
import { MyPlate } from "./objects/MyPlate.js";
import { MyTable } from "./objects/MyTable.js";
import { MyBench } from "./objects/MyBench.js";
import { Beetle } from "./objects/Beetle.js";
import { Counter } from "./objects/Counter.js";
import { PictureFrame } from "./objects/PictureFrame.js";
import { Rug } from "./objects/Rug.js";
import { Sofa } from "./objects/Sofa.js";
import { Spring } from "./objects/Spring.js";

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

    // box related attributes
    this.boxMesh = null;
    this.boxMeshSize = 1.0;
    this.boxEnabled = false;
    this.lastBoxEnabled = null;
    this.boxDisplacement = new THREE.Vector3(0, 2, 0);

    // plane related attributes
    this.diffusePlaneColor = "#808080";
    this.specularPlaneColor = "#777777";
    this.planeShininess = 30;
    this.planeMaterial = new THREE.MeshPhongMaterial({
      color: this.diffusePlaneColor,
      specular: this.diffusePlaneColor,
      emissive: "#000000",
      shininess: this.planeShininess,
      side: THREE.DoubleSide,
    });

    this.floor = new Plane(0, 0, 0, {color: "#919090", texturePath: 'textures/floor.png'});
    const wallColor = "#ffebeb";
    this.wall1 = new Plane(0, 5, -5, {color: wallColor, texturePath: 'textures/wallYellow.png'}).getMesh();
    this.wall2 = new Plane(0, 5, 5, {color: wallColor}).getMesh();
    this.wall2.rotation.y = Math.PI;
    this.wall3 = new Plane(-5, 5, 0, {color: "#dba79c", texturePath: 'textures/brick.jpg'}).getMesh();
    this.wall3.rotation.y = Math.PI / 2;
    this.wall4 = new Plane(5, 5, 0, {color: wallColor}).getMesh();
    this.wall4.rotation.y = -Math.PI / 2;

    this.walls = [this.wall1, this.wall2, this.wall3, this.wall4];

    this.furnite = new THREE.Group();

    let table = new MyTable(-1.5, 0, 2);
    this.furnite.add(table.getMesh());
    //this.furnite.add(new MyBench(0, 0, 0).getMesh())
    this.furnite.add(new MyPlate(0, table.getYTop() - 0.1, 3).getMesh());
    this.furnite.add(new MyCake(0, table.getYTop() + 0.05, 3).getMesh());
    let rug = new Rug(0, 0, 2).getMesh();
    rug.rotation.y = Math.PI / 2;
    this.furnite.add(rug);
    this.furnite.add(new Sofa(0, 0, 0).getMesh());
    let smallSofa = new Sofa(3.5, 0, 3, 2, "#826563").getMesh();
    smallSofa.rotation.y = -Math.PI / 2;
    this.furnite.add(smallSofa);

    this.furnite.add(new Spring(1, table.getYTop() + 0.05, 2.5).getMesh());

    this.furnite.add(new Counter(-2.5, 0, -5).getMesh());

    this.createPictures();
  }

  createPictures() {
    let pictures = new THREE.Group();
    let pictureFrame1 = new PictureFrame(0, 4, 5, "textures/feup_entry.jpg");
    pictureFrame1.getMesh().rotation.y = Math.PI / 2;
    let pictureFrame2 = new PictureFrame(2, 4.5, 5, "textures/feup_b.jpg");
    pictureFrame2.getMesh().rotation.y = Math.PI / 2;
    pictures.add(pictureFrame1.getMesh(), pictureFrame2.getMesh());

    let blackboard = new PictureFrame(
      -5,
      4.5,
      2,
      "textures/blackboard.png",
      "#ccc",
      3,
      2
    );
    pictures.add(blackboard.getMesh());

    let window = new PictureFrame(5, 4, -1, "textures/window.png", "#becedc", 6, 4);
    window.getMesh().rotation.y = Math.PI;
    pictures.add(window.getMesh());

    let beetle = new Beetle(-5, 4, -3, 1.6, 1.1);
    //beetle.getMesh().rotation.y = Math.PI / 2
    pictures.add(beetle.getMesh());

    this.furnite.add(pictures);
  }

  /**
   * builds the box mesh with material assigned
   */
  buildBox() {
    this.boxTexture = new THREE.TextureLoader().load("textures/feup_entry.jpg");
    this.boxTexture.wrapS = THREE.RepeatWrapping;
    this.boxTexture.wrapT = THREE.RepeatWrapping;
    let boxMaterial = new THREE.MeshPhongMaterial({
      map: this.boxTexture,
    });

    // Create a Cube Mesh with basic material
    let box = new THREE.BoxGeometry(
      this.boxMeshSize,
      this.boxMeshSize,
      this.boxMeshSize
    );
    this.boxMesh = new THREE.Mesh(box, boxMaterial);
    this.boxMesh.rotation.x = -Math.PI / 2;
    this.boxMesh.position.y = this.boxDisplacement.y;
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

    // add a point light on top of the model
    const pointLight = new THREE.PointLight(0xffffff, 500, 0);
    pointLight.position.set(0, 20, 0);
    this.app.scene.add(pointLight);

    // add a point light helper for the previous point light
    const sphereSize = 0.5;
    const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
    this.app.scene.add(pointLightHelper);

    // add an ambient light
    const ambientLight = new THREE.AmbientLight(0x555555);
    this.app.scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(
      0xffffff,
      20,
      5,
      (20 * Math.PI) / 180,
      0.4,
      1
    );
    this.app.scene.add(spotLight.target);
    this.app.scene.add(spotLight);
    spotLight.position.set(0, 5, 3);
    spotLight.target.position.set(0, 0, 3);

    const spotLightHelper = new THREE.PointLightHelper(spotLight, 0.1);
    this.app.scene.add(spotLightHelper);

    this.floor.getMesh().rotation.x = -Math.PI / 2;
    this.app.scene.add(this.floor.getMesh());

    this.buildBox();
    this.app.scene.add(...this.walls);
    this.app.scene.add(this.furnite);
  }

  /**
   * updates the diffuse plane color and the material
   * @param {THREE.Color} value
   */
  updateDiffusePlaneColor(value) {
    this.diffusePlaneColor = value;
    this.planeMaterial.color.set(this.diffusePlaneColor);
  }
  /**
   * updates the specular plane color and the material
   * @param {THREE.Color} value
   */
  updateSpecularPlaneColor(value) {
    this.specularPlaneColor = value;
    this.planeMaterial.specular.set(this.specularPlaneColor);
  }
  /**
   * updates the plane shininess and the material
   * @param {number} value
   */
  updatePlaneShininess(value) {
    this.planeShininess = value;
    this.planeMaterial.shininess = this.planeShininess;
  }

  /**
   * rebuilds the box mesh if required
   * this method is called from the gui interface
   */
  rebuildBox() {
    // remove boxMesh if exists
    if (this.boxMesh !== undefined && this.boxMesh !== null) {
      this.app.scene.remove(this.boxMesh);
    }
    this.buildBox();
    this.lastBoxEnabled = null;
  }

  /**
   * updates the box mesh if required
   * this method is called from the render method of the app
   * updates are trigered by boxEnabled property changes
   */
  updateBoxIfRequired() {
    if (this.boxEnabled !== this.lastBoxEnabled) {
      this.lastBoxEnabled = this.boxEnabled;
      if (this.boxEnabled) {
        this.app.scene.add(this.boxMesh);
      } else {
        this.app.scene.remove(this.boxMesh);
      }
    }
  }

  /**
   * updates the contents
   * this method is called from the render method of the app
   *
   */
  update() {
    // check if box mesh needs to be updated
    this.updateBoxIfRequired();

    // sets the box mesh position based on the displacement vector
    this.boxMesh.position.x = this.boxDisplacement.x;
    this.boxMesh.position.y = this.boxDisplacement.y;
    this.boxMesh.position.z = this.boxDisplacement.z;
  }
}

export { MyContents };
