import * as THREE from "three";
import { MyAxis } from "./MyAxis.js";
import { MyCake } from "./objects/MyCake.js";
import { MyPlane } from "./objects/MyPlane.js";
import { MyPlate } from "./objects/MyPlate.js";
import { MyTable } from "./objects/MyTable.js";
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

    this.floorMesh = new MyPlane("#919090");
    const wallColor = "#ffebeb";
    this.wall1 = new MyPlane(wallColor, 0, 5, -5).getMesh();
    this.wall2 = new MyPlane(wallColor, 0, 5, 5).getMesh();
    this.wall2.rotation.y = Math.PI;
    this.wall3 = new MyPlane(wallColor, -5, 5, 0).getMesh();
    this.wall3.rotation.y = Math.PI / 2;
    this.wall4 = new MyPlane(wallColor, 5, 5, 0).getMesh();
    this.wall4.rotation.y = -Math.PI / 2;

    this.walls = [this.wall1, this.wall2, this.wall3, this.wall4];

    this.table = new MyTable(-1.5, 0, 2);
    this.bench = new MyBench(0, 0, 0);
    this.plate = new MyPlate(0, 1.62, 3);
    this.cake = new MyCake(0, 1.77, 3);
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

    let plane = new THREE.PlaneGeometry(10, 10);
    this.planeMesh = new THREE.Mesh(plane, this.planeMaterial);
    this.planeMesh.rotation.x = -Math.PI / 2;
    this.planeMesh.position.y = -0;
    this.app.scene.add(this.planeMesh);

    this.buildBox();
    this.app.scene.add(...this.walls);
    this.app.scene.add(this.table.getMesh());
    this.app.scene.add(this.bench.getMesh());
    this.app.scene.add(this.plate.getMesh());
    this.app.scene.add(this.cake.getMesh());
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
