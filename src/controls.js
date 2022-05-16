document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') {
    remove_shape_from_world(L);
    ShapePositionX += 1;
    add_shape_to_world(L);
  }
  if (e.key === 'ArrowLeft') {
    remove_shape_from_world(L);
    ShapePositionX -= 1;
    add_shape_to_world(L);
  }
  if (e.key === 'ArrowDown') {
    remove_shape_from_world(L);
    ShapePositionY += 1;
    add_shape_to_world(L);
  }
});
