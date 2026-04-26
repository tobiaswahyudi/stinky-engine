class Vec2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `[${this.x},${this.y}]`;
  }

  clone() {
    return new Vec2(this.x, this.y);
  }

  add(other) {
    return new Vec2(this.x + other.x, this.y + other.y);
  }

  scale(factor, factorY) {
    const fy = factorY || factor;
    return new Vec2(this.x * factor, this.y * fy);
  }

  negate() {
    return this.scale(-1);
  }

  normalize() {
    const len = Math.hypot(this.x, this.y);
    this.x /= len;
    this.y /= len;
    return this;
  }

  rotDeg(deg) {
    const dr = (deg / 180) * Math.PI;
    return new Vec2(
      this.x * Math.sin(dr) + this.y * Math.cos(dr),
      this.x * Math.cos(dr) - this.y * Math.sin(dr),
    );
  }

  setZero() {
    this.x = 0;
    this.y = 0;
    return this;
  }

  // Randomize in (-1, 1)
  setRandomize() {
    this.x = Math.random() * 2 - 1;
    this.y = Math.random() * 2 - 1;
    return this;
  }
}
