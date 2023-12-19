import * as THREE from "three";

class MyCamerasBuilder {
  static build(data) {
    let cameras = [];
    for (let key in data.cameras) {
      let cameraData = data.cameras[key];
      let camera = this.buildCamera(cameraData);
      cameras[key] = camera
    }
    return cameras;
  }

  static buildCamera(cameraData) {
    let camera;
    switch (cameraData.type) {
      case "perspective":
        camera = new THREE.PerspectiveCamera(cameraData.angle);
        break;
      case "orthogonal":
        camera = new THREE.OrthographicCamera(
          cameraData.left,
          cameraData.right,
          cameraData.top,
          cameraData.bottom
        );
        break;
      default:
        console.warn("Unknown camera type: " + cameraData.type);
        camera = new THREE.PerspectiveCamera();
        break;
    }
    camera.near = cameraData.near;
    camera.far = cameraData.far;
    camera.position.set(...cameraData.location);
    camera.target = cameraData.target;
    return camera;
  }
}

export { MyCamerasBuilder };
