import { View } from "./View.js";
import * as THREE from "three";

const dampingFactor = 0.1;

class RaceMenuView extends View {
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
        const menuPanelGeometry = new THREE.BoxGeometry(6, 4, 0.1);
        const menuPanelMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
        const menuPanel = new THREE.Mesh(menuPanelGeometry, menuPanelMaterial);

        // Create a Play button
        const garageButtonGeometry = new THREE.BoxGeometry(...this.model.buttonSize);
        const garageButtonMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const garageButton = new THREE.Mesh(garageButtonGeometry, garageButtonMaterial);
        garageButton.position.set(...this.model.garageButtonPosition);
        menuPanel.add(garageButton);

        // Create an Exit button
        const trackButtonGeometry = new THREE.BoxGeometry(...this.model.buttonSize);
        const trackButtonMaterial = new THREE.MeshBasicMaterial({ color: 0x0fa0f0 });
        const trackButton = new THREE.Mesh(trackButtonGeometry, trackButtonMaterial);
        trackButton.position.set(...this.model.trackButtonPosition);
        menuPanel.add(trackButton);

        // Create Laps Button Selector
        const lapsButtonGeometry = new THREE.BoxGeometry(...this.model.lapsButtonSize);
        const lapsButtonMaterial = new THREE.MeshBasicMaterial({ color: 0x666666 });
        this.lapsButton = new THREE.Mesh(lapsButtonGeometry,lapsButtonMaterial);
        menuPanel.add(this.lapsButton);

        // Create selection border 
        menuPanel.add(this.model.border);

        this.scene.add(menuPanel);

        // ambient light
        const ambientLight = new THREE.AmbientLight(0xeeeeee);
        this.scene.add(ambientLight);
    }

    step() {
        //update border position
        this.model.border.position.set(this.model.selectedPosition[0],this.model.selectedPosition[1],0.01);
        this.lapsButton.position.set(this.model.lapsButtonPosition[0],this.model.lapsButtonPosition[1],0.01);

        const targetPosition = this.camera.position.clone();
        targetPosition.x = this.model.selectedPosition[0]/2;

        this.camera.position.lerp(targetPosition, dampingFactor);

        const lookAt = this.camera.position.clone();
        this.camera.lookAt(lookAt.x*1.5, 0, 0);       

    }
}

export { RaceMenuView };