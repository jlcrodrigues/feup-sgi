import * as THREE from "three";

const baseHeight = 3;
const screenHeight = 16;

class OutdoorDisplayBuilder {
  constructor(nodeData, material) {
    this.nodeData = nodeData;
    this.material =
      material ?? new THREE.MeshPhongMaterial({ color: 0x333333 });
    this.secondaryMaterial = new THREE.MeshPhongMaterial({
      color: 0x666666,
    });
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
    sections.add(this.buildGenericPlate(this.material, 2, "status"));

    // Modifier information
    sections.add(this.buildModifierPanel());

    // Time
    sections.add(this.buildGenericPlate(this.material, 9, "timeTitle"));
    sections.add(this.buildGenericPlate(this.material, 8, "time"));

    sections.add(this.buildSplitter(this.secondaryMaterial, 9.5));

    // Lap
    sections.add(this.buildGenericPlate(this.material, 11, "lapTitle"));
    sections.add(this.buildGenericPlate(this.material, 10, "lap"));

    // Speed
    sections.add(this.buildGenericPlate(this.material, 13.5, "speedTitle"));
    sections.add(this.buildGenericPlate(this.material, 12.5, "speed"));

    sections.add(this.buildSplitter(this.secondaryMaterial, 14.5));

    // Laps
    sections.add(this.buildGenericPlate(this.material, 15, "laps"));

    return sections;
  }

  /**
   * Build a generic plate. This is a box where the text will be displayed.
   * @param {*} material Material to use for the plate
   * @param {*} y Height displacement
   * @param {*} name Name to be used for text rendering id
   * @returns Object3D representing the plate
   */
  buildGenericPlate(material, y, name) {
    const geometry = new THREE.BoxGeometry(5, 1, 2);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, baseHeight + y, 0.01);
    mesh.name = name;
    return mesh;
  }

  buildSplitter(material, y) {
    const geometry = new THREE.BoxGeometry(5, 0.1, 2);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, baseHeight + y, 0.02);
    return mesh;
  }

  buildModifierPanel() {
    const panel = new THREE.Group();
    const panelMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });

    // Background
    const bgGeometry = new THREE.BoxGeometry(5, 4, 2);
    const bgMesh = new THREE.Mesh(bgGeometry, panelMaterial);
    panel.add(bgMesh);

    // Time remaining in modifier
    panel.add(this.buildGenericPlate(panelMaterial, -4.5, "timeRemaining"));

    // Modifier name
    panel.add(this.buildGenericPlate(panelMaterial, -3.5, "modifier"));

    // Max speed
    panel.add(this.buildGenericPlate(panelMaterial, -2, "maxSpeed"));

    panel.position.set(0, baseHeight + 5, 0.01);

    return panel;
  }
}

export { OutdoorDisplayBuilder };
