import { View } from "./View.js";
import {FontLoader} from "../loader/FontLoader.js"
import * as THREE from "three";

const dampingFactor = 0.1

class PauseView extends View {
    constructor(model) {
        super(model);
  
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        // Create a menu panel
        const menuPanelGeometry = new THREE.BoxGeometry(4, 2, 0.1);
        const menuPanelMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
        const menuPanel = new THREE.Mesh(menuPanelGeometry, menuPanelMaterial);

        const titleGroup = new THREE.Group();
        const titleArray = new FontLoader().getMeshArray("pause");
        titleGroup.add(...titleArray[0]);
        titleGroup.scale.set(2,2,2);
        titleGroup.position.set(-titleArray[1],2,0);
        menuPanel.add(titleGroup);

        const continueButton = new THREE.Group();
        const continueButtonArray = new FontLoader().getMeshArray("continue");
        continueButton.add(...continueButtonArray[0]);
        continueButton.scale.set(2,2,2);
        continueButton.position.set(this.model.continueButtonPosition[0]-continueButtonArray[1],this.model.continueButtonPosition[1],this.model.continueButtonPosition[2]);
        menuPanel.add(continueButton);

        // Create an menu button
        const menuButton = new THREE.Group();
        const menuButtonArray = new FontLoader().getMeshArray("menu");
        menuButton.add(...menuButtonArray[0])
        menuButton.scale.set(2,2,2);
        menuButton.position.set(this.model.menuButtonPosition[0]-menuButtonArray[1]*1.7,this.model.menuButtonPosition[1],this.model.menuButtonPosition[2]);
        menuPanel.add(menuButton);

        // Create selection border
        const borderGeometry = new THREE.BoxGeometry(1.25, 0.03, 0.1);
        const borderMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.border = new THREE.Mesh(borderGeometry, borderMaterial);  
        menuPanel.add(this.border);

        this.scene.add(menuPanel);

        // ambient light
        const ambientLight = new THREE.AmbientLight(0xeeeeee);
        this.scene.add(ambientLight);
    }

    step() {
        //update border position
        this.border.position.set(this.model.selectedPosition[0],this.model.selectedPosition[1]-0.15,0.01);

        const targetPosition = this.camera.position.clone();
        targetPosition.x = this.model.selectedPosition[0]/4;

        this.camera.position.lerp(targetPosition, dampingFactor);

        const lookAt = this.camera.position.clone();
        this.camera.lookAt(lookAt.x*1.5, 0, 0); 
    }
}

export { PauseView };