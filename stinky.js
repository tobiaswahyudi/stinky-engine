// To start, call MakeGameStinky.
function MakeGameStinky(config, modules = [], initializer = () => {}) {
  const loadingText = document.createElement("span");
  loadingText.style.color = "white";
  const body = document.getElementsByTagName("body")[0];

  let error = null;

  // Save the display state of all body children, so we can restore them later
  const bodyChildrenDisplays = [...body.children].map((v) => v.style.display);
  [...body.children].forEach((v) => (v.style.display = "none"));

  // hide all body children
  body.prepend(loadingText);

  const cleanup = () => {
    loadingText.remove();
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
    if (loadedCount == allModules.length)
      _initGame(config, initializer, cleanup);
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

var ENGINE_MODULES = [
  "engine/assets/loader.js",
  "engine/math/types.js",
  "engine/render/canvas.js",
  "engine/util/constants.js",
  "engine/math/random.js",
  "engine/math/vec2.js",
  "engine/state/gameState.js",
  "engine/util/flatten.js",
];

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
  ctx: null,
  config: null,
};

async function _initGame(config, initializer, cleanup) {
  game.config = config;

  const assetLoader = await new Promise((resolve) => {
    new AssetLoader(config.assets, resolve);
  });

  game.assetLoader = assetLoader;
  game.canvas = new CanvasManager(config.canvas, assetLoader);
  game.ctx = game.canvas.ctx;

  let renderCount = 0;

  cleanup();

  const sizeFactor = game.canvas.width / 24;

  const render = () => {
    game.canvas.clear();
    const imgSize = 2 * sizeFactor;
    const centerOffset = 3 * sizeFactor;

    game.canvas.drawText(
      "the stinky\ngame engine",
      game.canvas.width / 2 - centerOffset + 1 * sizeFactor,
      game.canvas.height / 2 - sizeFactor,
      {
        align: "left",
        font: `${sizeFactor}px Syne Mono`,
        lineSpacing: sizeFactor,
      },
    );

    game.canvas.drawImage(
      SPRITES.ENGINE.STINKY[(renderCount % 3) + 1],
      game.canvas.width / 2 - imgSize - centerOffset,
      game.canvas.height / 2 - imgSize / 2,
      imgSize,
      imgSize,
    );

    renderCount += 1;
    if (renderCount >= 20) initializer(game);
    else setTimeout(render, 50);
  };

  render();
}
