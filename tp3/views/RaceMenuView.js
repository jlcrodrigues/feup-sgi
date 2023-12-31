import { View } from "./View.js";
import {FontLoader} from "../loader/FontLoader.js"
import * as THREE from "three";

const dampingFactor = 0.1;

class RaceMenuView extends View {
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

        const menuPanelGroup = new THREE.Group();
        const contentsGroup = new THREE.Group();

        // Create a menu panel
        const menuPanelGeometry = new THREE.BoxGeometry(6, 5, 0.1);
        const menuPanelMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
        const menuPanel = new THREE.Mesh(menuPanelGeometry, menuPanelMaterial);
        menuPanel.position.set(0,-1,0);
        menuPanelGroup.add(menuPanel)

        // Create a Play button
        const garageButton = new THREE.Group()
        const garageButtonArray = new FontLoader().getMeshArray("GARAGE");
        garageButton.add(...garageButtonArray[0])
        garageButton.scale.set(2,2,1.5);
        garageButton.position.set(this.model.garageButtonPosition[0]-garageButtonArray[1]*1.1,this.model.garageButtonPosition[1],this.model.garageButtonPosition[2]);
        contentsGroup.add(garageButton);

        // Create an Exit button
        const tracksButton = new THREE.Group()
        const tracksButtonArray = new FontLoader().getMeshArray("TRACKS");
        tracksButton.add(...tracksButtonArray[0])
        tracksButton.scale.set(2,2,1.5);
        tracksButton.position.set(this.model.tracksButtonPosition[0]-tracksButtonArray[1]*2,this.model.tracksButtonPosition[1],this.model.tracksButtonPosition[2]);
        contentsGroup.add(tracksButton);

        const raceButton = new THREE.Group()
        const raceButtonArray = new FontLoader().getMeshArray("RACE");
        raceButton.add(...raceButtonArray[0])
        raceButton.scale.set(2,2,1.5);
        raceButton.position.set(this.model.raceButtonPosition[0]-raceButtonArray[1]*1.4,this.model.raceButtonPosition[1]+0.35,this.model.raceButtonPosition[2]);
        contentsGroup.add(raceButton);

        // Create Laps Button Selector and Selection Frame
        // Adapted to group to work for mouse picker
        this.lapsSelectorGroup = new THREE.Group()
        const lapsSelectorGeometry = new THREE.BoxGeometry(...this.model.lapsSelectorSize);
        const lapsSelectorMaterial = new THREE.MeshBasicMaterial({ color: 0x666666 });
        const lapsSelector = new THREE.Mesh(lapsSelectorGeometry,lapsSelectorMaterial);
        this.lapsSelectorGroup.add(lapsSelector);
        contentsGroup.add(this.lapsSelectorGroup);

        const lapsFrameGeometry = new THREE.BoxGeometry(0.05,0.4,0.1);
        const lapsFrameMaterial = new THREE.MeshBasicMaterial({ color: 0x444444 });
        const lapsLineGeometry = new THREE.BoxGeometry(4,0.1,0.1);
        const lapsLineMaterial = new THREE.MeshBasicMaterial({ color: 0x444444 });
        
        const lapsDetails = new THREE.Group();
        const lapsLine = new THREE.Mesh(lapsLineGeometry,lapsLineMaterial);
        lapsLine.position.set(0,this.model.lapsSelectorPosition[1],0.01);

        const lapsFrame1 = new THREE.Mesh(lapsFrameGeometry,lapsFrameMaterial)
        const lapsFrame2 = new THREE.Mesh(lapsFrameGeometry,lapsFrameMaterial)
        const lapsFrame3 = new THREE.Mesh(lapsFrameGeometry,lapsFrameMaterial)
        const lapsFrame4 = new THREE.Mesh(lapsFrameGeometry,lapsFrameMaterial)
        const lapsFrame5 = new THREE.Mesh(lapsFrameGeometry,lapsFrameMaterial)
        lapsFrame1.position.set(-2,this.model.lapsSelectorPosition[1],0.01)
        lapsFrame2.position.set(-1,this.model.lapsSelectorPosition[1],0.01)
        lapsFrame3.position.set(0,this.model.lapsSelectorPosition[1],0.01)
        lapsFrame4.position.set(1,this.model.lapsSelectorPosition[1],0.01)
        lapsFrame5.position.set(2,this.model.lapsSelectorPosition[1],0.01)
        lapsDetails.add(lapsLine,lapsFrame1,lapsFrame2,lapsFrame3,lapsFrame4,lapsFrame5)

        const lapsNumbers = new THREE.Group();
        const lapsNumber1 = new FontLoader().getMeshArray("1")[0][0];
        const lapsNumber2 = new FontLoader().getMeshArray("2")[0][0];
        const lapsNumber3 = new FontLoader().getMeshArray("3")[0][0];
        const lapsNumber4 = new FontLoader().getMeshArray("4")[0][0];
        const lapsNumber5 = new FontLoader().getMeshArray("5")[0][0];
        lapsNumbers.add(lapsNumber1,lapsNumber2,lapsNumber3,lapsNumber4,lapsNumber5)
        lapsNumbers.scale.set(2,2,1);
        lapsNumber1.position.set(-1,this.model.lapsSelectorPosition[1]/2-0.25,0.1)
        lapsNumber2.position.set(-0.5,this.model.lapsSelectorPosition[1]/2-0.25,0.1)
        lapsNumber3.position.set(0,this.model.lapsSelectorPosition[1]/2-0.25,0.1)
        lapsNumber4.position.set(0.5,this.model.lapsSelectorPosition[1]/2-0.25,0.1)
        lapsNumber5.position.set(1,this.model.lapsSelectorPosition[1]/2-0.25,0.1)
        lapsDetails.add(lapsNumbers);

        const lapsLabel = new THREE.Group()
        const lapsLabelArray = new FontLoader().getMeshArray("LAPS");
        lapsLabel.add(...lapsLabelArray[0])
        lapsLabel.scale.set(2,2,1.5);
        lapsLabel.position.set(this.model.lapsLabelPosition[0]-lapsLabelArray[1]*1.4,this.model.lapsLabelPosition[1],this.model.lapsLabelPosition[2]);
        lapsDetails.add(lapsLabel);
        contentsGroup.add(lapsDetails);

        // Create selection border 
        contentsGroup.add(this.model.border);

        menuPanelGroup.add(contentsGroup);
        menuPanelGroup.position.set(0,1,0);

        this.scene.add(menuPanelGroup);

        // ambient light
        const ambientLight = new THREE.AmbientLight(0xeeeeee);
        this.scene.add(ambientLight);
    }

    step() {
        //update border position
        this.model.border.position.set(this.model.selectedPosition[0],this.model.selectedPosition[1],this.model.selectedPosition[2]-0.01);
        this.lapsSelectorGroup.position.set(this.model.lapsSelectorPosition[0],this.model.lapsSelectorPosition[1],this.model.lapsSelectorPosition[2]);

        const targetPosition = this.camera.position.clone();
        targetPosition.x = this.model.selectedPosition[0]/4;
        targetPosition.y = this.model.selectedPosition[1]/6;

        this.camera.position.lerp(targetPosition, dampingFactor);

        const lookAt = this.camera.position.clone();
        this.camera.lookAt(lookAt.x*1.5, 0, 0);       

    }
}

export { RaceMenuView };