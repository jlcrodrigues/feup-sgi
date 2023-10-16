import * as THREE from "three";
import { MyAxis } from "./MyAxis.js";
import { MyFurniture } from "./MyFurniture.js";
import { MyFoundation } from "./MyFoundation.js";

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

    this.buildBox();
    this.app.scene.add(new MyFoundation().getMesh());
    this.app.scene.add(new MyFurniture().getMesh());
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
      15,
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
    spotLight.position.set(0, 5, 3.5);
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
    directionalLight.shadow.bias = 0.0007;
    directionalLight.shadow.radius = 8;

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
