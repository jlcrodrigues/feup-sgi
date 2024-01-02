import * as THREE from "three";

const baseHeight = 3;
const screenHeight = 15;

class OutdoorDisplayBuilder {
  constructor(nodeData, material) {
    this.nodeData = nodeData;
    this.material =
      material ?? new THREE.MeshPhongMaterial({ color: 0x333333 });
  }

  build() {
    const group = new THREE.Group();
    group.add(this.buildBase());
    group.add(this.buildScreen());
    group.add(this.buildSections());
    group.name = "OutdoorDisplay";
    return group;
  }

  buildScreen() {
    const geometry = new THREE.BoxGeometry(6, screenHeight, 2);
    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(0, baseHeight + screenHeight / 2, 0);
    return mesh;
  }

  buildBase() {
    const geometry = new THREE.CylinderGeometry(1, 1, baseHeight, 32);
    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(0, baseHeight / 2, 0);
    return mesh;
  }

  buildSections() {
    const sections = new THREE.Group();
    // Game status (playing vs paused)
    const statusGeometry = new THREE.BoxGeometry(4, 1, 2);
    const statusMesh = new THREE.Mesh(statusGeometry, this.material);
    statusMesh.position.set(0, baseHeight + 2, 0.01);
    statusMesh.name = "status";
    sections.add(statusMesh);

    return sections;
  }

  buildModifierPanel() {
    const panel = new THREE.Group();

    // Background
    const bgGeometry = new THREE.BoxGeometry(1, 1, 2);
    const bgMesh = new THREE.Mesh(
      bgGeometry,
      new THREE.MeshPhongMaterial({ color: this.material.color * 0.8 })
    );
    panel.add(bgMesh)

    // Background
    const timeRemainingGeometry = new THREE.BoxGeometry(1, 1, 2);
    const timeRemainingMesh = new THREE.Mesh(
      timeRemainingGeometry, this.material
    );
    timeRemainingMesh.name = "timeRemaining"
    panel.add(timeRemainingMesh)

    panel.position.set(0, baseHeight + 4, 0.01);
    panel.add(statusMesh);
  }
}

export { OutdoorDisplayBuilder };
