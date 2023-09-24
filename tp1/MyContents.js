import * as THREE from 'three';
import { MyAxis } from './MyAxis.js';

/**
 *  This class contains the contents of out application
 */
class MyContents  {

    /**
       constructs the object
       @param {MyApp} app The application object
    */ 
    constructor(app) {
        this.app = app
        this.axis = null

        // box related attributes
        this.boxMesh = null
        this.boxMeshSize = 1.0
        this.boxEnabled = true
        this.lastBoxEnabled = null
        this.boxDisplacement = new THREE.Vector3(0,2,0)

        // plane related attributes
        this.diffusePlaneColor = "#00ffff"
        this.specularPlaneColor = "#777777"
        this.planeShininess = 30
        this.planeMaterial = new THREE.MeshPhongMaterial({ color: this.diffusePlaneColor, 
            specular: this.diffusePlaneColor, emissive: "#000000", shininess: this.planeShininess, side: THREE.DoubleSide })
    }
    
    /**
     * builds the box mesh with material assigned
     */
    buildBox() {    
        let boxMaterial = new THREE.MeshPhongMaterial({ color: "#ffff77", 
        specular: "#000000", emissive: "#000000", shininess: 90 })

        // Create a Cube Mesh with basic material
        let box = new THREE.BoxGeometry(  this.boxMeshSize,  this.boxMeshSize,  this.boxMeshSize );
        this.boxMesh = new THREE.Mesh( box, boxMaterial );
        this.boxMesh.rotation.x = -Math.PI / 2;
        this.boxMesh.position.y = this.boxDisplacement.y;
    }

    buildWalls(){
        // Create a Plane Mesh with basic material
        let plane = new THREE.PlaneGeometry( 10, 10 );
        let planeMesh1 = new THREE.Mesh( plane, this.planeMaterial );
        planeMesh1.rotation.x = -Math.PI / 2;
        let planeMesh2 = new THREE.Mesh( plane, this.planeMaterial );
        planeMesh2.position.y = 5;
        planeMesh2.position.z = -5;
        // let planeMesh3 = new THREE.Mesh( plane, this.planeMaterial );
        // planeMesh3.position.y = 5;
        // planeMesh3.position.z = 5;
        let planeMesh4 = new THREE.Mesh( plane, this.planeMaterial );
        planeMesh4.rotation.y = Math.PI/2;
        planeMesh4.position.x = -5;
        planeMesh4.position.y = 5;
        // let planeMesh5 = new THREE.Mesh( plane, this.planeMaterial );
        // planeMesh5.rotation.y = Math.PI/2;
        // planeMesh5.position.x = 5;
        // planeMesh5.position.y = 5;

        return [planeMesh1,planeMesh2,/*planeMesh3,*/planeMesh4,/*planeMesh5*/]
    }
    
    /**
     * builds the table mesh with material assigned
     */
    buildTable() {    
        let tableMaterial1 = new THREE.MeshPhongMaterial({ color: "#4a4d2d", 
        specular: "#000000", emissive: "#111111", shininess: 50 })
        let tableMaterial2 = new THREE.MeshPhongMaterial({ color: "#ffe1c2", 
        specular: "#eed0b1", emissive: "#000000", shininess: 500 })
        let tableMaterial3 = new THREE.MeshPhongMaterial({ color: "#d1ab69", 
        specular: "#000000", emissive: "#000000", shininess: 50 })

        let table = new THREE.BoxGeometry(5,0.5,3);
        let tableTop = new THREE.BoxGeometry(4.5,0.1,2.5);
        let tableLeg = new THREE.CylinderGeometry(0.2,0.2,2,32);

        let tableMesh = new THREE.Mesh( table, tableMaterial1 );
        tableMesh.position.z = 3;
        tableMesh.position.y = 2;
        let tableTopMesh = new THREE.Mesh( tableTop, tableMaterial2 );
        tableTopMesh.position.z = 3;
        tableTopMesh.position.y = 2.25;

        let tableLegMesh1 = new THREE.Mesh( tableLeg, tableMaterial3 ); 
        tableLegMesh1.position.z = 4;
        tableLegMesh1.position.y = 1;
        tableLegMesh1.position.x = -2;
        let tableLegMesh2 = new THREE.Mesh( tableLeg, tableMaterial3 ); 
        tableLegMesh2.position.z = 4;
        tableLegMesh2.position.y = 1;
        tableLegMesh2.position.x = 2; 
        let tableLegMesh3 = new THREE.Mesh( tableLeg, tableMaterial3 ); 
        tableLegMesh3.position.z = 2;
        tableLegMesh3.position.y = 1;
        tableLegMesh3.position.x = -2;
        let tableLegMesh4 = new THREE.Mesh( tableLeg, tableMaterial3 ); 
        tableLegMesh4.position.z = 2;
        tableLegMesh4.position.y = 1;
        tableLegMesh4.position.x = 2;      
        
        return [tableMesh,tableTopMesh,tableLegMesh1,tableLegMesh2,tableLegMesh3,tableLegMesh4]
    }

    /**
     * initializes the contents
     */
    init() {
       
        // create once 
        if (this.axis === null) {
            // create and attach the axis to the scene
            this.axis = new MyAxis(this)
            this.app.scene.add(this.axis)
        }

        // add a point light on top of the model
        const pointLight = new THREE.PointLight( 0xffffff, 500, 0 );
        pointLight.position.set( 0, 20, 0 );
        this.app.scene.add( pointLight );

        // add a point light helper for the previous point light
        const sphereSize = 0.5;
        const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
        this.app.scene.add( pointLightHelper );

        // add an ambient light
        const ambientLight = new THREE.AmbientLight( 0x555555 );
        this.app.scene.add( ambientLight );

        this.buildBox();     
        this.app.scene.add(...this.buildWalls());
        this.app.scene.add(...this.buildTable());
    }
    
    /**
     * updates the diffuse plane color and the material
     * @param {THREE.Color} value 
     */
    updateDiffusePlaneColor(value) {
        this.diffusePlaneColor = value
        this.planeMaterial.color.set(this.diffusePlaneColor)
    }
    /**
     * updates the specular plane color and the material
     * @param {THREE.Color} value 
     */
    updateSpecularPlaneColor(value) {
        this.specularPlaneColor = value
        this.planeMaterial.specular.set(this.specularPlaneColor)
    }
    /**
     * updates the plane shininess and the material
     * @param {number} value 
     */
    updatePlaneShininess(value) {
        this.planeShininess = value
        this.planeMaterial.shininess = this.planeShininess
    }
    
    /**
     * rebuilds the box mesh if required
     * this method is called from the gui interface
     */
    rebuildBox() {
        // remove boxMesh if exists
        if (this.boxMesh !== undefined && this.boxMesh !== null) {  
            this.app.scene.remove(this.boxMesh)
        }
        this.buildBox();
        this.lastBoxEnabled = null
    }
    
    /**
     * updates the box mesh if required
     * this method is called from the render method of the app
     * updates are trigered by boxEnabled property changes
     */
    updateBoxIfRequired() {
        if (this.boxEnabled !== this.lastBoxEnabled) {
            this.lastBoxEnabled = this.boxEnabled
            if (this.boxEnabled) {
                this.app.scene.add(this.boxMesh)
            }
            else {
                this.app.scene.remove(this.boxMesh)
            }
        }
    }

    /**
     * updates the contents
     * this method is called from the render method of the app
     * 
     */
    update() {
        // check if box mesh needs to be updated
        this.updateBoxIfRequired()

        // sets the box mesh position based on the displacement vector
        this.boxMesh.position.x = this.boxDisplacement.x
        this.boxMesh.position.y = this.boxDisplacement.y
        this.boxMesh.position.z = this.boxDisplacement.z
        
    }

}

export { MyContents };