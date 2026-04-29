// interface: element needs a .render() function.
// you probably want onHover, onClick to interact with the state that .render looks at
class UIElementEntry {
  constructor(element, path, onClick) {
    this.element = element;
    this.path = path;
    this.onClick = onClick;
    this.id = randomHash();
  }
}

class UIManager {
  NUM_LAYERS = 10;

  constructor(canvasManager) {
    this.canvasManager = canvasManager;
    this.ctx = canvasManager.ctx;
    this.elementLayerLookup = new Map();
    this.elementLayers = new Array(this.NUM_LAYERS).fill(0).map(() => []);

    //Attach listeners
    canvasManager.canvas.addEventListener("mousemove", ({ offsetX, offsetY }) =>
      this.hoverCheck(offsetX, offsetY),
    );
    canvasManager.canvas.addEventListener("mousedown", ({ offsetX, offsetY }) =>
      this.clickCheck(offsetX, offsetY),
    );
    canvasManager.canvas.addEventListener("mouseup", this.mouseUp.bind(this));
  }

  // Lower layers is closer to front.
  addElement(element, layer = this.NUM_LAYERS - 1) {
    this.elementLayerLookup.set(element.id, layer);
    this.elementLayers[layer].push(element);
    return element;
  }

  removeElementWithId(id) {
    const layer = this.elementLayerLookup.get(id);
    if (!layer) {
      console.warn(
        `[UIManager] Trying to delete untracked UI element with ID ${id}`,
      );
      return;
    }
    this.elementLayerLookup.delete(id);
    const elIdx = this.elementLayers[layer].findIndex((el) => el.id === id);
    this.elementLayers[layer].splice(elIdx, 1);
  }

  hoverCheck(mouseX, mouseY) {
    const worldSpace = this.canvasManager.screenToWorldSpace(mouseX, mouseY);
    let hasHoveredElement = false;
    for (const elements of this.elementLayers) {
      for (const entry of elements) {
        if (
          this.ctx.isPointInPath(entry.path, worldSpace.x, worldSpace.y) &&
          !hasHoveredElement
        ) {
          entry.element.hovered = true;
          hasHoveredElement = true;
        } else {
          entry.element.hovered = false;
        }
      }
    }
  }

  clickCheck(mouseX, mouseY) {
    const worldSpace = this.canvasManager.screenToWorldSpace(mouseX, mouseY);
    clickCheckLoop: for (const elements of this.elementLayers) {
      for (const entry of elements) {
        if (!entry.onClick) continue;
        if (this.ctx.isPointInPath(entry.path, worldSpace.x, worldSpace.y)) {
          entry.onClick();
          break clickCheckLoop;
        }
      }
    }
  }

  mouseUp() {
    for (const elements of this.elementLayers) {
      for (const entry of elements) {
        if (!entry.onMouseUp) continue;
        entry.onMouseUp();
      }
    }
  }

  render() {
    for (let i = this.NUM_LAYERS - 1; i >= 0; i--) {
      for (const entry of this.elementLayers[i]) {
        entry.element.render();
      }
    }
  }
}
