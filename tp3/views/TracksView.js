import * as THREE from "three";
import { SceneLoader } from "../loader/SceneLoader.js";
import { View } from "./View.js";
import { TrackBuilder } from "./game/TrackBuilder.js";
import { Track } from "../models/game/Track.js";

const dampingFactor = 0.1;

class TracksView extends View{
    constructor(model) {
        super(model);
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 0;
        this.camera.position.y = 50;

        // Load the track scene
        new SceneLoader(this.scene).load("assets/scenes/monza/scene.xml");
        // Load the track
        this.scene.add(new TrackBuilder().build(new Track("monza")));
    }

    step(){
        const targetPosition = this.camera.position.clone();
        targetPosition.y = Math.min(400, targetPosition.y + 50)
        targetPosition.z = Math.min(0, targetPosition.z + 50)

        this.camera.position.lerp(targetPosition, dampingFactor);

        this.camera.lookAt(0, 0, 230);
    }
}

export {TracksView}