document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') {
    if (!check_collision(activeShape)) {
      console.log('hej');
      remove_shape_from_world(activeShape);
      ShapePositionX += 1;
      add_shape_to_world(activeShape);
    }
  }
  if (e.key === 'ArrowLeft') {
    if (!check_collision(activeShape)) {
      remove_shape_from_world(activeShape);
      ShapePositionX -= 1;
      add_shape_to_world(activeShape);
    }
  }
  if (e.key === 'ArrowDown') {
    check_collision(activeShape);
    remove_shape_from_world(activeShape);
    ShapePositionY += 1;
    add_shape_to_world(activeShape);
  }
});
