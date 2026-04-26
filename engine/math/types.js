const THUNK = () => {};

const Direction = {
  UP: "u",
  DOWN: "d",
  LEFT: "l",
  RIGHT: "r",
  SLEEP: "s",
};

const oppositeDirection = (direction) => {
  switch (direction) {
    case Direction.UP:
      return Direction.DOWN;
    case Direction.DOWN:
      return Direction.UP;
    case Direction.LEFT:
      return Direction.RIGHT;
    case Direction.RIGHT:
      return Direction.LEFT;
  }
  return direction;
};

const isOutOfBounds = (size, x, y) => {
  return x < 0 || x >= size || y < 0 || y >= size;
};
