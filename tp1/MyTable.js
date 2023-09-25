import * as THREE from 'three';
import { MyTableLeg } from './MyTableLeg.js';

class MyTable {

    constructor(){
        this.group = new THREE.Group();

        this.tableMaterial1 = new THREE.MeshPhongMaterial({ color: "#4a4d2d", specular: "#000000", emissive: "#000000", shininess: 50 })
        this.tableMaterial2 = new THREE.MeshPhongMaterial({ color: "#ffe1c2", specular: "#eed0b1", emissive: "#000000", shininess: 500 })

        this.table = new THREE.BoxGeometry(3.5,0.2,2.5);
        this.tableTop = new THREE.BoxGeometry(3,0.1,2);

        this.tableMesh = new THREE.Mesh(this.table, this.tableMaterial1);
        this.tableTopMesh = new THREE.Mesh( this.tableTop, this.tableMaterial2 );
        this.tableTopMesh.position.y = 0.1;

        this.leg1 = new MyTableLeg().getMesh();
        this.leg1.position.x = 1.4;
        this.leg1.position.y = -0.74;
        this.leg1.position.z = 0.9;
        this.leg2 = new MyTableLeg().getMesh();
        this.leg2.position.x = 1.4;
        this.leg2.position.y = -0.74;
        this.leg2.position.z = -0.9;
        this.leg3 = new MyTableLeg().getMesh();
        this.leg3.position.x = -1.4;
        this.leg3.position.y = -0.74;
        this.leg3.position.z = 0.9;
        this.leg4 = new MyTableLeg().getMesh();
        this.leg4.position.x = -1.4;
        this.leg4.position.y = -0.74;
        this.leg4.position.z = -0.9;

        this.group.add(this.tableMesh);
        this.group.add(this.tableTopMesh);
        this.group.add(this.leg1);
        this.group.add(this.leg2);
        this.group.add(this.leg3);
        this.group.add(this.leg4);
    }

    getMesh(){return this.group}
}

export{ MyTable };