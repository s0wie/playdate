document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') {
    if (!(check_collision_right(activeShape[rotation]) == 3)) {
      remove_shape_from_world(activeShape[rotation]);
      ShapePositionX += 1;
      add_shape_to_world(activeShape[rotation]);
      draw_world();
    }
  }
  if (e.key === 'ArrowLeft') {
    if (!(check_collision_left(activeShape[rotation]) == 2)) {
      remove_shape_from_world(activeShape[rotation]);
      ShapePositionX -= 1;
      add_shape_to_world(activeShape[rotation]);
      draw_world();
    }
  }
  if (e.key === 'ArrowDown') {
    move_down();
    draw_world();
  }

  if (e.key === 'ArrowUp') {
    if (
      !(check_collision_left(activeShape[rotation]) == 2) &&
      !(check_collision_right(activeShape[rotation]) == 3)
    ) {
      // checks collision with wall
      remove_shape_from_world(activeShape[rotation]);
      rotation = (rotation + 1) % 4;
      // adds one to rotation, but will never be over 4. if rotation = 3 then (3+1)%4 = 0
      add_shape_to_world(activeShape[rotation]);
      draw_world();
    }
  }
});
