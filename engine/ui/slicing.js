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

  // If width is less than 2 * cellSize, this will just be wrong. And it will be your fault
  draw(x, y, width, height, align = ALIGN.Center, offset = 0) {
    const cellSize = this.UL.c * this.scale;
    const leftAlignment = align % 3;
    const topAlignment = Math.floor(align / 3);

    const offsetVec = new Vec2(1 - leftAlignment, 1 - topAlignment)
      .normalize()
      .scale(offset);

    const topLeftVec = new Vec2(-leftAlignment / 2, -topAlignment / 2)
      .scale(width, height)
      .add(new Vec2(x, y))
      .add(offsetVec);

    const hCenterSize = width - 2 * cellSize;
    const vCenterSize = height - 2 * cellSize;

    this.canvasManager.drawImage(
      this.UL,
      topLeftVec.x,
      topLeftVec.y,
      cellSize,
      cellSize,
    );
    this.canvasManager.drawImage(
      this.U,
      topLeftVec.x + cellSize,
      topLeftVec.y,
      hCenterSize,
      cellSize,
    );
    this.canvasManager.drawImage(
      this.UR,
      topLeftVec.x + cellSize + hCenterSize,
      topLeftVec.y,
      cellSize,
      cellSize,
    );
    this.canvasManager.drawImage(
      this.L,
      topLeftVec.x,
      topLeftVec.y + cellSize,
      cellSize,
      vCenterSize,
    );
    this.canvasManager.drawImage(
      this.C,
      topLeftVec.x + cellSize,
      topLeftVec.y + cellSize,
      hCenterSize,
      vCenterSize,
    );
    this.canvasManager.drawImage(
      this.R,
      topLeftVec.x + cellSize + hCenterSize,
      topLeftVec.y + cellSize,
      cellSize,
      vCenterSize,
    );
    this.canvasManager.drawImage(
      this.DL,
      topLeftVec.x,
      topLeftVec.y + cellSize + vCenterSize,
      cellSize,
      cellSize,
    );
    this.canvasManager.drawImage(
      this.D,
      topLeftVec.x + cellSize,
      topLeftVec.y + cellSize + vCenterSize,
      hCenterSize,
      cellSize,
    );
    this.canvasManager.drawImage(
      this.DR,
      topLeftVec.x + cellSize + hCenterSize,
      topLeftVec.y + cellSize + vCenterSize,
      cellSize,
      cellSize,
    );
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
  }

  // If width is less than 2 * cellSize, this will just be wrong. And it will be your fault
  draw(x, y, width, align = ALIGN.Center, offset = 0) {
    const cellSize = this.L.c * this.scale;
    const leftAlignment = align % 3;
    const topAlignment = Math.floor(align / 3);

    console.log(
      align,
      leftAlignment,
      topAlignment,
      -leftAlignment / 2,
      -topAlignment / 2,
    );

    const offsetVec = new Vec2(1 - leftAlignment, 1 - topAlignment)
      .normalize()
      .scale(offset);

    const topLeftVec = new Vec2(-leftAlignment / 2, -topAlignment / 2)
      .scale(width, cellSize)
      .add(new Vec2(x, y))
      .add(offsetVec);

    const hCenterSize = width - 2 * cellSize;

    this.canvasManager.drawImage(
      this.L,
      topLeftVec.x,
      topLeftVec.y,
      cellSize,
      cellSize,
    );
    this.canvasManager.drawImage(
      this.C,
      topLeftVec.x + cellSize,
      topLeftVec.y,
      hCenterSize,
      cellSize,
    );
    this.canvasManager.drawImage(
      this.R,
      topLeftVec.x + cellSize + hCenterSize,
      topLeftVec.y,
      cellSize,
      cellSize,
    );
  }
}
