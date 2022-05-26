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
// app.renderer.view.style.left = '50px';
// app.renderer.view.style.top = '50px';
document.body.appendChild(app.view);

const Graphics = PIXI.Graphics;

let score = 0;

// ****** TICKER ******* //

app.ticker.add((dt) => loop(dt));

app.ticker.maxFPS = 10;

let fpsCounter = 0;

function loop(dt) {
  // ** this part moves the shape downwards
  // everytime fpsCounter is dividable by 10 ** //
  fpsCounter++;
  if (fpsCounter % 10 == 0) {
    move_down();
  }
  //remove_shape_from_world(activeShape[rotation]);

  //add_shape_to_world(activeShape[rotation]);
  // check_collision(activeShape[rotation]);
  // }
  // ***************************************** //

  // collision

  //add_shape_to_world(L);

  // ** this part checks if the shapes position reaches
  // the bottom of World, at which point it starts over at the top ** //
  // if (ShapePositionY + L.length >= World.length) {
  //   ShapePositionY = 0;
  // }
  // ***************************************** //
  check_row_full();
  console.log(score);
  draw_world(); // The world needs to be drawn in loop to see the update of shape's position
}

// Nästa gång:
// - sidorna/rotera, bugg
// - gameover-linje
// - game och gameover
// - inte lagga så småningom
// - Multiplayer, HAHA JOKES
