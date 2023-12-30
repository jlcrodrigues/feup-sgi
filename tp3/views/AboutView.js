import { FontLoader } from "../loader/FontLoader.js";
import { View } from "./View.js";
import * as THREE from "three";

const dampingFactor = 0.1

class AboutView extends View {
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

        const about = new THREE.Group();
        const aboutArray = new FontLoader().getMeshArray("KISSES FOR YOU \n esc to leave");
        about.add(...aboutArray[0]);
        about.scale.set(3,3,3);
        about.position.set(-4.5,0,0)
        this.scene.add(about);

        // ambient light
        const ambientLight = new THREE.AmbientLight(0xeeeeee);
        this.scene.add(ambientLight);
    }

    step() {
        const targetPosition = this.camera.position.clone();
        targetPosition.x = 0;

        this.camera.position.lerp(targetPosition, dampingFactor);

        const lookAt = this.camera.position.clone();
        this.camera.lookAt(lookAt.x*1.5, 0, 0); 
    }
}

export { AboutView };