export default class Vector {
  x: number;
  y: number;
  z: number;

  constructor(x?: number, y?: number, z?: number) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  add(v: Vector) {
    return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  subtract(v: Vector) {
    return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  multiply(v: number | Vector) {
    if (v instanceof Vector) {
      return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
    }
    return new Vector(this.x * v, this.y * v, this.z * v);
  }

  multiplyX(v: number) {
    return new Vector(this.x * v, this.y, this.z);
  }

  multiplyY(v: number) {
    return new Vector(this.x, this.y * v, this.z);
  }

  multiplyZ(v: number) {
    return new Vector(this.x, this.y, this.z * v);
  }

  divide(v: number | Vector) {
    if (v instanceof Vector) {
      return new Vector(this.x / v.x, this.y / v.y, this.z / v.z);
    }
    return new Vector(this.x / v, this.y / v, this.z / v);
  }

  equals(v: Vector) {
    return this.x === v.x && this.y === v.y && this.z === v.z;
  }

  dot(v: Vector) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  magnitude() {
    return Math.sqrt(this.dot(this));
  }

  unit() {
    return this.divide(this.magnitude());
  }

  clone() {
    return new Vector(this.x, this.y, this.z);
  }

  init(x?: number, y?: number, z?: number) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }
}
