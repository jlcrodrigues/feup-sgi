import * as THREE from "three";

/**
 * Builds Three.js lights from parser data
 */
class MyLightBuilder {
  static build(nodeData) {
    let light;
    switch (nodeData.type) {
      case "pointlight":
        light = this.buildPointLight(nodeData);
        break;
      case "spotlight":
        light = this.buildSpotLight(nodeData);
        break;
      case "directionallight":
        light = this.buildDirectionalLight(nodeData);
        break;
      default:
        console.warn("Unknown light: " + nodeData.type);
        return;
    }

    // Set common attributes
    light.position.set(...nodeData.position);
    light.visible = nodeData.enabled ?? true;
    light.intensity = nodeData.intensity ?? 1.0;
    light.distance = nodeData.distance ?? 1000;
    light.decay = nodeData.decay ?? 2.0;
    light.castShadow = nodeData.castShadow ?? false;
    light.shadow.camera.far = nodeData.shadowfar ?? 500.0;
    // TODO: shadow map size should be vector
    light.shadow.mapSize = new THREE.Vector2(
      nodeData.shadowmapsize,
      nodeData.shadowmapsize
    );

    // Add spotlight target
    if (nodeData.type === "spotlight") {
      const group = new THREE.Group();
      group.add(light);
      group.add(light.target);
      return group;
    }
    return light;
  }

  static buildPointLight(nodeData) {
    const light = new THREE.PointLight(nodeData.color);
    return light;
  }

  static buildSpotLight(nodeData) {
    const light = new THREE.SpotLight(nodeData.color);
    const target = new THREE.Object3D();
    target.position.set(...nodeData.target);
    light.target = target;
    light.angle = nodeData.angle;
    light.penumbra = nodeData.penumbra ?? 1.0;
    return light;
  }

  static buildDirectionalLight(nodeData) {
    const light = new THREE.DirectionalLight(nodeData.color);
    light.shadow.camera.left = nodeData.shadowleft ?? -5;
    light.shadow.camera.right = nodeData.shadowright ?? 5;
    light.shadow.camera.bottom = nodeData.shadowbottom ?? -5;
    light.shadow.camera.top = nodeData.shadowtop ?? 5;
    return light;
  }
}

export { MyLightBuilder };
