const accelerationDelta = 0.001;
const dragFactor = 0.99;
const reverseFactor = 0.3;

/**
 * Defines a car and handles movement. <br>
 * 
 * A car moves in two dimensions:
 *  - Modular speed. This is the speed of the car in the direction of the car.
 * User input changes the acceleration, which in turn changes the speed over time.
 *  - 
 */
class Car {
  constructor(defaultMaxSpeed = 1.4, defaultAngularSpeed = 0.02, maxAcceleration = 0.02) {
    this.defaultMaxSpeed = defaultMaxSpeed;
    this.defaultAngularSpeed = defaultAngularSpeed;
    this.maxAcceleration = maxAcceleration;

    this.maxSpeed = this.defaultMaxSpeed;

    // Modular Velocity
    this.speed = 0;
    this.acceleration = 0;

    // Angular Velocity
    this.rotation = 0;
    this.angularSpeed = 0;

    this.position = { x: 0, y: 0, z: 0 };

    this.moving = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
  }

  move() {
    this.position.x += this.speed * Math.cos(this.rotation);
    this.position.z += this.speed * Math.sin(this.rotation);

    this.speed *= dragFactor;

    this.updateAcceleration();
    this.updateSpeed();
  }

  updateAcceleration() {
    // Modular Velocity
    if (this.moving.up) {
      if (this.acceleration < this.maxAcceleration) {
        this.acceleration += accelerationDelta;
      }
    } else if (this.moving.down) {
      if (this.speed > 0) {
        this.acceleration = -this.maxAcceleration * reverseFactor;
      } else {
        if (
          this.acceleration > -(this.maxAcceleration * reverseFactor)
        ) {
          this.acceleration -= accelerationDelta;
        }
      }
    } else {
      this.acceleration = 0;
    }

    // Angular Velocity
    if (!this.moving.left && !this.moving.right) {
        this.angularSpeed = 0;
    }
    else if (this.moving.left && !this.moving.right) {
        this.angularSpeed = -this.defaultAngularSpeed;
    }
    else if (this.moving.right && !this.moving.left) {
        this.angularSpeed = this.defaultAngularSpeed;
    }
  }

  updateSpeed() {
    // Modular Velocity
    if (this.speed < 0) {
      if (this.speed > -(this.maxSpeed * reverseFactor)) {
        this.speed += this.acceleration;
      }
    } else {
      if (this.speed < this.maxSpeed) {
        this.speed += this.acceleration;
      }
    }

    // Angular Velocity
    this.rotation += this.angularSpeed;
  }

  processInput(direction, accelerate) {
    this.moving[direction] = accelerate;
  }
}

export { Car };
