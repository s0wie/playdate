const Application = PIXI.Application;

const app = new Application({
  width: 500,
  height: 500,
  transparent: true,
  antialias: true,
});

app.renderer.backgroundColor = 0x233950;
app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.view.style.position = 'absolute';
// app.renderer.view.style.left = '30%';

document.body.appendChild(app.view);

const Graphics = PIXI.Graphics;
const Text = PIXI.Text;

// const HighScore = new Text(`High score: ${score}`, {
//   fontFamily: 'Arial',
//   fontSize: 24,
//   fill: 0xff1010,
//   align: 'center',
// });

// ****** TICKER ******* //

app.ticker.add((dt) => loop(dt));

app.ticker.maxFPS = 1;

let fpsCounter = 0;
let score = 0;
let gameOver = 0;

function loop(dt) {
  // ** this part moves the shape downwards
  // everytime fpsCounter is dividable by 10 ** //
  // fpsCounter++;
  // if (fpsCounter % 5 == 0) {
  move_down();
  // }
  check_row_full();
  console.log(score);
  draw_world(); // The world needs to be drawn in loop to see the update of shape's position
  update_high_score(score);
  if (gameOver == 1) {
    const gameOverScreen = new PIXI.Container();
    gameOverScreen.visible = true;
    app.stage.addChild(gameOverScreen);

    let gameOverBackground = new PIXI.Graphics();
    gameOverBackground.beginFill(0xfaffb0);
    gameOverBackground.drawRect(0, 0, 300, 600);
    gameOverScreen.addChild(gameOverBackground);

    let example = new PIXI.Graphics();
    example.beginFill(0x000000);
    example.drawRect(0, 0, 50, 50);
    example.buttonMode = true;
    example.interactive = true;
    example.on('click', onClick);
    example.x = 230;
    example.y = 250;
    gameOverScreen.addChild(example);

    const style = new PIXI.TextStyle({
      fontFamily: 'Futura',
      fill: ['#ff8d87'],
      fontSize: 25,
    });

    const text = 'GAME OVER';
    const styledText = new PIXI.Text(text, style);
    gameOverScreen.addChild(styledText);
    styledText.x = 0;
    styledText.y = 130;

    const scoreText = `You scored ${score} points!`;
    const styledScoreText = new PIXI.Text(scoreText, style);
    gameOverScreen.addChild(styledScoreText);
    styledScoreText.x = 0;
    styledScoreText.y = 190;

    // const rerun = new PIXI.Graphics();
    // rerun
    //   .beginFill(0xd9d3d0)
    //   .lineStyle(2, 0xd9d3d0, 1)
    //   .drawRect(x * 30, y * 30, 30, 30)
    //   .endFill();
    // gameOverScreen.addChild(rerun);
    // rerun.width = 400;
    // rerun.height = 100;
    // rerun.x = 140;
    // rerun.y = 230;
    // rerun.buttonMode = true;
    // rerun.interactive = true;
    // rerun.on('click', onClick);
  }
}

// Nästa gång:
// - game
// - styling
// - sidorna/rotera, bugg
// - inte lagga så småningom
// - lägga till musik och ljudeffekter?
// - Multiplayer, HAHA JOKES
