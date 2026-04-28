// This needs to live here, not in the engine
const Spritesheeter = (src, cellSize, rows, cols) => {
  const sheeter = (x, y) => {
    return {
      src: src,
      c: cellSize,
      x,
      y,
    };
  };

  return Array(rows)
    .fill(0)
    .map((_, row) =>
      Array(cols)
        .fill(0)
        .map((_, col) => sheeter(col, row)),
    );
};

const SPRITES = {
  ENGINE: {
    STINKY: Spritesheeter("./assets/img/stinky.png", 32, 1, 3)[0],
  },
  DUNGEON: Spritesheeter(
    "./assets/img/kenney_tiny-dungeon/tilemap_packed.png",
    16,
    11,
    12,
  ),
  TOWN: Spritesheeter(
    "./assets/img/kenney_tiny-town/tilemap_packed.png",
    16,
    11,
    12,
  ),
};

const FONTS = [
  {
    name: "Syne Mono",
    variants: [
      [400, "normal", "./assets/font/syne/SyneMono-Regular.ttf"],
      [500, "normal", "./assets/font/syne/SyneMono-Regular.ttf"],
      [400, "italic", "./assets/font/syne/SyneMono-Regular.ttf"],
    ],
  },
];

const ASSETS = {
  sprites: SPRITES,
  fonts: FONTS,
};
