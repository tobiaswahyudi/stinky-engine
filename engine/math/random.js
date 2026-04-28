/*********************
 * Random utils
 * No dependencies
 */
function random32Bit() {
  // Crude but yknow what its fine.
  return Math.floor(Math.random() * 0xffffffff);
}

class RandomStream {
  constructor(seed) {
    this.seed = seed;
  }

  random() {
    // Mulberry32 PRNG
    var t = (this.seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  choice(choices) {
    return choices[Math.floor(this.random() * choices.length)];
  }

  range(min, max) {
    return min + this.random() * (max - min);
  }

  sign(n = 1) {
    return this.random() < 0.5 ? n : -n;
  }
}

const randpm = (v = 1) => {
  return (Math.random() * 2 - 1) * v;
};
