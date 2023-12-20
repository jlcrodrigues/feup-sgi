import { View } from "./View.js";
import * as THREE from "three";

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
        const panelGeometry = new THREE.BoxGeometry(4, 2, 0.1);
        const panelMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
        this.panel = new THREE.Mesh(panelGeometry, panelMaterial);

        // Create a Play button
        const playButtonGeometry = new THREE.BoxGeometry(1.2, 0.7, 0.1);
        const playButtonTexture = new THREE.TextureLoader().load("assets/fonts/menu_font.png");
        // TODO: map coords u and v to obtain the word Play and Exit, (eventualmente manipulando o valor de offset)
        // Ponto 4.4 do enunciado
        // playButtonTexture.wrapS = THREE.RepeatWrapping;
        // playButtonTexture.wrapT = THREE.RepeatWrapping;
        // playButtonTexture.repeat.set( 0.15, 0.15 )
        // playButtonTexture.offset.set( 0.2, 0.2 );        
        const playButtonMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, map: playButtonTexture });
        const playButton = new THREE.Mesh(playButtonGeometry, playButtonMaterial);
        playButton.position.set(-1, 0, 0.05);
        this.panel.add(playButton);

        // Create an Exit button
        const exitButtonGeometry = new THREE.BoxGeometry(1.2, 0.7, 0.1);
        const exitButtonMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const exitButton = new THREE.Mesh(exitButtonGeometry, exitButtonMaterial);
        exitButton.position.set(1, 0, 0.05);
        this.panel.add(exitButton);

        const borderGeometry = new THREE.BoxGeometry(1.25, 0.75, 0.1);
        const borderMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        this.border = new THREE.Mesh(borderGeometry, borderMaterial);  
        this.panel.add(this.border);

        this.scene.add(this.panel);

        // ambient light
        const ambientLight = new THREE.AmbientLight(0xeeeeee);
        this.scene.add(ambientLight);
    }

    step() {

        switch (this.model.action['left']){
            case true: {
                this.border.position.set(-1, 0, 0.01);
                break
            }
            case false: {
                this.border.position.set(1, 0, 0.01);
                break
            }
        }
        this.panel.add(this.border);
        this.scene.add(this.panel);
    }
}

export { InitialView };