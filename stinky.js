// To start, call MakeGameStinky.
function MakeGameStinky(config, modules = [], initializer = () => {}) {
  const loadingText = document.createElement('span');
  loadingText.style.color = 'white';
  const body = document.getElementsByTagName('body')[0];

  let error = null;

  // Save the display state of all body children, so we can restore them later
  const bodyChildrenDisplays = [...body.children].map(v => v.style.display);
  [...body.children].forEach(v => v.style.display = 'none');

  // hide all body children
  body.prepend(loadingText);

  const cleanup = () => {
    loadingText.remove();
    [...body.children].forEach((v, idx) => v.style.display = bodyChildrenDisplays[idx]);
  }

  // load all scripts
  const allModules = [...ENGINE_MODULES, ...modules]

  const loadedScripts = new Map(allModules.map(v => [v, false]));
  const updateLoading = () => {
    if(error) {
      loadingText.innerText = `Catastrophic error: ${error}`;
      return;
    }
    const loadedCount = [...loadedScripts.values()].reduce((cnt, cur) => cur ? cnt + 1 : cnt, 0);
    loadingText.innerText = `Loading modules (${loadedCount}/${allModules.length})`;
    if(loadedCount == allModules.length) _initGame(config, initializer, cleanup);
  }

  allModules.forEach(module => {
    loadScript(module).then(() => {
      loadedScripts.set(module, true);
      console.log('Loaded module: ' + module)
      updateLoading();
    }, () => {
      error = 'Could not load module: ' + module;
      updateLoading();
    })
  })
}

var ENGINE_MODULES = [
  'engine/assets/loader.js',
  'engine/math/types.js',
  'engine/render/canvas.js',
  'engine/util/constants.js',
  'engine/math/random.js',
  'engine/math/vec2.js',
  'engine/state/gameState.js',
  'engine/util/flatten.js',
]

function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    const promise = new Promise((res) => {
        script.onload = res;
    })
    const html = document.getElementsByTagName('html')[0];
    html.appendChild(script);
    return promise;
}

function _initGame(config, initializer, cleanup) {
  initializer();
  // After all done, remove the loading text and start rendering the game
  cleanup();
}