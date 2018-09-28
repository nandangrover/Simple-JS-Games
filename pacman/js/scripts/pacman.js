let gameData = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
  [1, 2, 2, 2, 1, 1, 5, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2, 2, 2, 1],
  [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
  [1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
  [1, 2, 2, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2, 2, 2, 1],
  [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
  [1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let pacman = 5;
let walls = 1;
let coins = 2;
let ground = 3;
let map = undefined;
let fps = 6;
let now;
let then = Date.now();
let interval = 1000 / fps;
let delta;
let requestId = undefined;


let pacmanObj = {
  x: 4,
  y: 6,
  direction: "right"
}

function main() {
  map = $('<div>', {
    class: 'map'
  });
  let tiles = createElements();
  for (let tile in tiles) {
    //console.log(tiles[tile]);
    $(map).append(tiles[tile]);
  }
  $('body').append(map);

}

function createElements() {
  let tilesArray = [];
  for (let rows in gameData) {
    $(map).css('width', gameData[rows].length * 50)
    for (let cols in gameData[rows]) {
      if (gameData[rows][cols] == walls) {
        let tile = $('<div>', {
          class: 'tile'
        });
        $(tile).addClass('wall');
        tilesArray.push(tile);
      }
      if (gameData[rows][cols] == coins) {
        let tile = $('<div>', {
          class: 'tile',
          id:rows+'_'+cols,
        });
        $(tile).addClass('coins');
        tilesArray.push(tile);
      }
      if (gameData[rows][cols] == pacman) {
        let tile = $('<div>', {
          class: 'tile'
        });
        $(tile).addClass('pacman');
        tilesArray.push(tile);
      }
      if (gameData[rows][cols] == ground) {
        let tile = $('<div>', {
          class: 'tile'
        });
        $(tile).addClass('ground');
        tilesArray.push(tile);
      }
    }
  }
  return tilesArray;
}

function addEvents() {
  $('body').keydown(function(e) {
    if (e.keyCode == 38) {
      moveUp();
    }
    if (e.keyCode == 39) {
      moveRight();
    }
    if (e.keyCode == 37) {
      moveLeft();
    }
    if (e.keyCode == 40) {
      moveDown();
    }
  })
}

function moveUp() {
  if ((gameData[pacmanObj.x - 1][pacmanObj.y] == coins) || (gameData[pacmanObj.x - 1][pacmanObj.y] == ground)) {
    window.cancelAnimationFrame(requestId);
    requestId = window.requestAnimationFrame(moveUp);
    now = Date.now();
    delta = now - then;

    if (delta > interval) {
      gameData[pacmanObj.x - 1][pacmanObj.y] = pacman;
      gameData[pacmanObj.x][pacmanObj.y] = ground;
      clearMap(pacmanObj.x - 1,pacmanObj.y);
      main();
      $('.pacman').css("transform", "rotate(-90deg)")
      pacmanObj.x = pacmanObj.x - 1;
      then = now - (delta % interval);
    }
  }
}

function moveDown() {
  if ((gameData[pacmanObj.x + 1][pacmanObj.y] == coins) || (gameData[pacmanObj.x + 1][pacmanObj.y] == ground)) {
    window.cancelAnimationFrame(requestId);
    requestId = window.requestAnimationFrame(moveDown);
    now = Date.now();
    delta = now - then;

    if (delta > interval) {
      gameData[pacmanObj.x + 1][pacmanObj.y] = pacman;
      gameData[pacmanObj.x][pacmanObj.y] = ground;
      clearMap(pacmanObj.x + 1,pacmanObj.y);
      main();
      $('.pacman').css("transform", "rotate(90deg)")
      pacmanObj.x = pacmanObj.x + 1;
      then = now - (delta % interval);
    }
  }
}

function moveLeft() {
  if ((gameData[pacmanObj.x][pacmanObj.y - 1] == coins) || (gameData[pacmanObj.x][pacmanObj.y - 1] == ground)) {
    window.cancelAnimationFrame(requestId);
    requestId = window.requestAnimationFrame(moveLeft);
    now = Date.now();
    delta = now - then;

    if (delta > interval) {
      gameData[pacmanObj.x][pacmanObj.y - 1] = pacman;
      gameData[pacmanObj.x][pacmanObj.y] = ground;
      clearMap();
      main();
      $('.pacman').css("transform", "rotate(180deg)")
      pacmanObj.y = pacmanObj.y - 1;
      then = now - (delta % interval);
    }
  }
}

function moveRight() {

  if ((gameData[pacmanObj.x][pacmanObj.y + 1] == coins) || (gameData[pacmanObj.x][pacmanObj.y + 1] == ground)) {
    window.cancelAnimationFrame(requestId);
    requestId = window.requestId = requestAnimationFrame(moveRight);
    now = Date.now();
    delta = now - then;

    if (delta > interval) {
      gameData[pacmanObj.x][pacmanObj.y + 1] = pacman;
      gameData[pacmanObj.x][pacmanObj.y] = ground;
      interval
      clearMap();
      main();
      pacmanObj.y = pacmanObj.y + 1;
      $('.pacman').css("transform", "rotate(0deg)")
      then = now - (delta % interval);
    }
  }
}

function clearMap(x,y) {
  console.log($('#'+x+'_'+y),"coins",x,y);
  $('.map').remove();
}
window.onload = function() {

  main();
  addEvents();
  //console.log("helooooo");
}
