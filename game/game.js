function startGame(game) {
  const { assetLoader, canvas, ctx, config } = game;

  let renderCount = 0;

  const nineslice = new NineSlice(canvas, ASSETS.sprites.DESERT.UI, 0, 9, 4);
  const threeslice = new ThreeSlice(canvas, ASSETS.sprites.DESERT.UI, 3, 7, 4);

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

    nineslice.draw(
      canvas.width / 2,
      (canvas.height * 2) / 3,
      150 + Math.sin(renderCount * 0.05) * 20,
      160 + Math.sin(renderCount * 0.07) * 30,
      ALIGN.Center,
    );

    threeslice.draw(
      100,
      canvas.height / 2 - 100,
      150 + Math.sin(renderCount * 0.05) * 20,
      ALIGN.Left,
    );
    threeslice.draw(
      200,
      canvas.height / 2,
      150 + Math.sin(renderCount * 0.05) * 20,
      ALIGN.Center,
    );
    threeslice.draw(
      300,
      canvas.height / 2 + 100,
      150 + Math.sin(renderCount * 0.05) * 20,
      ALIGN.Right,
    );

    setTimeout(renderLoop, 1000 / 60);
  };

  renderLoop();
}
