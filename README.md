<img src="https://media.giphy.com/media/26uf1VGKiJqZjItXi/giphy.gif">

# Playdate/Tetris

This is a schoolproject. We've made tetris (yay!) in PixiJS.

# Installation

1. Clone this repo.
2. Run npm install.
3. Use a liveserver to start the project.
4. Open index.html in your favourite browser.

# Changelog

1.  -   <a href="https://github.com/s0wie/playdate/pull/1">Setup #1</a> - Setting up PixiJS
2.  -   <a href="https://github.com/s0wie/playdate/pull/2">Playground #2</a> - Added a playground with shape looping from top to bottom, that is able to move left, right and down.
3.  -   <a href="https://github.com/s0wie/playdate/pull/3">Fix figures #3</a> - Fixed bugs to shapes movement
4.  -   <a href="https://github.com/s0wie/playdate/pull/4">collision #4</a> - Added collision to shape so they stack.
5.  -   <a href="https://github.com/s0wie/playdate/pull/5">Gameover #5</a> - Added Gameover screen and functionality to restart the game.
6.  -   <a href="https://github.com/s0wie/playdate/pull/6">Game start #6 </a> - Added a start screen and some styling.

# Code Review

1. `general` - Don't forget to remove commented code that is not in use.
2. `src/assets` - Nice work with the audio, make sure to remove assets that are not in use.
3. `ingame bug` - When the down moving L-shaped objects is rotated close to the right or left wall, parts of the objects goes outside the game area. The objects also gets stuck even if it hasn't hit the bottom if you rotate them close to the edges.
4. `ingame bug` - The objects seem to change shape sometimes when they hit the bottom.
5. `license file` - Don't forget to add LICENSE to your beautiful game.
6. `functions.js:172-203` - Great job naming all your functions, might want to change onClick() to something like runGame() just to make it a little bit more clear.
7. `array.js:24` - Might want to remove your console.log during production.
8. `ingame` - The game seems to run slower after a while, might be of the lag? Any idea what causes this?
9. `App.js:49-57` - If this code snippet doesn't seem to work, maybe you could remove it?
10. `general` - Overall very clean and understandable code, great job in splitting it up the code to different files.

# Testers

Tested by the following people:

1. Amanda Karlsson
2. Johanna Jönsson
3. Hanna Rosenberg
4. Jennifer Andersson

Tested by the following muggles (non-coders):

1. Frans Bergentall
2. Adam Oliv
3. Stefan Lam
4. Ulf Eriksson
