// This needs to live here, not in the engine
const Spritesheeter = (src, cellSize) => {
  return (x, y) => {
    return {
      src: src,
      c: cellSize,
      x,
      y,
    };
  };
};

const stinkyCatSheet = Spritesheeter("./assets/img/stinky.png", 32);

const SPRITES = {
  ENGINE: {
    STINKY: {
      0: stinkyCatSheet(0, 0),
      1: stinkyCatSheet(1, 0),
      2: stinkyCatSheet(2, 0),
    },
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

const ASSETS = {
  sprites: SPRITES,
  fonts: FONTS,
};
