import * as THREE from 'three';

class MyTableLeg {

    constructor(){
        this.legMaterial = new THREE.MeshPhongMaterial({ color: "#d1ab69", specular: "#000000", emissive: "#000000", shininess: 50 })
        this.tableLeg = new THREE.CylinderGeometry(0.15,0.15,1.5,32);
        this.legMesh = new THREE.Mesh(this.tableLeg,this.legMaterial);
    }

    getMesh(){return this.legMesh;}
}

export{ MyTableLeg };