import { View } from "./View.js";
import * as THREE from "three";

class GameView extends View {
    constructor() {
        super();
    
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        // add a simple cube
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);

        // ambient light
        const ambientLight = new THREE.AmbientLight(0x040404);
        this.scene.add(ambientLight);
    }
}

export { GameView };