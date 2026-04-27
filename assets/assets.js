const SPRITES = {
  ENGINE: {
    STINKY: {
      1: {
        src: "./assets/img/stinky.png",
        c: 32,
        x: 0,
        y: 0,
      },
      2: {
        src: "./assets/img/stinky.png",
        c: 32,
        x: 1,
        y: 0,
      },
      3: {
        src: "./assets/img/stinky.png",
        c: 32,
        x: 2,
        y: 0,
      },
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
