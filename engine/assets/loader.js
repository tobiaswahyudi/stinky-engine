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

    const imgSrcs = [...new Set(objFlatten(assets.imgSrcs, imgAssetMapper))];

    Promise.all([
      this.preloadImages(imgSrcs),
      this.preloadFonts(assets.fonts),
    ]).then(onLoaded, (err) => {
      console.error("Error preloading assets:", err);
    });
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
        imgSrcs.map((src) => {
          preloadImage(src);
        }),
      );
      console.log("All images preloaded");
    } catch (error) {
      console.error("Error preloading images:", error);
    }
  }

  async preloadFonts(fonts) {
    try {
      await Promise.all(
        fonts.map(([fontName, weights]) =>
          Promise.all(
            weights.map((weight) =>
              document.fonts.load(`${weight} 12px ${fontName}`),
            ),
          ),
        ),
      );
      console.log("All fonts preloaded");
    } catch (error) {
      console.error("Error preloading fonts:", error);
    }
  }

  img(imgSrc) {
    return this.loadedImages.get(imgSrc);
  }
}
