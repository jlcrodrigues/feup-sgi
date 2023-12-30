import * as THREE from "three";

class MousePicker{
    constructor(objects,camera){
        this.camera = camera;
        this.objects = objects;
        console.log(objects)
        
        this.pickedObject = null;

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        document.addEventListener('mousemove', (event) => {
            // Calculate mouse coordinates in normalized device coordinates
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        document.addEventListener("mousedown", (event) => {
            if(this.pickedObject){
                this.selectedObject = this.pickedObject.parent;
            }
        })

        document.addEventListener("mouseup", (event) => {
            this.selectedObject = null;
        })
    }

    pickObject() {
        // Update the picking ray with the camera and mouse position
        this.raycaster.setFromCamera(this.mouse, this.camera);
    
        // Perform the raycast
        const intersects = this.raycaster.intersectObjects(this.objects, true);

        // Check if there are intersections
        if (intersects.length > 0) {
            // Access the first intersected object
            this.pickedObject = intersects[0].object.parent;
        }
        else
            this.pickedObject = null;
    }

    step() {
        this.pickObject();
    }
    
}

export { MousePicker }