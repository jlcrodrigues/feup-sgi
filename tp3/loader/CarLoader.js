import { Car } from "../models/game/Car.js";
import * as THREE from 'three';
import { SceneLoader } from "./SceneLoader.js";

const carsPath = './assets/cars';

class CarLoader {
    static load(carData) {
        const car = new Car(carData.maxSpeed, carData.defaultAngularSpeed, carData.maxAcceleration);
        car.name = carData.name;
        car.description = carData.description;

        if (carData.path.endsWith('.xml')) {
            const scene = new THREE.Scene();
            new SceneLoader(scene).load(`${carsPath}/${carData.path}`);
            car.model = scene.children[0]
        }


        return car;
    }
}

export { CarLoader };