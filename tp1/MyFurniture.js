import * as THREE from "three";
import { MyCake } from "./objects/MyCake.js";
import { MyPlate } from "./objects/MyPlate.js";
import { MyTable } from "./objects/MyTable.js";
import { MyFlowerVase } from "./objects/MyFlowerVase.js";
import { MyBeetle } from "./objects/MyBeetle.js";
import { MyCounter } from "./objects/MyCounter.js";
import { MyPictureFrame } from "./objects/MyPictureFrame.js";
import { MyRug } from "./objects/MyRug.js";
import { MySofa } from "./objects/MySofa.js";
import { MySpring } from "./objects/MySpring.js";
import { MyNewspaper } from "./objects/MyNewspaper.js";
import { MyCircularTable } from "./objects/MyCircularTable.js";
import { MyBench } from "./objects/MyBench.js";

class MyFurniture {
  constructor() {
    this.furniture = new THREE.Group();

    // Coffee table section
    const table = new MyTable(-1.5, 0, 2);
    this.furniture.add(table.getMesh());
    this.furniture.add(new MyPlate(0, table.getYTop() - 0.1, 3).getMesh());
    this.furniture.add(new MyCake(0, table.getYTop() + 0.05, 3).getMesh());
    const rug = new MyRug(0, 0, 2).getMesh();
    rug.rotation.y = Math.PI / 2;
    this.furniture.add(rug);
    this.furniture.add(new MySofa(0, 0, 0).getMesh());
    const smallSofa = new MySofa(3.5, 0, 3, 2, "#826563").getMesh();
    smallSofa.rotation.y = -Math.PI / 2;
    this.furniture.add(smallSofa);

    // Counter side table section
    this.furniture.add(new MyCircularTable(1.5, 0, -3.0).getMesh());
    this.furniture.add(new MyBench(2, 0, -2.0, 1.5).getMesh());
    this.furniture.add(
      new MyBench(2.5, 0, -3.5, 1.5).getMesh().rotateY(Math.PI / 5)
    );
    this.furniture.add(
      new MyBench(0.5, 0, -2.5, 1.5).getMesh().rotateY(-Math.PI / 10)
    );
    this.furniture.add(
      new MyBench(0.5, 0, -4, 1.5).getMesh().rotateY(-Math.PI / 15)
    );
    this.furniture.add(
      new MyRug(1.5, 0, -3.0, 2.5, 3)
        .getMesh()
        .rotateY(Math.PI / 2 - Math.PI / 10)
    );

    // Window side section
    this.furniture.add(new MyCircularTable(6.5, 0.5, 0.7, 1.5).getMesh());
    this.furniture.add(
      new MyFlowerVase(6.5, 2.1, 0.7).getMesh().rotateY(Math.PI)
    );
    this.furniture.add(
      new MyBench(6.7, 0.5, -0.7, 0.7).getMesh().rotateY(-Math.PI / 20)
    );
    this.furniture.add(
      new MyBench(6.8, 0.5, 1.5, 0.7).getMesh().rotateY(Math.PI / 10)
    );
    this.furniture.add(
      new MyBench(5.8, 0.5, 0.5, 0.7).getMesh().rotateY(Math.PI / 3)
    );
    this.furniture.add(new MyRug(6.5, 0.5, 1, 2, 3.5).getMesh().rotateY(-0.1));

    this.furniture.add(new MySpring(1, table.getYTop() + 0.05, 2.5).getMesh());

    this.furniture.add(new MyCounter(-2.5, 0, -5).getMesh());

    const newspaper = new MyNewspaper(-1.5, 0.89, -0.2).getMesh();
    newspaper.rotateY(Math.PI / 7);
    this.furniture.add(newspaper);

    const vase = new MyFlowerVase(-0.8, table.getYTop(), 2.8).getMesh();
    this.furniture.add(vase);

    this.createPictures();
  }

  createPictures() {
    const pictures = new THREE.Group();
    const pictureFrame1 = new MyPictureFrame(0, 4, 5, "textures/luis.jpg");
    pictureFrame1.getMesh().rotation.y = Math.PI / 2;
    const pictureFrame2 = new MyPictureFrame(2, 4.5, 5, "textures/martim.jpg");
    pictureFrame2.getMesh().rotation.y = Math.PI / 2;
    pictures.add(pictureFrame1.getMesh(), pictureFrame2.getMesh());

    const painting1 = new MyPictureFrame(
      -1,
      4.5,
      -5,
      "textures/painting1.jpg",
      "#bdd",
      1.3,
      2
    );
    pictures.add(painting1.getMesh().rotateY(-Math.PI / 2));
    const painting2 = new MyPictureFrame(
      3,
      4,
      -5,
      "textures/painting2.jpg",
      "#eee",
      2.5,
      2
    );
    pictures.add(painting2.getMesh().rotateY(-Math.PI / 2));

    let blackboard = new MyPictureFrame(
      -5,
      4.5,
      2,
      "textures/blackboard.png",
      "#ccc",
      3,
      2
    );
    pictures.add(blackboard.getMesh());

    const beetle = new MyBeetle(-5, 4, -3, 1.6, 1.1);
    pictures.add(beetle.getMesh());

    this.furniture.add(pictures);
  }

  getMesh() {
    return this.furniture;
  }
}

export { MyFurniture };
