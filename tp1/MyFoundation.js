import * as THREE from "three";
import { MyPlane } from "./objects/MyPlane.js";
import { MyWindowWall } from "./objects/MyWindowWall.js";

/** Groups walls, roof and floor */
class MyFoundation {
  constructor() {
    this.group = new THREE.Group();
    this.buildFloor();
    this.buildRoof();
    this.buildWalls();
  }

  buildFloor() {
    const floor = new MyPlane(0, 0, 0, {
      color: "#919090",
      texturePath: "textures/floor.png",
    });
    floor.getMesh().rotation.x = -Math.PI / 2;
    this.group.add(floor.getMesh());
  }

  buildRoof() {
    const roof = new MyPlane(1.5, 10, 0, {
      color: "#919090",
      texturePath: "textures/wallYellow.png",
      width: 13,
    });
    roof.getMesh().rotateX(Math.PI / 2);
    this.group.add(roof.getMesh());
  }

  buildWalls() {
    const wallColor = "#ffebeb";
    const wall1 = new MyPlane(0, 5, -5, {
      color: wallColor,
      texturePath: "textures/wallYellow.png",
    }).getMesh();
    const wall2 = new MyPlane(0, 5, 5, {
      color: wallColor,
      width: 13,
    }).getMesh();
    wall2.rotation.y = Math.PI;
    wall2.position.x = 1.5;
    const wall3 = new MyPlane(-5, 5, 0, {
      color: "#dba79c",
      texturePath: "textures/brick.jpg",
    }).getMesh();
    wall3.rotation.y = Math.PI / 2;
    const wall4 = new MyWindowWall(5, 0, 0).getMesh();

    this.group.add(wall1, wall2, wall3, wall4);
  }

  getMesh() {
    return this.group;
  }
}

export { MyFoundation };
