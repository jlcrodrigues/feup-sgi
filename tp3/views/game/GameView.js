import { SceneLoader } from "../../loader/SceneLoader.js";
import { View } from "../View.js";
import * as THREE from "three";
import { TrackBuilder } from "./TrackBuilder.js";

class GameView extends View {
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
        this.camera.position.x = -70;
        this.camera.position.y = 60;

        new SceneLoader(this.scene).load('monza');
        this.scene.add(new TrackBuilder().build(model.track));

        this.car = this.loadCar();
        this.scene.add(this.car);
    }

    step() {
        this.car.position.x = this.model.car.position.x;
        this.car.position.z = this.model.car.position.z;

        this.car.rotation.y = -this.model.car.rotation;
    }

    loadCar() {
        // TODO: load cars
        const car = new THREE.Group();
        const bodyGeometry = new THREE.BoxGeometry(4, 2, 2);
        const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
        car.add(bodyMesh);
        const wheelGeometry = new THREE.BoxGeometry(1, 1, 1);
        const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
        const wheelFLMesh = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheelFLMesh.position.set(-1.5, -0.5, 1);
        car.add(wheelFLMesh);
        const wheelFRMesh = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheelFRMesh.position.set(-1.5, -0.5, -1);
        car.add(wheelFRMesh);
        const wheelBLMesh = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheelBLMesh.position.set(1.5, -0.5, 1);
        car.add(wheelBLMesh);
        const wheelBRMesh = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheelBRMesh.position.set(1.5, -0.5, -1);
        car.add(wheelBRMesh);

        // something in the front
        const frontGeometry = new THREE.BoxGeometry(1, 1, 1);
        const frontMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
        const frontMesh = new THREE.Mesh(frontGeometry, frontMaterial);
        frontMesh.position.set(-2, 0.5, 0);
        car.add(frontMesh);
        
        car.translateY(1);
        return car;
    }
}

export { GameView };