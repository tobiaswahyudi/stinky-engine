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

    let rect;
    let coord;
    rect = nineslice.draw(
      canvas.width / 2,
      (canvas.height * 2) / 3,
      240 + Math.sin(renderCount * 0.05) * 40,
      160 + Math.sin(renderCount * 0.07) * 30,
      ALIGN.Center,
    );
    coord = rect.topLeft;
    canvas.drawText("Left Aligned\ntext on\ncenter aligned\nbox", coord.x + 32, coord.y + 32, {
      align: "left",
      font: `bold 18px sans-serif`,
    });
    rect = nineslice.draw(
      canvas.width * 2 / 3,
      (canvas.height * 2) / 3,
      240 + Math.sin(renderCount * 0.08) * 40,
      160 + Math.sin(renderCount * 0.09) * 30,
      ALIGN.Left,
    );
    coord = rect.top;
    canvas.drawText("Center Aligned\ntext on\nleft aligned\nbox", coord.x, coord.y + 32, {
      align: "center",
      font: `bold 18px sans-serif`,
    });

    rect = threeslice.draw(
      100,
      canvas.height / 2 - 100,
      200 + Math.sin(renderCount * 0.05) * 20,
      ALIGN.Left,
    );
    coord = rect.center;
    canvas.drawText("Left Aligned", coord.x, coord.y - 10, {
      align: "center",
      font: `bold 18px sans-serif`,
    });
    rect = threeslice.draw(
      250,
      canvas.height / 2,
      200 + Math.sin(renderCount * 0.05) * 20,
      ALIGN.Center,
    );
    coord = rect.center;
    canvas.drawText("Center Aligned", coord.x, coord.y - 10, {
      align: "center",
      font: `bold 18px sans-serif`,
    });
    rect = threeslice.draw(
      400,
      canvas.height / 2 + 100,
      200 + Math.sin(renderCount * 0.05) * 20,
      ALIGN.Right,
    );
    coord = rect.center;
    canvas.drawText("Right Aligned", coord.x, coord.y - 10, {
      align: "center",
      font: `bold 18px sans-serif`,
    });

    setTimeout(renderLoop, 1000 / 60);
  };

  renderLoop();
}
