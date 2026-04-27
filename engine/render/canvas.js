/**
 *  config: {
 *    width: 1280,
 *    height: 720
 *  }
 */

const DEFAULT_CONFIG = {
  width: 1280,
  height: 720,
  screenBoundPercent: 90,
};

class CanvasManager {
  constructor(config, assetLoader) {
    config = {
      ...DEFAULT_CONFIG,
      ...config,
    };

    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");

    // Canvas dimensions
    this.width = config.width;
    this.height = config.height;
    // Set canvas size
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Set image smoothing off - needs to happen after canvas resize
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.textRendering = "geometricPrecision";

    // Constrain to 90% of screen
    this.canvas.style.width = `${config.screenBoundPercent}vw`;
    this.canvas.style.height = `${config.screenBoundPercent}vh`;

    // Constrain to aspect ratio
    this.canvas.style.maxWidth = `calc(${config.screenBoundPercent}vh * ${config.width} / ${config.height})`;
    this.canvas.style.maxHeight = `calc(${config.screenBoundPercent}vw * ${config.height} / ${config.width})`;

    this.assetLoader = assetLoader;
  }

  clear(color) {
    if (!color) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    } else {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }
  }

  drawImage(tgt, x, y, width = null, height = null) {
    const src = typeof tgt === "object" ? tgt.src : tgt;
    const img = this.assetLoader.img(src);
    if (!img) {
      console.warn(`Image not loaded: ${src}`);
      return;
    }

    if (typeof tgt === "object") {
      const clipX = tgt.c * tgt.x;
      const clipY = tgt.c * tgt.y;
      const clipWidth = tgt.c;
      const clipHeight = tgt.c;

      this.ctx.drawImage(
        img,
        clipX,
        clipY,
        clipWidth,
        clipHeight,
        x,
        y,
        width,
        height,
      );
    } else if (width && height) {
      this.ctx.drawImage(img, x, y, width, height);
    } else {
      this.ctx.drawImage(img, x, y);
    }
  }

  drawText(text, x, y, options = {}) {
    const {
      color = "#fff",
      font = "16px Courier New",
      align = "left",
      baseline = "top",
      lineSpacing = Number(font.match(/(\d+)px/)[1] || 16),
    } = options;

    if (typeof text === "object") {
      // MULTILINE
      for (const line of text) {
        y = this.drawText(line, x, y, options);
      }
      return y;
    } else {
      const textSplit = text.split("\n");
      if (textSplit.length > 1) {
        return this.drawText(textSplit, x, y, options);
      }
      this.ctx.fillStyle = color;
      this.ctx.font = font;
      this.ctx.textAlign = align;
      this.ctx.textBaseline = baseline;
      this.ctx.fillText(text, x, y);
      return y + lineSpacing;
    }
  }

  getPathDrawParams(params = {}) {
    const result = {
      fill: "#fff",
      stroke: "#000",
      strokeWidth: 0,
      ...params,
    };
    result.filled = !!result.fill;
    return result;
  }

  drawRect(x, y, width, height, params = {}) {
    const { fill, stroke, strokeWidth, filled } =
      this.getPathDrawParams(params);

    this.ctx.strokeStyle = stroke;
    this.ctx.fillStyle = fill;
    this.ctx.lineWidth = strokeWidth;

    if (filled) this.ctx.fillRect(x, y, width, height);
    if (strokeWidth) this.ctx.strokeRect(x, y, width, height);
  }

  drawPath(path, params = {}) {
    const { fill, stroke, strokeWidth, filled } =
      this.getPathDrawParams(params);

    this.ctx.strokeStyle = stroke;
    this.ctx.fillStyle = fill;
    this.ctx.lineWidth = strokeWidth;

    if (filled) this.ctx.fill(path);
    if (strokeWidth) this.ctx.stroke(path);
  }

  drawCircle(x, y, radius, params) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    // While this looks odd, I think the currying is actually correct
    // This quirk comes from trying to optimize an almost-but-not-really duplicated code block
    this.drawPath(undefined, params);
  }
}
