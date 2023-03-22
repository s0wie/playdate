// Setting up the application.
const Application = PIXI.Application;
const Graphics = PIXI.Graphics;
const Text = PIXI.Text;
const app = new Application({
  width: 500,
  height: 500,
  transparent: true,
  antialias: true,
});

// Adding the sound
// PIXI.sound.add('sound', '/src/assets/tetris.mp3');

app.renderer.backgroundColor = 0x233950;
app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

let centeredX = (window.innerWidth - 300) / 2;
let centeredY = (window.innerHeight - 600) / 2;

app.stage.x = centeredX;
app.stage.y = centeredY;

// ****** TICKER ******* //

app.ticker.add((dt) => loop(dt));
app.ticker.maxFPS = 1;
let fpsCounter = 0;
let score = 0;
let gameOver = 2;

function loop(dt) {
  if (gameOver == 2) {
    end_game();
    show_start_screen();
  }

  // If you want the game to go slower, uncomment the text below.
  // fpsCounter++;

  if (gameOver == 0) {
    // if (fpsCounter % 5 == 0) {
    move_down();
    // }
  }

  if (gameOver == 1) {
    app.ticker.stop();
    show_game_over_screen();
  }
}
