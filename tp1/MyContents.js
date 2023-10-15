import * as THREE from "three";
import { MyAxis } from "./MyAxis.js";
import { MyCake } from "./objects/MyCake.js";
import { MyPlane } from "./objects/MyPlane.js";
import { MyPlate } from "./objects/MyPlate.js";
import { MyTable } from "./objects/MyTable.js";
import { MyFlowerVase } from "./objects/MyFlowerVase.js";
import { MyBeetle } from "./objects/MyBeetle.js";
import { MyCounter } from "./objects/MyCounter.js";
import { MyPictureFrame } from "./objects/MyPictureFrame.js";
import { MyRug } from "./objects/MyRug.js";
import { MySofa } from "./objects/MySofa.js";
import { MySpring } from "./objects/MySpring.js";
import { MyNewspaper } from "./objects/MyNewspaper.js";
import { MyWindowWall } from "./objects/MyWindowWall.js";
import { MyCircularTable } from "./objects/MyCircularTable.js";
import { MyBench } from "./objects/MyBench.js";

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

    this.floor = new MyPlane(0, 0, 0, {
      color: "#919090",
      texturePath: "textures/floor.png",
    });
    this.roof = new MyPlane(1.5, 10, 0, {
      color: "#919090",
      texturePath: "textures/wallYellow.png",
      width: 13,
    });
    this.roof.getMesh().rotateX(Math.PI / 2);
    const wallColor = "#ffebeb";
    this.wall1 = new MyPlane(0, 5, -5, {
      color: wallColor,
      texturePath: "textures/wallYellow.png",
    }).getMesh();
    this.wall2 = new MyPlane(0, 5, 5, { color: wallColor, width: 13 }).getMesh();
    this.wall2.rotation.y = Math.PI;
    this.wall2.position.x = 1.5;
    this.wall3 = new MyPlane(-5, 5, 0, {
      color: "#dba79c",
      texturePath: "textures/brick.jpg",
    }).getMesh();
    this.wall3.rotation.y = Math.PI / 2;
    //this.wall4 = new MyPlane(5, 5, 0, {color: wallColor, texturePath: 'textures/coffee_window.jpg'}).getMesh();
    //this.wall4.rotation.y = -Math.PI / 2;
    this.wall4 = new MyWindowWall(5, 0, 0).getMesh();

    this.walls = [this.wall1, this.wall2, this.wall3, this.wall4];

    this.furniture = new THREE.Group();

    // Coffee table section
    let table = new MyTable(-1.5, 0, 2);
    this.furniture.add(table.getMesh());
    this.furniture.add(new MyPlate(0, table.getYTop() - 0.1, 3).getMesh());
    this.furniture.add(new MyCake(0, table.getYTop() + 0.05, 3).getMesh());
    let rug = new MyRug(0, 0, 2).getMesh();
    rug.rotation.y = Math.PI / 2;
    this.furniture.add(rug);
    this.furniture.add(new MySofa(0, 0, 0).getMesh());
    let smallSofa = new MySofa(3.5, 0, 3, 2, "#826563").getMesh();
    smallSofa.rotation.y = -Math.PI / 2;
    this.furniture.add(smallSofa);

    // Counter side table section
    this.furniture.add(new MyCircularTable(1.5, 0, -3.0).getMesh())
    this.furniture.add(new MyBench(2, 0, -2.0, 1.5).getMesh())
    this.furniture.add(new MyBench(2.5, 0, -3.5, 1.5).getMesh().rotateY(Math.PI / 5))
    this.furniture.add(new MyBench(0.5, 0, -2.5, 1.5).getMesh().rotateY(-Math.PI / 10))
    this.furniture.add(new MyBench(0.5, 0, -4, 1.5).getMesh().rotateY(-Math.PI / 15))
    this.furniture.add(new MyRug(1.5, 0, -3.0, 2.5, 3).getMesh().rotateY(Math.PI / 2 - Math.PI / 10))

    // Window side section
    this.furniture.add(new MyCircularTable(6.5, 0.5, 0.7, 1.5).getMesh())
    this.furniture.add(new MyFlowerVase(6.5, 2.1, 0.7).getMesh().rotateY(Math.PI))
    this.furniture.add(new MyBench(6.7, 0.5, -0.7, 0.7).getMesh().rotateY(-Math.PI / 20))
    this.furniture.add(new MyBench(6.8, 0.5, 1.5, 0.7).getMesh().rotateY(Math.PI / 10))
    this.furniture.add(new MyBench(5.8, 0.5, 0.5, 0.7).getMesh().rotateY(Math.PI / 3))
    this.furniture.add(new MyRug(6.5, 0.5, 1, 2, 3.5).getMesh().rotateY(-0.1))


    this.furniture.add(new MySpring(1, table.getYTop() + 0.05, 2.5).getMesh());

    this.furniture.add(new MyCounter(-2.5, 0, -5).getMesh());

    let newspaper = new MyNewspaper(-1.5, 0.89, -0.2).getMesh();
    newspaper.rotateY(Math.PI / 7);
    this.furniture.add(newspaper);

    let vase = new MyFlowerVase(-0.8, table.getYTop(), 2.8).getMesh();
    this.furniture.add(vase);

    this.createPictures();
  }

  createPictures() {
    let pictures = new THREE.Group();
    let pictureFrame1 = new MyPictureFrame(0, 4, 5, "textures/luis.jpg");
    pictureFrame1.getMesh().rotation.y = Math.PI / 2;
    let pictureFrame2 = new MyPictureFrame(2, 4.5, 5, "textures/martim.jpg");
    pictureFrame2.getMesh().rotation.y = Math.PI / 2;
    pictures.add(pictureFrame1.getMesh(), pictureFrame2.getMesh());

    let painting1 = new MyPictureFrame(-1, 4.5, -5, "textures/painting1.jpg", "#bdd", 1.3, 2);
    pictures.add(painting1.getMesh().rotateY(-Math.PI / 2));
    let painting2 = new MyPictureFrame(3, 4, -5, "textures/painting2.jpg", "#eee", 2.5, 2);
    pictures.add(painting2.getMesh().rotateY(-Math.PI / 2));

    let blackboard = new MyPictureFrame(
      -5,
      4.5,
      2,
      "textures/blackboard.png",
      "#ccc",
      3,
      2
    );
    pictures.add(blackboard.getMesh());

    let beetle = new MyBeetle(-5, 4, -3, 1.6, 1.1);
    //beetle.getMesh().rotation.y = Math.PI / 2
    pictures.add(beetle.getMesh());

    this.furniture.add(pictures);
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
    this.initLights();

    this.floor.getMesh().rotation.x = -Math.PI / 2;
    this.app.scene.add(this.floor.getMesh());
    this.app.scene.add(this.roof.getMesh());

    this.buildBox();
    this.app.scene.add(...this.walls);
    this.app.scene.add(this.furniture);
  }

  initLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight("#555");
    this.app.scene.add(ambientLight);

    // Point Light
    const pointLight = new THREE.PointLight(0xffffff, 150, 0);
    pointLight.position.set(0, 10, 0);
    this.app.scene.add(pointLight);

    const sphereSize = 0.5;
    const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
    this.app.scene.add(pointLightHelper);

    // Spot Light
    const spotLight = new THREE.SpotLight(
      0xffffff,
      20,
      6,
      (20 * Math.PI) / 180,
      0.4,
      1
    );
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 512; // default
    spotLight.shadow.mapSize.height = 512; // default
    spotLight.shadow.camera.near = 0.5; // default
    spotLight.shadow.camera.far = 500; // default
    spotLight.shadow.focus = 1; // default

    this.app.scene.add(spotLight.target);
    this.app.scene.add(spotLight);
    spotLight.position.set(0, 5, 3);
    spotLight.target.position.set(0, 0, 3);

    const spotLightHelper = new THREE.PointLightHelper(spotLight, 0.1);
    this.app.scene.add(spotLightHelper);

    // Directional Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(16, 7, 3);
    directionalLight.target.position.set(5, 0, 0);

    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 6144;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 30;
    directionalLight.shadow.camera.left = -15;
    directionalLight.shadow.camera.right = 15;
    directionalLight.shadow.camera.bottom = -20;
    directionalLight.shadow.camera.top = 30;
    directionalLight.shadow.bias = 0.0007
    directionalLight.shadow.radius = 8

    this.app.scene.add(directionalLight);

    const directionalLightHelper = new THREE.DirectionalLightHelper(
      directionalLight,
      5
    );
    this.app.scene.add(directionalLightHelper);
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
