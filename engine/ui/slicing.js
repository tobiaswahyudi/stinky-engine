class NineSlice {
  constructor(canvasManager, sheet, rowStart, colStart, scale) {
    this.canvasManager = canvasManager;
    this.sheet = sheet;
    this.scale = scale;

    // Get segments
    this.UL = sheet[rowStart][colStart];
    this.UR = sheet[rowStart][colStart + 2];
    this.DL = sheet[rowStart + 2][colStart];
    this.DR = sheet[rowStart + 2][colStart + 2];
    this.U = sheet[rowStart][colStart + 1];
    this.D = sheet[rowStart + 2][colStart + 1];
    this.L = sheet[rowStart + 1][colStart];
    this.R = sheet[rowStart + 1][colStart + 2];
    this.C = sheet[rowStart + 1][colStart + 1];
  }

  // If width is less than 2 * cellSize, this will just be wrong. And it will be your fault
  draw(x, y, width, height, align = ALIGN.Center, offset = 0) {
    const cellSize = this.UL.c * this.scale;
    const hCenterSize = width - 2 * cellSize;
    const vCenterSize = height - 2 * cellSize;

    const rect = positionRect(x, y, width, height, align, offset);

    this.canvasManager.drawImage(this.UL, rect.x, rect.y, cellSize, cellSize);
    this.canvasManager.drawImage(
      this.U,
      rect.x + cellSize,
      rect.y,
      hCenterSize,
      cellSize,
    );
    this.canvasManager.drawImage(
      this.UR,
      rect.x + cellSize + hCenterSize,
      rect.y,
      cellSize,
      cellSize,
    );
    this.canvasManager.drawImage(
      this.L,
      rect.x,
      rect.y + cellSize,
      cellSize,
      vCenterSize,
    );
    this.canvasManager.drawImage(
      this.C,
      rect.x + cellSize,
      rect.y + cellSize,
      hCenterSize,
      vCenterSize,
    );
    this.canvasManager.drawImage(
      this.R,
      rect.x + cellSize + hCenterSize,
      rect.y + cellSize,
      cellSize,
      vCenterSize,
    );
    this.canvasManager.drawImage(
      this.DL,
      rect.x,
      rect.y + cellSize + vCenterSize,
      cellSize,
      cellSize,
    );
    this.canvasManager.drawImage(
      this.D,
      rect.x + cellSize,
      rect.y + cellSize + vCenterSize,
      hCenterSize,
      cellSize,
    );
    this.canvasManager.drawImage(
      this.DR,
      rect.x + cellSize + hCenterSize,
      rect.y + cellSize + vCenterSize,
      cellSize,
      cellSize,
    );

    return rect;
  }
}

const RESCALE_TYPE = {
  RelativePixel: "RelativePixel",
  AbsolutePixel: "AbsolutePixel",
  RelativeScale: "RelativeScale",
  AbsoluteScape: "AbsoluteScape",
};

class ThreeSlice {
  constructor(canvasManager, sheet, rowStart, colStart, scale) {
    this.canvasManager = canvasManager;
    this.sheet = sheet;
    this.scale = scale;
    this.rowStart = rowStart;
    this.colStart = colStart;

    // Get segments
    this.L = sheet[rowStart][colStart];
    this.C = sheet[rowStart][colStart + 1];
    this.R = sheet[rowStart][colStart + 2];

    this.cellSize = this.L.c * this.scale;
  }

  rescaledClone(factor, type = RESCALE_TYPE.RelativePixel) {
    let newScale;
    switch (type) {
      case RESCALE_TYPE.AbsolutePixel: {
        newScale = factor / this.L.c;
        break;
      }
      case RESCALE_TYPE.RelativePixel: {
        newScale = (factor + this.cellSize) / this.L.c;
        break;
      }
      case RESCALE_TYPE.RelativeScale: {
        newScale = factor * this.scale;
        break;
      }
      case RESCALE_TYPE.AbsoluteScale: {
        newScale = factor;
        break;
      }
    }
    return new ThreeSlice(
      this.canvasManager,
      this.sheet,
      this.rowStart,
      this.colStart,
      newScale,
    );
  }

  // If width is less than 2 * cellSize, this will just be wrong. And it will be your fault
  draw(x, y, width, align = ALIGN.Center, offset = 0) {
    const hCenterSize = width - 2 * this.cellSize;

    const rect = positionRect(x, y, width, this.cellSize, align, offset);

    this.canvasManager.drawImage(
      this.L,
      rect.x,
      rect.y,
      this.cellSize,
      this.cellSize,
    );
    this.canvasManager.drawImage(
      this.C,
      rect.x + this.cellSize,
      rect.y,
      hCenterSize,
      this.cellSize,
    );
    this.canvasManager.drawImage(
      this.R,
      rect.x + this.cellSize + hCenterSize,
      rect.y,
      this.cellSize,
      this.cellSize,
    );

    return rect;
  }
}
