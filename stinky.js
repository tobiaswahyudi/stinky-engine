var ENGINE_MODULES = [
  "engine/assets/loader.js",
  "engine/math/types.js",
  "engine/render/canvas.js",
  "engine/audio/webaudio.js",
  "engine/util/constants.js",
  "engine/math/random.js",
  "engine/math/vec2.js",
  "engine/math/geometry/rect2d.js",
  "engine/state/gameState.js",
  "engine/util/flatten.js",
  "engine/ui/slicing.js",
];

const DEFAULT_CONFIG = {
  splash: {
    duration: 1500
  }
}

// To start, call MakeGameStinky.
function MakeGameStinky(config = {}, modules = [], initializer = () => {}) {
  const loadingText = document.createElement("span");
  loadingText.style.color = "white";
  const startButton = document.createElement("button");
  const body = document.getElementsByTagName("body")[0];

  config = {
    ...DEFAULT_CONFIG,
    ...config
  }

  let error = null;

  // Save the display state of all body children, so we can restore them later
  const bodyChildrenDisplays = [...body.children].map((v) => v.style.display);
  [...body.children].forEach((v) => (v.style.display = "none"));

  // hide all body children
  body.prepend(loadingText);
  startButton.innerText = "Boot";
  startButton.style.padding = '1rem';
  startButton.style.marginTop = '1rem';
  startButton.disabled = true;
  loadingText.after(startButton);

  const cleanup = () => {
    loadingText.remove();
    startButton.remove();
    [...body.children].forEach(
      (v, idx) => (v.style.display = bodyChildrenDisplays[idx]),
    );
  };

  // load all scripts
  const allModules = [...ENGINE_MODULES, ...modules];

  const loadedScripts = new Map(allModules.map((v) => [v, false]));
  const updateLoading = () => {
    if (error) {
      loadingText.innerText = `Catastrophic error: ${error}`;
      return;
    }
    const loadedCount = [...loadedScripts.values()].reduce(
      (cnt, cur) => (cur ? cnt + 1 : cnt),
      0,
    );
    loadingText.innerText = `Loading modules (${loadedCount}/${allModules.length})`;
    if (loadedCount == allModules.length) {
      startButton.disabled = false;
      startButton.onclick = () => _initGame(config, initializer, cleanup);
    }
  };

  allModules.forEach((module) => {
    loadScript(module).then(
      () => {
        loadedScripts.set(module, true);
        console.log("Loaded module: " + module);
        updateLoading();
      },
      () => {
        error = "Could not load module: " + module;
        updateLoading();
      },
    );
  });
}

function loadScript(src) {
  const script = document.createElement("script");
  script.src = src;
  const promise = new Promise((res) => {
    script.onload = res;
  });
  const html = document.getElementsByTagName("html")[0];
  html.appendChild(script);
  return promise;
}

// Hoist me captain
var game = {
  assetLoader: null,
  canvas: null,
  audio: null,
  ctx: null,
  config: null,
};

async function _initGame(config, initializer, cleanup) {
  game.config = config;

  // Initialize all the components and stuff
  const assetLoader = await new Promise((resolve) => {
    new AssetLoader(config.assets, resolve);
  });

  game.assetLoader = assetLoader;
  game.canvas = new CanvasManager(config.canvas, assetLoader);
  game.audio = new WebAudioManager({}, assetLoader);
  game.ctx = game.canvas.ctx;

  let renderCount = 0;

  cleanup();

  const sizeFactor = game.canvas.width / 20;

  const FPS = 8;
  const TIMEOUT = 1000 / FPS;
  const SPLASH_DURATION = config.splash.duration || 1500;
  const RENDER_COUNT = Math.ceil(SPLASH_DURATION / TIMEOUT);

  // SPLASH
  const render = () => {
    game.canvas.clear();
    const imgSize = 2 * sizeFactor;
    const centerOffset = 3 * sizeFactor;

    const ty = randpm(3);

    game.canvas.drawText(
      "the stinky\ngame engine",
      game.canvas.width / 2 -
        centerOffset +
        1 * sizeFactor -
        2 * ty +
        randpm(4),
      game.canvas.height / 2 - sizeFactor - ty / 2 + randpm(4),
      {
        align: "left",
        font: `${sizeFactor + ty}px sans-serif`,
        lineSpacing: sizeFactor,
      },
    );

    const ir = randpm(6);

    game.canvas.drawImage(
      SPRITES.ENGINE.STINKY[renderCount % 3],
      game.canvas.width / 2 - imgSize - centerOffset - ir / 2 + randpm(4),
      game.canvas.height / 2 - imgSize / 2 - ir / 2 + randpm(4),
      imgSize + ir,
      imgSize + ir,
    );

    renderCount += 1;
    if (renderCount >= RENDER_COUNT) initializer(game);
    else setTimeout(render, TIMEOUT);
  };

  render();
}
