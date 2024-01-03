import * as THREE from "three";
import { SceneLoader } from "../../loader/SceneLoader.js";
import { ShaderLoader } from "../../loader/ShaderLoader.js";

const modifiersPath = "./assets/modifiers";

class ModifierView {
  static build(modifier) {
    const scene = new THREE.Scene();
    new SceneLoader(scene).load(`${modifiersPath}/${modifier.type}/${modifier.type}.xml`);

    const mesh = scene.children[0];

    // add pulsatory shader
    const shaderLoader = new ShaderLoader(
      "shaders/pulsatory.vert",
      "shaders/pulsatory.frag",
      {

      time : { type: "float", value: Date.now() / 1000 },
      }
    )
    const material = shaderLoader.buildShader();

    setTimeout(() => {
      mesh.traverse((mesh) => {
        mesh.material = material;
      });
    }, 3000);
    mesh.shader = shaderLoader;

    console.log("in here",modifier.position.x)
    mesh.position.x = modifier.position.x;
    mesh.position.y = modifier.position.y;
    mesh.position.z = modifier.position.z;

    return mesh;
  }
}

export { ModifierView };
