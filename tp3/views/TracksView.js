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
        this.camera.position.z = 3;

        const monza = new THREE.Group(); 
        const title = new THREE.Group();
        const titleArray = new FontLoader().getMeshArray("MONZA");
        title.add(...titleArray[0])
        title.scale.set(4,4,0);
        
        const description1 = new THREE.Group();
        const descriptionArray = new FontLoader().getMeshArray("Iconic Italian circuit known for");
        description1.add(...descriptionArray[0]);
        description1.scale.set(2,2,0);
        description1.position.set(-1,-1,0)
        const description2 = new THREE.Group();
        const description2Array = new FontLoader().getMeshArray("blistering straights fast corners");
        description2.add(...description2Array[0]);
        description2.scale.set(2,2,0);
        description2.position.set(-1,-1.5,0)
        const description3 = new THREE.Group();
        const description3Array = new FontLoader().getMeshArray("and historic Formula 1 races.");
        description3.add(...description3Array[0]);
        description3.scale.set(2,2,0);
        description3.position.set(-1,-2,0)
        
        monza.rotation.set(0,Math.PI/15,0);
        monza.position.set(-6,1,0);
        monza.add(title,description1,description2,description3);
        this.scene.add(monza);

        const track1Tex = new THREE.TextureLoader().load( "image/tracks/monza.png" );
        const tracksPanelGeometry = new THREE.PlaneGeometry(4.5,3);
        const tracksPanelMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: track1Tex });
        const track = new THREE.Mesh(tracksPanelGeometry,tracksPanelMaterial);
        track.rotation.set(0,-Math.PI/15,0);
        track.position.set(4,0,0);
        this.scene.add(track);
    }

    step(){
        const targetPosition = this.camera.position.clone();
        targetPosition.z = 5.5

        if (!App.controlsActive) {
            this.camera.position.lerp(targetPosition, dampingFactor);
            const lookAt = this.camera.position.clone();
            this.camera.lookAt(lookAt.x, 0, 0);
        }
    }
}

export {TracksView}