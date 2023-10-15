import * as THREE from "three";
import { Plane } from "./Plane.js";

class MyWindowWall {
  constructor(x, y, z) {
    this.group = new THREE.Group();
    this.width = 3;
    this.windowHeight = 4;
    this.bottomHeight = 2;
    this.frameWidth = 7;

    this.buildBackground()
    this.buildWindowWall()
    this.buildDoorWall()
    this.buildFloor()

    this.group.position.set(x, y, z);
  }

  buildBackground() {
    const width = 20
    const height = 15
    const background = new Plane(this.width + 2, height / 2, 0, {
      color: "#ffebeb",
      texturePath: "textures/street.jpg",
      height: height,
      width: width,
      repeatTexture: false,
    }).getMesh();
    background.rotateY(-Math.PI / 2)
    this.group.add(background);
  }

  buildWindowWall() {
    let windowWallWidth = 7
    let bottom = new Plane(this.width, 1, this.width / 2, {
      color: "#694b36",
      texturePath: "textures/wood.jpg",
      width: windowWallWidth,
      height: 2,
    }).getMesh();
    bottom.rotateY(-Math.PI / 2)
    this.group.add(bottom);

    this.buildWindow()
    this.buildFrame()

    const y = this.bottomHeight + this.windowHeight
    const top = new Plane(this.width, y + (10 - y) / 2, this.width / 2, {
      color: "#ffebeb",
      texturePath: "textures/wallYellow.png",
      width: windowWallWidth,
      height: 10 - y,
    }).getMesh();
    top.rotateY(-Math.PI / 2)
    this.group.add(top);
  }

  buildWindow() {
    let height = this.windowHeight
    let width = this.frameWidth - 0.6

    const texture = new THREE.TextureLoader().load('textures/window.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    const material = new THREE.MeshPhongMaterial({
      color: "#e1ebe3",
      transparent: true,
      //opacity: 1,
      map: texture,
    });

    const window = new THREE.PlaneGeometry(width, height);
    const windowMesh = new THREE.Mesh(window, material);
    windowMesh.rotateY(-Math.PI / 2)
    windowMesh.position.set(this.width, height / 2 + this.bottomHeight, width / 4 - 0.1);
    this.group.add(windowMesh);
  }

  buildFrame() {
    const thickness = 0.3
    const height = this.windowHeight
    const frameWidth = this.frameWidth
    const texture = new THREE.TextureLoader().load('textures/wood.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    // green wooden window frame
    const material = new THREE.MeshPhongMaterial({
      color: "#3a6942",
      specular: "#000000",
      emissive: "#000000",
      shininess: 50,
      map: texture
    });

    let d = height + thickness
    const vertical = new THREE.BoxGeometry(thickness, d, thickness);
    const verticalMeshLeft = new THREE.Mesh(vertical, material);
    verticalMeshLeft.position.set(this.width, d / 2 + 2, -2 + thickness / 2);
    const verticalMeshRight = verticalMeshLeft.clone();
    verticalMeshRight.translateZ(frameWidth - thickness);
    this.group.add(verticalMeshLeft, verticalMeshRight);

    const horizontal = new THREE.BoxGeometry(thickness, thickness, frameWidth);
    const horizontalMeshTop = new THREE.Mesh(horizontal, material);
    horizontalMeshTop.position.set(this.width, height + thickness / 2 + 2, frameWidth / 2 - 2);
    const horizontalMeshBottom = horizontalMeshTop.clone();
    horizontalMeshBottom.translateY(-height);
    this.group.add(horizontalMeshTop, horizontalMeshBottom);
  }

  buildDoorWall() {
    let doorWallWidth = Math.sqrt(this.width ** 2 + this.width ** 2)
    let doorWall = new Plane(0, 5, -5, {
      color: "#ffebeb",
      texturePath: "textures/wallYellow.png",
      width: doorWallWidth,
    }).getMesh();
    doorWall.rotateY(-Math.PI / 4)
    doorWall.translateX(doorWallWidth / 2)
    this.group.add(doorWall);

    const wallHeight = 5
    let wallWidth = 2
    let wall = new Plane(0, wallHeight / 2, -5, {
      color: "#ffebeb",
      texturePath: "textures/door.jpeg",
      width: wallWidth,
      height: wallHeight,
      repeatTexture: false,
    }).getMesh();
    wall.translateX(-0.001)
    wall.rotateY(-Math.PI / 4)
    wall.translateX(wallWidth / 2)
    wall.translateX(wallWidth / 2)
    this.group.add(wall);
  }

  buildFloor() {
    const texture = new THREE.TextureLoader().load('textures/tiles.webp');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 5)
    let material = new THREE.MeshPhongMaterial({
      color: "#ddd",
      specular: "#000000",
      emissive: "#000000",
      shininess: 50,
      map: texture
    });

    let floorHeight = 0.5;
    const floor = new THREE.BoxGeometry(3, floorHeight, 10);
    let bottomMesh = new THREE.Mesh(floor, material);
    bottomMesh.position.set(3 / 2, floorHeight / 2, 0);
    this.group.add(bottomMesh);
  }

  getMesh() {
    return this.group;
  }
}

export { MyWindowWall };