const ALIGN = {
  TopLeft: 0,
  Top: 1,
  TopRight: 2,
  Left: 3,
  Center: 4,
  Right: 5,
  BottomLeft: 6,
  Bottom: 7,
  BottomRight: 8,
};

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

  rect(x, y, width, height, align = ALIGN.Center, offset = 0) {
    const leftAlignment = align % 3;
    const topAlignment = Math.floor(align / 3);

    const offsetVec = new Vec2(1 - leftAlignment, 1 - topAlignment)
      .normalize()
      .scale(offset);

    const topLeftVec = new Vec2(-leftAlignment / 2, -topAlignment / 2)
      .scale(width, height)
      .add(new Vec2(x, y))
      .add(offsetVec);

    return new Rect2D(topLeftVec.x, topLeftVec.y, width, height);
  }

  // If width is less than 2 * cellSize, this will just be wrong. And it will be your fault
  draw(x, y, width, height, align = ALIGN.Center, offset = 0) {
    const cellSize = this.UL.c * this.scale;
    const hCenterSize = width - 2 * cellSize;
    const vCenterSize = height - 2 * cellSize;

    const rect = this.rect(x, y, width, height, align, offset);

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

class ThreeSlice {
  constructor(canvasManager, sheet, rowStart, colStart, scale) {
    this.canvasManager = canvasManager;
    this.sheet = sheet;
    this.scale = scale;

    // Get segments
    this.L = sheet[rowStart][colStart];
    this.C = sheet[rowStart][colStart + 1];
    this.R = sheet[rowStart][colStart + 2];

    this.cellSize = this.L.c * this.scale;
  }

  rect(x, y, width, align = ALIGN.Center, offset = 0) {
    const leftAlignment = align % 3;
    const topAlignment = Math.floor(align / 3);

    const offsetVec = new Vec2(1 - leftAlignment, 1 - topAlignment)
      .normalize()
      .scale(offset);

    const topLeftVec = new Vec2(-leftAlignment / 2, -topAlignment / 2)
      .scale(width, this.cellSize)
      .add(new Vec2(x, y))
      .add(offsetVec);

    return new Rect2D(topLeftVec.x, topLeftVec.y, width, this.cellSize);
  }

  // If width is less than 2 * cellSize, this will just be wrong. And it will be your fault
  draw(x, y, width, align = ALIGN.Center, offset = 0) {
    const hCenterSize = width - 2 * this.cellSize;

    const rect = this.rect(x, y, width, align, offset);

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
