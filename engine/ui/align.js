const ALIGN = {
  TopLeft: 0,
  Top: 1,
  TopRight: 2,
  Left: 3,
  Center: 4,
  Right: 5,
  BottomLeft: 6,
  Bottom: 7,
  BottomRight: 8,
};

const positionRect = (
  x,
  y,
  width,
  height,
  align = ALIGN.Center,
  offset = 0,
) => {
  const leftAlignment = align % 3;
  const topAlignment = Math.floor(align / 3);

  const offsetVec = new Vec2(1 - leftAlignment, 1 - topAlignment)
    .normalize()
    .scale(offset);

  const topLeftVec = new Vec2(-leftAlignment / 2, -topAlignment / 2)
    .scale(width, height)
    .add(new Vec2(x, y))
    .add(offsetVec);

  return new Rect2D(topLeftVec.x, topLeftVec.y, width, height);
};
