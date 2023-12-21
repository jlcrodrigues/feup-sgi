import * as THREE from "three";

class ObstacleBuilder {
    static build(obstacle) {
        const geometry = new THREE.BoxGeometry(2, 3, 2);
        let material;
        if (obstacle.type == "type1") {
            material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        }
        else {
            material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        }
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.x = obstacle.position.x;
        mesh.position.y = obstacle.position.y;
        mesh.position.z = obstacle.position.z;

        return mesh;
    }
}

export { ObstacleBuilder };