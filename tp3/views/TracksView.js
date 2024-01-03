import * as THREE from "three";
import { View } from "./View.js";
import { TrackBuilder } from "./game/TrackBuilder.js";
import { Track } from "../models/game/Track.js";
import { FontLoader } from "../loader/FontLoader.js";
import { App } from "../App.js";

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
        this.camera.position.z = 5;

        const track1Tex = new THREE.TextureLoader().load( "image/tracks/monza.png" );
        const tracksPanelGeometry = new THREE.PlaneGeometry(4.5,3);
        const tracksPanelMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: track1Tex });
        this.track = new THREE.Mesh(tracksPanelGeometry,tracksPanelMaterial);
        this.track.rotation.set(0,-Math.PI/15,0);
        this.scene.add(this.track);
    }

    step(){
        const targetPosition = this.camera.position.clone();
        targetPosition.x = -3

        if (!App.controlsActive) {
            this.camera.position.lerp(targetPosition, dampingFactor);
            const lookAt = this.camera.position.clone();
            this.camera.lookAt(lookAt.x, 0, 0);
        }
    }
}

export {TracksView}