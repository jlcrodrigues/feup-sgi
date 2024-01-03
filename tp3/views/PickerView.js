import { View } from "./View.js";
import { FontLoader } from "../loader/FontLoader.js";
import * as THREE from "three";
import { TrackBuilder } from "./game/TrackBuilder.js";

const dampingFactor = 0.1;

class PickerView extends View {
  constructor(model) {
    super(model);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.scene.background = new THREE.Color(0x222222);
    this.camera.position.z = 6;

    // Create buttons for the modifers
    for (let i = 0; i < this.model.modifiers.length; i++) {
      const modifierButton = new THREE.Group();
      const modifierButtonArray = new FontLoader().getMeshArray(
        this.model.modifiers[i]
      );
      modifierButton.add(...modifierButtonArray[0]);
      modifierButton.scale.set(2, 2, 2);
      modifierButton.position.set(-modifierButtonArray[1] + i * 2 - 4.5, 2, 0);
      modifierButton.name = this.model.modifiers[i];
      this.scene.add(modifierButton);
    }

    /*
        const menuPanelGeometry = new THREE.BoxGeometry(4, 2, 0.1);
        const menuPanelMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
        const menuPanel = new THREE.Mesh(menuPanelGeometry, menuPanelMaterial);
        */
    const menuPanel = new THREE.Group();

    const titleGroup = new THREE.Group();
    const titleArray = new FontLoader().getMeshArray("modifier picker");
    titleGroup.add(...titleArray[0]);
    titleGroup.scale.set(2, 2, 2);
    titleGroup.position.set(-titleArray[1] * 1.6, 3, 0);
    menuPanel.add(titleGroup);

    const continueButton = new THREE.Group();
    continueButton.name = "continue";
    const continueButtonArray = new FontLoader().getMeshArray("continue");
    continueButton.add(...continueButtonArray[0]);
    continueButton.scale.set(2, 2, 2);
    continueButton.position.set(-continueButtonArray[1], -3, 0);
    menuPanel.add(continueButton);

    // Create selection border
    const borderGeometry = new THREE.BoxGeometry(1.25, 0.03, 0.1);
    const borderMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.border = new THREE.Mesh(borderGeometry, borderMaterial);
    menuPanel.add(this.border);

    const trackButton = new THREE.SphereGeometry(0.1, 32, 32);
    this.trackButton = new THREE.Mesh(trackButton, borderMaterial);
    this.trackButton.position.set(100, 0, 0);
    menuPanel.add(this.trackButton);

    this.track = new TrackBuilder().build(
      this.model.gameState.controller.model.track,
      true
    );
    this.track.scale.set(0.007, 0.007, 0.007);
    this.track.rotation.x = -Math.PI / 2;
    this.track.rotation.z = Math.PI;
    this.track.position.y = -2.0;
    this.track.position.x = 0.5;
    this.track.name = "track";
    menuPanel.add(this.track);

    this.scene.add(menuPanel);

    // ambient light
    const ambientLight = new THREE.AmbientLight(0xeeeeee);
    this.scene.add(ambientLight);
  }

  step() {
    //update border position
    this.border.position.set(this.model.selectedModifier * 2.6 - 5.4, 2, 0.1);

    if (this.model.coords)
      this.trackButton.position.set(
        0.6 + this.model.coords[0] * 7.7,
        -0.24 + this.model.coords[1] * 3.8,
        0.1
      );

    const targetPosition = this.camera.position.clone();
    //targetPosition.x = this.model.selectedPosition[0]/4;

    //this.camera.position.lerp(targetPosition, dampingFactor);

    //const lookAt = this.camera.position.clone();
    //this.camera.lookAt(lookAt.x*1.5, 0, 0);
  }
}

export { PickerView };
