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
        const tracksButtonGeometry = new THREE.BoxGeometry(...this.model.buttonSize);
        const tracksButtonMaterial = new THREE.MeshBasicMaterial({ color: 0x0fa0f0 });
        const tracksButton = new THREE.Mesh(tracksButtonGeometry, tracksButtonMaterial);
        tracksButton.position.set(...this.model.tracksButtonPosition);
        menuPanel.add(tracksButton);

        // Create Laps Button Selector and Selection Frame
        const lapsButtonGeometry = new THREE.BoxGeometry(...this.model.lapsButtonSize);
        const lapsButtonMaterial = new THREE.MeshBasicMaterial({ color: 0x666666 });
        this.lapsButton = new THREE.Mesh(lapsButtonGeometry,lapsButtonMaterial);
        menuPanel.add(this.lapsButton);

        const lapsFrameGeometry = new THREE.BoxGeometry(0.05,0.4,0.1);
        const lapsFrameMaterial = new THREE.MeshBasicMaterial({ color: 0x444444 });
        const lapsLineGeometry = new THREE.BoxGeometry(4,0.1,0.1);
        const lapsLineMaterial = new THREE.MeshBasicMaterial({ color: 0x444444 });
        
        const lapsFrame = new THREE.Group();
        const lapsLine = new THREE.Mesh(lapsLineGeometry,lapsLineMaterial);
        lapsLine.position.set(0,this.model.lapsButtonPosition[1],0.01);

        const lapsFrame1 = new THREE.Mesh(lapsFrameGeometry,lapsFrameMaterial)
        const lapsFrame2 = new THREE.Mesh(lapsFrameGeometry,lapsFrameMaterial)
        const lapsFrame3 = new THREE.Mesh(lapsFrameGeometry,lapsFrameMaterial)
        const lapsFrame4 = new THREE.Mesh(lapsFrameGeometry,lapsFrameMaterial)
        const lapsFrame5 = new THREE.Mesh(lapsFrameGeometry,lapsFrameMaterial)
        lapsFrame1.position.set(-2,this.model.lapsButtonPosition[1],0.01)
        lapsFrame2.position.set(-1,this.model.lapsButtonPosition[1],0.01)
        lapsFrame3.position.set(0,this.model.lapsButtonPosition[1],0.01)
        lapsFrame4.position.set(1,this.model.lapsButtonPosition[1],0.01)
        lapsFrame5.position.set(2,this.model.lapsButtonPosition[1],0.01)
        
        lapsFrame.add(lapsLine,lapsFrame1,lapsFrame2,lapsFrame3,lapsFrame4,lapsFrame5)
        menuPanel.add(lapsFrame)

        // Create selection border 
        menuPanel.add(this.model.border);

        this.scene.add(menuPanel);

        // ambient light
        const ambientLight = new THREE.AmbientLight(0xeeeeee);
        this.scene.add(ambientLight);
    }

    step() {
        //update border position
        this.model.border.position.set(this.model.selectedPosition[0],this.model.selectedPosition[1],this.model.selectedPosition[2]-0.01);
        this.lapsButton.position.set(this.model.lapsButtonPosition[0],this.model.lapsButtonPosition[1],this.model.lapsButtonPosition[2]);

        const targetPosition = this.camera.position.clone();
        targetPosition.x = this.model.selectedPosition[0]/2;
        targetPosition.y = this.model.selectedPosition[1]/4;

        this.camera.position.lerp(targetPosition, dampingFactor);

        const lookAt = this.camera.position.clone();
        this.camera.lookAt(lookAt.x*1.5, 0, 0);       

    }
}

export { RaceMenuView };