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

function next_shape() {
  console.log('new shape');
  activeShape = shapes[randomInt()];
  ShapePositionX = 4;
  ShapePositionY = 0;
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

function remove_shape_from_world(shape) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[0].length; x++) {
      if (shape[y][x] != 0) {
        if (ShapePositionY + y < 19) {
          World[y + ShapePositionY][x + ShapePositionX] = 0;
        }
      }
    }
  }
}

function check_collision(shape) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[0].length; x++) {
      if (shape[y][x] != 0) {
        if (ShapePositionY + y > 18) {
          // nu är vi i botten
          next_shape(activeShape);
        }
        if (ShapePositionX + x < 0 || ShapePositionX + x > 10) {
          return true;
          // sidorna
        }
        // if (World[ShapePositionY + 1 + y][ShapePositionX + x] != 0) {
        //   // next_shape(activeShape);
        //   // collission med annat block under en
        // }
      }
    }
  }
  return false;
}

// function randomInt() {
//   return Math.floor(Math.random() * 7);
// }

function rotate_shape(shape) {
  shape[+1];
}
