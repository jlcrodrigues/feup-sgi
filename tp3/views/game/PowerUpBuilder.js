import * as THREE from "three";

class PowerUpBuilder {
    static build(powerUp) {
        const geometry = new THREE.BoxGeometry(2, 3, 2);
        let material;
        if (powerUp.type == "type1") {
            material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
        }
        else {
            material = new THREE.MeshStandardMaterial({ color: 0xff0f00 });
        }
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.x = powerUp.position.x;
        mesh.position.y = powerUp.position.y;
        mesh.position.z = powerUp.position.z;

        return mesh;
    }
}

export { PowerUpBuilder };