const PATH        = 0,
        WALL        = 1,
        PLAYER      = 2,
        COIN        = 3,
        LEFT        = 37,
        UP          = 38,
        RIGHT       = 39,
        DOWN        = 40,
        COIN_AMOUNT = 5;

let userActions = {
  key: ''
}

let  player = {
    x: 11,
    y: 1
  }

let  map = [
      [1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,3,3,3,1,1,1,1,1,3,3,2,1],
      [1,3,3,3,3,3,3,3,3,3,3,3,1],
      [1,1,1,1,3,3,1,1,1,1,1,3,1],
      [1,1,3,3,3,3,3,1,3,3,3,3,1],
      [1,3,3,3,3,3,3,1,3,1,1,3,1],
      [1,3,1,1,1,1,1,1,3,1,1,3,1],
      [1,3,1,3,3,3,3,3,3,3,3,3,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]

let  gameData = {
    map: map,
    player: player,
    userActions: userActions
  }

let el = document.getElementById('world');

function drawWorld(){
  el.innerHTML = '';
  for(let y = 0; y < map.length; ++y) {
    for(let x = 0; x < map[y].length; ++x) {
      if (map[y][x] === WALL) {
        el.innerHTML += "<div class='wall'></div>";
      }
      else if (map[y][x] === PATH) {
        el.innerHTML += "<div class='path'></div>";
      }
      else if (map[y][x] === PLAYER) {
        el.innerHTML += "<div class='player'></div>";
      }
      else if (map[y][x] === COIN) {
        el.innerHTML += "<div class='coin'></div>";
      }
    }
    el.innerHTML += "<br>";
  }
}

drawWorld();
setInterval(drawWorld, 1000/60);
setInterval(gameCycle, 1000/60);
function gameCycle() {
  if (userActions.key === LEFT){
    if ( map[player.y][player.x - 1] !== WALL){
      map[player.y][player.x] = PATH;
      player.x = player.x - 1;
    }
  } else if (userActions.key === UP){
      if ( map[player.y-1][player.x] !== WALL){
        map[player.y][player.x] = PATH;
        player.y = player.y - 1;
      }
  } else if (userActions.key === RIGHT){
      if ( map[player.y][player.x+1] !== WALL){
        map[player.y][player.x] = PATH;
        player.x = player.x + 1;
      }
  } else if (userActions.key === DOWN){
      if ( map[player.y+1][player.x] !== WALL){
        map[player.y][player.x] = PATH;
        player.y = player.y + 1;
      }
  }
  map[player.y][player.x] = PLAYER;
  userActions.key = '';
}

document.addEventListener("keydown", (event) => {
userActions.key = event.keyCode;
})
