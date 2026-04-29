// Regardless, the label needs to be an array.
// it should contain the parameters to drawImage/drawText, excluding x and y.

const LABEL_TYPE = {
  Sprite: "sprite",
  Text: "text",
};

class ThreeSliceButton {
  // When hovered, expand by 8px
  HOVER_CELL_ENLARGE = 20;

  constructor(
    threeSlice,
    label,
    type,
    x,
    y,
    width,
    align = ALIGN.Center,
    offset = 0,
    onClick = I,
  ) {
    this.threeSlice = threeSlice;

    this.threeSliceHover = threeSlice.rescaledClone(
      this.HOVER_CELL_ENLARGE,
      RESCALE_TYPE.RelativePixel,
    );

    [this.label, ...this.labelRest] = label;
    this.type = type;
    this.x = x;
    this.y = y;
    this.width = width;
    this.align = align;
    this.offset = offset;

    this.hovered = false;
    this.clicked = false;
    const rect = positionRect(x, y, width, threeSlice.cellSize, align, offset);

    this.center = rect.center;

    this.element = game.ui.addElement(new UIElementEntry(this, rect, onClick));
  }

  delete() {
    game.ui.removeElementWithId(this.element.id);
  }

  render() {
    if (this.hovered) {
      game.ctx.save();
      game.ctx.filter = `contrast(90%) brightness(110%)`;
      this.threeSliceHover.draw(
        this.center.x,
        this.center.y,
        this.width + this.HOVER_CELL_ENLARGE,
        ALIGN.Center,
      );
      game.ctx.restore();
    } else {
      this.threeSlice.draw(
        this.center.x,
        this.center.y,
        this.width,
        ALIGN.Center,
      );
    }

    switch (this.type) {
      case LABEL_TYPE.Sprite: {
        // This is wrong - image is not centered. It's ok for now
        game.canvas.drawImage(
          this.label,
          this.center.x,
          this.center.y,
          ...this.labelRest,
        );
        break;
      }
      case LABEL_TYPE.Text: {
        const extrOptions = this.labelRest?.[0] || {};
        game.canvas.drawText(this.label, this.center.x, this.center.y, {
          ...extrOptions,
          align: "center",
          baseline: "middle",
        });
        break;
      }
    }
  }
}
