import * as THREE from "three";
import { FontLoader } from "../../loader/FontLoader.js";

class OutdoorDisplaysView {
  constructor(scene) {
    this.scene = scene;

    this.text = new Map();

    this.lastUpdate = Date.now();
    this.updateRate = 100;

    this.fontLoader = new FontLoader();
  }

  step() {
    if (Date.now() - this.lastUpdate < this.updateRate) {
      return;
    }
    this.lastUpdate = Date.now();

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
  }

  setText(node, text) {
    this.text.set(node, text);
  }

  renderNode(parent, name, text) {
    if (text == "") return;
    const dScale = 5;

    const node = parent.getObjectByName(name);
    const nodeGroup = new THREE.Group();
    const nodeText = this.fontLoader.getMeshArray(text);
    nodeGroup.add(...nodeText[0]);
    nodeGroup.scale.set(dScale, dScale, dScale);
    nodeGroup.position.set((-nodeText[1] * dScale * 1.7) / 2, 0, -1.48);
    nodeGroup.name = "text";
    node.children.forEach((child) => {
      if (child.name == "text") {
        node.remove(child);
      }
    });
    node.add(nodeGroup);
  }
}

export { OutdoorDisplaysView };
