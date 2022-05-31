const Application = PIXI.Application;

const app = new Application({
  width: 500,
  height: 500,
  transparent: true,
  antialias: true,
});

PIXI.sound.add('sound', '/src/assets/tetris.mp3');

app.renderer.backgroundColor = 0x233950;
app.renderer.resize(window.innerWidth, window.innerHeight);
// app.renderer.view.style.position = 'absolute';
// app.renderer.view.style.left = '30%';

document.body.appendChild(app.view);

const Graphics = PIXI.Graphics;
const Text = PIXI.Text;

// ****** TICKER ******* //

app.ticker.add((dt) => loop(dt));
app.ticker.maxFPS = 1;
app.ticker.speed = 2;
let fpsCounter = 0;
let score = 0;
let gameOver = 2;

let centeredX = (window.innerWidth - 300) / 2;
let centeredY = (window.innerHeight - 600) / 2;

app.stage.x = centeredX;
app.stage.y = centeredY;

function loop(dt) {
  if (gameOver == 2) {
    console.log(window.innerWidth);
    end_game();
    const startScreen = new PIXI.Container();
    startScreen.visible = true;
    app.stage.addChild(startScreen);

    let startScreenBackground = new PIXI.Graphics();
    startScreenBackground.beginFill(0xfaffb0);
    startScreenBackground.drawRect(0, 0, 300, 600);
    startScreen.addChild(startScreenBackground);

    let example = new PIXI.Graphics();
    example.beginFill(0x000000);
    example.drawRect(0, 0, 50, 50);
    example.buttonMode = true;
    example.interactive = true;
    example.on('click', onClick);
    // example.x = 230;
    // example.y = 250;
    startScreen.addChild(example);

    const style = new PIXI.TextStyle({
      fontFamily: 'Futura',
      fill: ['#ff8d87'],
      fontSize: 25,
    });

    const text = 'Press button to start game';
    const styledText = new PIXI.Text(text, style);
    startScreen.addChild(styledText);
    styledText.x = 0;
    styledText.y = 0;
  }

  // ** this part moves the shape downwards
  // everytime fpsCounter is dividable by 10 ** //
  // fpsCounter++;
  // if (fpsCounter % 5 == 0) {
  if (gameOver == 0) {
    move_down();
    // }
    check_row_full();
    console.log(score);
    draw_world(); // The world needs to be drawn in loop to see the update of shape's position
    update_high_score(score);
  }
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
    styledText.y = 0;

    const scoreText = `You scored ${score} points!`;
    const styledScoreText = new PIXI.Text(scoreText, style);
    gameOverScreen.addChild(styledScoreText);
    styledScoreText.x = 0;
    styledScoreText.y = centeredY + 100;
  }
}

// Nästa gång:
// - game
// - styling
// - sidorna/rotera, bugg
// - inte lagga så småningom
// - Multiplayer, HAHA JOKES
