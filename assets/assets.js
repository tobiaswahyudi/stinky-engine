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
  DESERT: {
    UI: Spritesheeter(
      "./assets/kenney_desert-shooter-pack_1.0/PNG/Interface/tilemap_packed.png",
      16,
      11,
      18,
    ),
  },
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

const SOUNDS = {
  SELECT: "./assets/kenney_desert-shooter-pack_1.0/sound/select-a.ogg",
  COIN: "./assets/kenney_desert-shooter-pack_1.0/sound/coin-a.ogg",
  MOVE: "./assets/kenney_desert-shooter-pack_1.0/sound/move-c.ogg",
  MENU_BGM: "./assets/music/skyetunes 1-23-2018 - 1.mp3",
};

const ASSETS = {
  sprites: SPRITES,
  fonts: FONTS,
  sounds: SOUNDS,
};
