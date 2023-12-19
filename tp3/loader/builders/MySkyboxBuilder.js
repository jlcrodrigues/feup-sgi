import * as THREE from "three";

/**
 * Builds a Skybox from parser data
 */
class MySkyboxBuilder {
  static build(nodeData) {
    const materials = this.getMaterials(nodeData);
    const geometry = new THREE.BoxGeometry(
      ...nodeData.size,
      1,
      1,
      1,
    );
    geometry.translate(...nodeData.center);

    return new THREE.Mesh(geometry, materials);
  }

  /**
   * Gets the materials for the skybox
   * @param {*} nodeData Skybox parser data
   * @returns List of materials for all 6 sides of the cube
   */
  static getMaterials(nodeData) {
    const directions = ["front", "back", "up", "down", "right", "left"];

    return directions.map((direction) => {
      const texture = new THREE.TextureLoader().load(nodeData[direction]);
      return new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.BackSide,
        emissive: nodeData.emissive,
        emissiveIntensity: nodeData.intensity
      });
    });
  }
}

export { MySkyboxBuilder };