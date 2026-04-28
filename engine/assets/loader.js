const imgAssetMapper = (sprite) => sprite.src ?? sprite;

/**
 * Asset Loader. Loads assets.
 *
 * Sample assets parameter:
 * ```
 *  {
 *    fonts: [
 *      ['Edu-SA', ['400', '500', '600', '700']],
 *      ['Tiny5', ['400']],
 *    ],
 *    sprites: {
 *      SPRITE: {
 *      CRATE: "assets/sprite/crate.png",
 *      BLOCK: {
 *        src: "assets/sprite/block.png",
 *        c: 32, x: 1, y: 2                 // <- Spritesheet has 32px tiles, this is at row 3 and col 2
 *      },
 *      GOBBOS: {
 *        MOVE: "assets/sprite/goblin.png",
 *        SLEEP: "assets/sprite/sleep_gobbo.png",
 *      },
 *    }
 *  }
 * ```
 */
class AssetLoader {
  constructor(assets, onLoaded) {
    this.loadedImages = new Map();
    this.loadedTracks = new Map();

    // Actually created here, because we need to initialize tracks with it.
    // Ownership "passed" to webaudiomanager later
    // Bad oop? yeah, whatcha gonna do about it huh?
    this.audioContext = new AudioContext();

    const imgSrcs = [...new Set(objFlatten(assets.sprites, imgAssetMapper))];
    const soundSrcs = objFlatten(assets.sounds);

    Promise.all([
      this.preloadImages(imgSrcs),
      this.preloadFonts(assets.fonts),
      this.preloadTracks(soundSrcs),
    ]).then(
      (res) => {
        onLoaded(this, res);
      },
      (err) => {
        console.error("Error preloading assets:", err);
      },
    );
  }

  // Preload multiple images
  async preloadImages(imgSrcs) {
    const preloadImage = async (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          this.loadedImages.set(src, img);
          resolve(img);
        };
        img.onerror = reject;
        img.src = src;
      });
    };

    try {
      await Promise.all(
        imgSrcs.map((src) =>
          preloadImage(src).then(() => console.log("Loaded image ", src)),
        ),
      );
      console.log("All images preloaded");
    } catch (error) {
      console.error("Error preloading images:", error);
      return Promise.reject(error);
    }
  }

  // Preload multiple tracks
  async preloadTracks(sfxSrcs) {
    const preloadTrack = (src) => {
      // const ae = new Audio();
      // ae.src = src;
      const ae = document.createElement("audio");
      ae.src = src;
      const track = this.audioContext.createMediaElementSource(ae);
      this.loadedTracks.set(src, { track, element: ae });
      return track;
    };

    try {
      const res = sfxSrcs.map((src) => {
        const res = preloadTrack(src);
        console.log("Loaded track ", src);
        return res;
      });
      console.log("All tracks preloaded");
      return Promise.resolve(res);
    } catch (error) {
      console.error("Error preloading tracks:", error);
      return Promise.reject(error);
    }
  }

  async preloadFonts(fonts) {
    // Create new style tag
    const style = document.createElement("style");
    const head = document.getElementsByTagName("head")[0];
    head.appendChild(style);

    // Iterate through all fonts and add to stylesheet
    const fontImports = fonts.flatMap((fontObj) => {
      const name = fontObj.name;
      return fontObj.variants.map(
        ([weight, style, src]) =>
          `@font-face {
    font-family: '${name}';
    src: url('${src}') format('truetype');
    font-weight: ${weight};
    font-style: ${style};`,
      );
    });

    style.innerText = fontImports.join("\n\n");

    // Await all fonts being loaded
    try {
      await Promise.all(
        fonts.flatMap((fontObj) => {
          const name = fontObj.name;
          return fontObj.variants.map(([weight, style]) =>
            document.fonts.load(`${style} ${weight} 12px ${name}`).then(() => {
              console.log(`Loaded ${style} ${weight} ${name}`);
            }),
          );
        }),
      );
      console.log("All fonts preloaded");
    } catch (error) {
      console.error("Error preloading fonts:", error);
      return Promise.reject(error);
    }
  }

  track(trackSrc) {
    return this.loadedTracks.get(trackSrc);
  }

  img(imgSrc) {
    return this.loadedImages.get(imgSrc);
  }
}
