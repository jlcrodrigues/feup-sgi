import * as THREE from "three";
import { SceneLoader } from "../../loader/SceneLoader.js";

const modifiersPath = "./assets/modifiers";

class ModifierView {
  static build(modifier) {
    const scene = new THREE.Scene();
    new SceneLoader(scene).load(`${modifiersPath}/${modifier.type}/${modifier.type}.xml`);
    const mesh = scene.children[0];

    mesh.position.x = modifier.position.x;
    mesh.position.y = modifier.position.y;
    mesh.position.z = modifier.position.z;

    return mesh;
  }
}

export { ModifierView };
