import { SceneLoader } from "../loader/SceneLoader.js";
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
        this.camera.position.x = 70;
        this.camera.position.y = 60;

        new SceneLoader(this.scene).load('monza');
    }
}

export { GameView };