import * as THREE from "three";
import { FontLoader } from "../../loader/FontLoader.js";

class OutdoorDisplaysView {
  constructor(scene) {
    this.scene = scene;

    this.text = new Map();
  }

  step() {
    if (!this.outdoorDisplays) {
      this.outdoorDisplays = [];
      this.scene.traverse((object) => {
        if (object.name == "OutdoorDisplay") {
          this.outdoorDisplays.push(object);
        }
      });
    }

    this.outdoorDisplays.forEach((display) => {
        this.text.forEach((text, name) => {
            this.renderNode(display, name, text);
        });
    });
    this.outdoorDisplays = [];
  }

  setText(node, text) {
    this.text.set(node, text);
  }

  renderNode(parent, name, text) {
    const dZ = 0.52;
    const dScale = 5;

    const node = parent.getObjectByName(name);
    const nodeGroup = new THREE.Group();
    const nodeText = new FontLoader().getMeshArray(text);
    nodeGroup.add(...nodeText[0]);
    nodeGroup.scale.set(dScale, dScale, dScale);
    console.log(nodeText[1]);
    nodeGroup.position.set((-nodeText[1] * dScale * 1.7) / 2, 0, -1.48);
    node.add(nodeGroup);
  }
}

export { OutdoorDisplaysView };
