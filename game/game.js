function startGame(game) {
  const { assetLoader, canvas, ctx, config } = game;

  let renderCount = 0;

  const renderLoop = () => {
    canvas.clear("#4483e2");
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 3);
    ctx.rotate(Math.sin(renderCount * 0.1) * 0.2);
    canvas.drawText("THIS IS YOUR GAME", 0, -30, {
      align: "center",
      font: `60px Syne Mono`,
    });
    ctx.restore();

    renderCount++;

    setTimeout(renderLoop, 1000 / 60);
  };

  renderLoop();
}
