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

let World = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

console.log(World);

const colors = [
  '0xf8f5f1',
  '0xff8d87',
  '0xfaffb0',
  '0xc0ffb6',
  '0xd0ddff',
  '0xe1bfff',
  '0xf8bccb',
  '0xffcd9c',
];

let ShapePositionX = 4;
let ShapePositionY = 0;

const L = [
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0],
];

const I = [
  [0, 2, 0, 0],
  [0, 2, 0, 0],
  [0, 2, 0, 0],
  [0, 2, 0, 0],
];
const Z = [
  [0, 3, 0, 0],
  [0, 3, 3, 0],
  [0, 0, 3, 0],
  [0, 0, 0, 0],
];

const shapes = [L, I, Z];

function draw_box_at(x, y) {
  const rectangle = new Graphics();
  rectangle
    .beginFill(colors[World[y][x]])
    .lineStyle(2, 0xd9d3d0, 1)
    .drawRect(x * 30, y * 30, 30, 30)
    .endFill();
  app.stage.addChild(rectangle);
}

function draw_world() {
  for (let y = 0; y < World.length; y++) {
    for (let x = 0; x < World[0].length; x++) {
      draw_box_at(x, y);
    }
  }
}

function add_shape_to_world(shape) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[0].length; x++) {
      if (shape[y][x] != 0) {
        if (ShapePositionY + y < 20) {
          World[y + ShapePositionY][x + ShapePositionX] = shape[y][x];
        }
      }
    }
  }
}

// function move_shape_down()

// move_shape_left

// move_shape_right

// Funderar på att inte köra med ticker, och börja med att kunna move med
// med pilarna
document.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key === 'ArrowRight') {
    ShapePositionX += 1;
  }
  if (e.key === 'ArrowLeft') {
    ShapePositionX -= 1;
  }
  // if (e.key === 'ArrowDown') {
  //   ShapePositionY -= 1;
  // }
});

// Vi behöver annars ha acess till DeltaMS på något sätt i ticker-klassen
app.ticker.add((delta) => loop(delta));

let fpsCounter = 0;

function loop(delta) {
  // annars kan vi göra en frame-counter, och varje gång den når
  // en viss frame så flyttas den += 1
  // Testade nyss och man ser hur performance blir dålig..
  fpsCounter += 1;

  // console.log(fpsCounter);
  // add_shape_to_world(L);

  if (fpsCounter === 20) {
    fpsCounter = 0;
    ShapePositionY += 1;
  }
  console.time('add_shape_to_world');
  add_shape_to_world(L);
  console.timeEnd('add_shape_to_world');
  draw_world(); // The world needs to be drawn in loop to see the update of shape's position
}

console.log(World);

// Nästa steg efter detta är att få
