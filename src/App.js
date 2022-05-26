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

app.ticker.maxFPS = 10;

let fpsCounter = 0;
let score = 0;
function loop(dt) {
  // ** this part moves the shape downwards
  // everytime fpsCounter is dividable by 10 ** //
  // fpsCounter++;
  // if (fpsCounter % 10 == 0) {
  move_down();
  // }
  check_row_full();
  console.log(score);
  draw_world(); // The world needs to be drawn in loop to see the update of shape's position
  update_high_score(score);
}

// Nästa gång:
// - game och gameover
// - styling
// - sidorna/rotera, bugg
// - inte lagga så småningom
// - Multiplayer, HAHA JOKES
