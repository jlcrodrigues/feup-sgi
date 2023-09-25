import * as THREE from 'three';

class MyPlane {

    constructor(){
        this.planeMaterial = new THREE.MeshPhongMaterial({ color: "#00ffff", specular: "#777777", emissive: "#000000", shininess: 30, side: THREE.DoubleSide });
        this.plane = new THREE.PlaneGeometry(10,10);
        this.planeMesh = new THREE.Mesh(this.plane,this.planeMaterial);
   
    }

    getMesh(){return this.planeMesh;}
}

export{ MyPlane };