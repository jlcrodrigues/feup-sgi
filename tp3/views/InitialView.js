import { View } from "./View.js";
import {FontLoader} from "../loader/FontLoader.js"
import * as THREE from "three";

const dampingFactor = 0.1

class InitialView extends View {
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

        const playButton = new THREE.Group();
        const playButtonArray = new FontLoader().getMeshArray("PLAY");
        playButton.add(...playButtonArray[0]);
        playButton.scale.set(2,2,2);
        playButton.position.set(this.model.playButtonPosition[0]-playButtonArray[1],this.model.playButtonPosition[1],this.model.playButtonPosition[2]);
        menuPanel.add(playButton);

        // Create an about button
        const aboutButton = new THREE.Group();
        const aboutButtonArray = new FontLoader().getMeshArray("ABOUT");
        aboutButton.add(...aboutButtonArray[0])
        aboutButton.scale.set(2,2,2);
        aboutButton.position.set(this.model.aboutButtonPosition[0]-aboutButtonArray[1]*1.7,this.model.aboutButtonPosition[1],this.model.aboutButtonPosition[2]);
        menuPanel.add(aboutButton);

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

export { InitialView };