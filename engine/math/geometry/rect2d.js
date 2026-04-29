class Rect2D extends Path2D {
  constructor(x, y, w, h) {
    super();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.rect(x, y, w, h);
  }

  _coordVec(u,v) {
    return new Vec2(this.x + u * this.w, this.y + v * this.h)
  }

  get topLeft(){ return this._coordVec(0, 0);}
  get top(){ return this._coordVec(0.5, 0);}
  get topRight(){ return this._coordVec(1, 0);}
  get left(){ return this._coordVec(0, 0.5);}
  get center(){ return this._coordVec(0.5, 0.5);}
  get right(){ return this._coordVec(1, 0.5);}
  get bottomLeft(){ return this._coordVec(0, 1);}
  get bottom(){ return this._coordVec(0.5, 1);}
  get bottomRight(){ return this._coordVec(1, 1);}
}
