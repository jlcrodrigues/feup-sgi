import { FontLoader } from "../loader/FontLoader.js";
import { Fireworks } from "./Fireworks.js";
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
        this.camera.position.z = 2;

        this.fireworks = new Fireworks(this.scene);

        const luis = new THREE.Group(); 
        const luis1 = new THREE.Group();
        const luis1Array = new FontLoader().getMeshArray("Luis");
        const luis2 = new THREE.Group();
        const luis2Array = new FontLoader().getMeshArray("Rodrigues");
        luis1.add(...luis1Array[0]);
        luis2.add(...luis2Array[0]);
        luis2.position.set(0.2,-0.2,0)

        luis.rotation.set(0,Math.PI/8,0);
        luis.scale.set(5,5,0);
        luis.position.set(-8,1,0);
        luis.add(luis1,luis2);
        this.scene.add(luis);

        const martim = new THREE.Group(); 
        const martim1 = new THREE.Group();
        const martim1Array = new FontLoader().getMeshArray("Martim");
        const martim2 = new THREE.Group();
        const martim2Array = new FontLoader().getMeshArray("Henriques");
        martim1.add(...martim1Array[0]);
        martim2.add(...martim2Array[0]);
        martim2.position.set(0.2,-0.2,0)

        martim.rotation.set(0,Math.PI/8,0);
        martim.scale.set(5,5,0);
        martim.position.set(-8,-2,0);
        martim.add(martim1,martim2);
        this.scene.add(martim);

        const title = new THREE.Group(); 
        const title1 = new THREE.Group();
        const title1Array = new FontLoader().getMeshArray("FEUP");
        const title2 = new THREE.Group();
        const title2Array = new FontLoader().getMeshArray("Fury GP");
        title1.add(...title1Array[0]);
        title2.add(...title2Array[0]);
        title2.position.set(0.2,-0.2,0)

        title.rotation.set(0,-Math.PI/8,0);
        title.scale.set(6,6,0);
        title.position.set(1,3,0);
        title.add(title1,title2);
        this.scene.add(title);

        const logoTex = new THREE.TextureLoader().load("image/logo/logo.jpg");
        const logoGeometry = new THREE.PlaneGeometry(5.5,4);
        const logoMaterial = new THREE.MeshBasicMaterial({ color: 0xeeeeee, map: logoTex });
        const logo = new THREE.Mesh(logoGeometry,logoMaterial);
        logo.rotation.set(0,-Math.PI/8,0);
        logo.position.set(4,-1.5,0);
        this.scene.add(logo);

        // ambient light
        const ambientLight = new THREE.AmbientLight(0xeeeeee);
        this.scene.add(ambientLight);
    }

    step() {
        this.fireworks.step();
        if (this.fireworks.dest.length%5===0) {
            this.fireworks.launch(3, new THREE.Vector3(25,5,-70));
            this.fireworks.launch(3, new THREE.Vector3(85,5,-70));
        }

        const targetPosition = this.camera.position.clone();
        targetPosition.z = 6.5;

        this.camera.position.lerp(targetPosition, dampingFactor);

        const lookAt = this.camera.position.clone();
        this.camera.lookAt(lookAt.x, 0, 0); 
    }
}

export { AboutView };