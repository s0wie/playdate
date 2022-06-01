function draw_box_at(x, y) {
  const rectangle = new Graphics();
  rectangle
    .beginFill(colors[World[y][x]])
    .lineStyle(2, 0xd9d3d0, 1)
    .drawRect(x * 30, y * 30, 30, 30)
    .endFill();

  const whiteRectangle = new Graphics();
  whiteRectangle
    .beginFill(0xffffff)
    .drawRect(x * 30, y * 30, 30, 30)
    .endFill();

  if (y < 3) {
    app.stage.addChild(whiteRectangle);
  } else {
    app.stage.addChild(rectangle);
  }
}

function draw_world() {
  for (let y = 0; y < World.length; y++) {
    for (let x = 0; x < World[0].length; x++) {
      draw_box_at(x, y);
    }
  }
  update_high_score(score);
}

function next_shape() {
  console.log('new shape');
  activeShape = shapes[randomInt()];
  ShapePositionX = 3;
  ShapePositionY = 0;
  rotation = 0;
  if (check_collision_bottom(activeShape[rotation]) == 1) {
    gameOver = 1;
    end_game();
  }
}

function end_game() {
  PIXI.sound.stop('sound');
  app.ticker.stop();
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

function check_collision_bottom(shape) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[0].length; x++) {
      if (shape[y][x] != 0) {
        //bottom
        if (ShapePositionY + y >= 19) {
          // next_shape();
          return 1;
        }

        // else if statement is specifically for case if shape[I]
        // since y + 1 is "out of bounds" for last element in I-shape, we put this in if (y!=3)
        if (y != 3) {
          if (
            shape[y + 1][x] == 0 && // we check if it's 0 below in the shape, so it doesn't collide with itself
            World[ShapePositionY + y + 1][ShapePositionX + x] != 0 // then we check that the rect below the shape in the world is taken
          ) {
            // next_shape();
            return 1;
          }
        } else if (World[ShapePositionY + y + 1][ShapePositionX + x] != 0) {
          // don't check collision with itself since it's the last row
          // next_shape();
          return 1;
        }
      }
    }
  }
  return 0;
}

// Originally checked left, right and bottom in one function
// which caused issues in bottom corners where
// it detected collision with sides and returned before checking
// collision at the bottom
function check_collision_left(shape) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[0].length; x++) {
      if (shape[y][x] != 0) {
        // case left wall
        if (ShapePositionX + x <= 0) {
          return 2;
        }

        // case collision block
        if (x != 0) {
          if (
            shape[y][x - 1] == 0 && // we check if it's 0 below in the shape, so it doesn't collide with itself
            World[ShapePositionY + y][ShapePositionX + x - 1] != 0 // then we check that the rect below the shape in the world is taken
          ) {
            // next_shape();
            return 2;
          }
        } else if (World[ShapePositionY + y][ShapePositionX + x - 1] != 0) {
          // don't check collision with itself since it's the last row
          // next_shape();
          return 2;
        }
      }
    }
  }
  return 0;
}

function check_collision_right(shape) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[0].length; x++) {
      if (shape[y][x] != 0) {
        //case right wall
        if (ShapePositionX + x >= 9) {
          return 3;
        }

        //case collision
        if (x != 3) {
          if (
            shape[y][x + 1] == 0 && // we check if it's 0 below in the shape, so it doesn't collide with itself
            World[ShapePositionY + y][ShapePositionX + x + 1] != 0 // then we check that the rect below the shape in the world is taken
          ) {
            // next_shape();
            return 3;
          }
        } else if (World[ShapePositionY + y][ShapePositionX + x + 1] != 0) {
          // don't check collision with itself since it's the last row
          // next_shape();
          return 3;
        }
      }
    }
  }
  return 0;
}

function move_down() {
  if (check_collision_bottom(activeShape[rotation]) != 1) {
    remove_shape_from_world(activeShape[rotation]);
    ShapePositionY += 1;
    add_shape_to_world(activeShape[rotation]);
    check_row_full();
    draw_world();
  } else {
    next_shape();
  }
}

function check_row_full() {
  for (let y = 0; y < World.length; y++) {
    if (
      !World[y].includes(0) &&
      check_collision_bottom(activeShape[rotation]) == 1
    ) {
      World.splice(y, 1);
      World.splice(1, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      score += 100;
      update_high_score(score);
    }
  }
}

function update_high_score(score) {
  const HighScore = new PIXI.Text(`Score: ${score}`, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0x6d6875,
    align: 'center',
  });
  app.stage.addChild(HighScore);
}

function onClick() {
  console.log('clicked button');
  gameOver = 0;
  PIXI.sound.play('sound');
  app.ticker.start();
  score = 0;
  World.splice(0, 20);
  World.splice(
    0,
    0,
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  );
}

function show_start_screen() {
  const startScreen = new PIXI.Container();
  startScreen.visible = true;
  app.stage.addChild(startScreen);

  const style = new PIXI.TextStyle({
    fontFamily: 'Futura',
    fill: ['#ff8d87'],
    fontSize: 25,
  });

  const text = 'Press here to start game';
  const styledText = new PIXI.Text(text, style);
  styledText.buttonMode = true;
  styledText.interactive = true;
  styledText.on('click', onClick);
  startScreen.addChild(styledText);
  styledText.x = 0;
  styledText.y = 200;
}

function show_game_over_screen() {
  const gameOverScreen = new PIXI.Container();
  gameOverScreen.visible = true;
  app.stage.addChild(gameOverScreen);

  let gameOverBackground = new PIXI.Graphics();
  gameOverBackground.beginFill(0xffffff);
  gameOverBackground.drawRect(-1, 0, 320, 610);
  gameOverScreen.addChild(gameOverBackground);

  let example = new PIXI.Graphics();
  example.beginFill(0xb5838d);
  example.drawRect(0, 0, 170, 60);
  example.buttonMode = true;
  example.interactive = true;
  example.on('click', onClick);
  example.x = 30;
  example.y = 240;
  gameOverScreen.addChild(example);

  const style = new PIXI.TextStyle({
    fontFamily: 'Futura',
    fill: ['#6d6875'],
    fontSize: 25,
  });

  const whiteStyle = new PIXI.TextStyle({
    fontFamily: 'Futura',
    fill: ['#ffffff'],
    fontSize: 25,
  });

  const playagainText = `Start again!`;
  const styledPlayagainText = new PIXI.Text(playagainText, whiteStyle);
  gameOverScreen.addChild(styledPlayagainText);
  styledPlayagainText.x = 48;
  styledPlayagainText.y = 250;

  const text = 'GAME OVER';
  const styledText = new PIXI.Text(text, style);
  gameOverScreen.addChild(styledText);
  styledText.x = 35;
  styledText.y = 100;

  const scoreText = `You scored ${score} points!`;
  const styledScoreText = new PIXI.Text(scoreText, style);
  gameOverScreen.addChild(styledScoreText);
  styledScoreText.x = 0;
  styledScoreText.y = 150;
}
