/**
 *  config: {
 *    width: 1280,
 *    height: 720
 *  }
 */

class CanvasManager {
  constructor(config, assetLoader) {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");

    // Canvas dimensions
    this.width = GAME_WIDTH;
    this.height = GAME_HEIGHT;
    // Set canvas size
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.assetLoader = assetLoader;
  }

  drawImage(src, x, y, width = null, height = null, clip = {}) {
    const { x: clipX, y: clipY, width: clipWidth, height: clipHeight } = clip;
    const img = this.assetLoader.img(src);
    if (!img) {
      console.warn(`Image not loaded: ${src}`);
      return;
    }

    if (Object.keys(clip).length > 0) {
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
