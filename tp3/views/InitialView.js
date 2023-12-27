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

        // Create a Play button
        // const playButton = new THREE.Group()
        // const playButtonArray = new FontLoader().getMeshArray("FISH");
        // playButton.add(...playButtonArray)
        // playButton.scale.set(1.5,1.5,1.5);
        // playButton.position.set(...this.model.playButtonPosition);
        // menuPanel.add(playButton);

        const fontLoader = new FontLoader(() => {
            const playButton = new THREE.Group();
            const playButtonArray = fontLoader.getMeshArray("PLAY");
            playButton.add(...playButtonArray[0]);
            playButton.scale.set(2, 2, 2);
            playButton.position.set(this.model.playButtonPosition[0]-playButtonArray[1],this.model.playButtonPosition[1],this.model.playButtonPosition[2]);
            menuPanel.add(playButton);
        });

        // Create an Exit button
        const exitButton = new THREE.Group()
        const exitButtonArray = new FontLoader().getMeshArray("EXIT");
        exitButton.add(...exitButtonArray[0])
        exitButton.scale.set(2,2,2);
        exitButton.position.set(this.model.exitButtonPosition[0]-exitButtonArray[1]*1.5,this.model.exitButtonPosition[1],this.model.exitButtonPosition[2]);
        menuPanel.add(exitButton);

        // Create selection border
        const borderGeometry = new THREE.BoxGeometry(1.25, 0.75, 0.1);
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
        this.border.position.set(this.model.selected[0],this.model.selected[1],0.01);

        const targetPosition = this.camera.position.clone();
        targetPosition.x = this.model.selected[0]/2;

        this.camera.position.lerp(targetPosition, dampingFactor);

        const lookAt = this.camera.position.clone();
        this.camera.lookAt(lookAt.x*1.5, 0, 0); 
    }
}

export { InitialView };