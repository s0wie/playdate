document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') {
    ShapePositionX += 1;
  }
  if (e.key === 'ArrowLeft') {
    ShapePositionX -= 1;
  }
  if (e.key === 'ArrowDown') {
    ShapePositionY += 1;
  }
});
