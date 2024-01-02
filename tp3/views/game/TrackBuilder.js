import { Object3D } from "three";
import * as THREE from "three";

class TrackBuilder {
  build(track) {
    //Curve related attributes
    this.track = track;
    this.segments = 1000;
    this.width = track.width;
    this.textureRepeat = 1;
    this.showLine = false;
    this.closedCurve = false;
    this.debug = false;

    this.points = [];
    for (let i = 0; i < track.path.length; i++) {
      this.points.push(new THREE.Vector3(...track.path[i]));
    }
    this.path = new THREE.CatmullRomCurve3(this.points);

    this.buildCurve();

    return this.curve;
  }

  /**
   * Creates the necessary elements for the curve
   */
  buildCurve() {
    this.createCurveMaterialsTextures();
    this.createCurveObjects();
  }

  /**
   * Create materials for the curve elements: the mesh, the line and the wireframe
   */
  createCurveMaterialsTextures() {
    const texture = new THREE.TextureLoader().load("assets/scenes/monza/textures/road.png");
    this.material = new THREE.MeshBasicMaterial({
      color: 0x444444,
      map: texture,
    });
    /* TODO: add texture
    */
    this.material.map.repeat.set(20, 1.5);
    this.material.map.wrapS = THREE.RepeatWrapping;
    this.material.map.wrapT = THREE.RepeatWrapping;

    this.lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
  }

  /**
   * Creates the mesh, the line and the wireframe used to visualize the curve
   */
  createCurveObjects() {
    let geometry = new THREE.TubeGeometry(
      this.path,
      this.segments,
      this.width,
      8,
      this.closedCurve
    );
    this.mesh = new THREE.Mesh(geometry, this.material);
    //this.curve.rotateZ(Math.PI);
    this.mesh.scale.set(1, 0.001, 1);
    this.mesh.translateY(0.01);

    this.curve = new THREE.Group();
    this.curve.add(this.mesh);

    if (this.debug) {
      let points = this.path.getPoints(this.segments);
      let bGeometry = new THREE.BufferGeometry().setFromPoints(points);

      this.line = new THREE.Line(bGeometry, this.lineMaterial);
      this.curve.add(this.line);

      // add a sphere to each point
      let sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
      let sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
      this.points.forEach((point) => {
        let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(point.x, 2, point.z);
        this.curve.add(sphere);
      });

      for (let i = 0; i < this.track.route.points.length; i++) {
        let sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
        let sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });
        let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(
          this.track.route.points[i][0],
          2,
          this.track.route.points[i][2]
        );
        this.curve.add(sphere);
      }
    }
  }
}

export { TrackBuilder };
