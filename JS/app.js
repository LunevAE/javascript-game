const PATH        = 'pp',
      WALL        = 'w',
      PLAYER      = 'p',
      COIN        = 'c',
      CLOSED_DOOR = '^',
      OPENED_DOOR = "x",
      MONSTER     = 'm',
      LEFT        = 37,
      UP          = 38,
      RIGHT       = 39,
      DOWN        = 40,
      COIN_AMOUNT = 5,
      INTERVAL_TIME = 1000/10;

const SPRITES_LOCATION = 'images/sprites.png';

let interval;

let userActions = {
  key: ''
}

let player = {
  x: 11,
  y: 1
}

let map = [
    ["w","w","w","w","w","w","w","w","w","w","^","w","w"],
    ["w","c","c","c","w","w","w","w","w","c","c","p","w"],
    ["w","c","c","c","c","c","c","c","c","c","c","c","w"],
    ["w","w","w","w","c","c","w","w","w","w","w","c","w"],
    ["w","w","c","c","c","c","c","w","c","c","c","c","w"],
    ["w","c","c","c","c","c","c","w","c","w","w","c","w"],
    ["w","c","w","w","w","w","w","w","c","w","w","c","w"],
    ["w","m","w","c","c","c","c","c","c","c","c","c","w"],
    ["w","w","w","w","w","w","w","w","w","w","w","w","w"]
  ]

function findDoor(map) {
  let foundX;
  let foundY;
  for (let x = 0; x < map.length; ++x){
    for (let y = 0; y < map[x].length; ++y){
      if (map[x][y] === '^'){
        foundX = x;
        foundY = y;
        return {
          x: foundX,
          y: foundY
        }
      }
    }
  }
}

let door = findDoor(map);

let gameData = {
  map: map,
  player: player,
  userActions: userActions,
  coinCnt: 0
}

let canvas = document.getElementById("canvas"),
ctx = canvas.getContext('2d');
let pic = new Image();
pic.src    = SPRITES_LOCATION;

let cellSize = 50;

function drawWorld(){
  ctx.fillStyle = 'white';
  ctx.clearRect(0, 0, canvas.width, canvas.height); 

  for (let y = 0; y < map.length; ++y){
    for (let x = 0; x < map[y].length; ++x){
      if (map[y][x] === WALL) {
        ctx.drawImage(pic, 0, 0, 50, 50, x * cellSize, y * cellSize, cellSize, cellSize);
      } 
      else if (map[y][x] === PLAYER){
        ctx.drawImage(pic, 100, 0, 50, 50, x * cellSize, y * cellSize, cellSize, cellSize);
      } 
      else if (map[y][x] === COIN){
        ctx.drawImage(pic, 50, 0, 50, 50, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (map[y][x] === CLOSED_DOOR){
          ctx.drawImage(pic, 150, 0, 50, 50, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (map[y][x] === OPENED_DOOR){
        ctx.drawImage(pic, 200, 0, 50, 50, x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
    ctx.fillStyle = 'red';
    ctx.font = "20px serif";
    ctx.fillText("Score: " + gameData.coinCnt, 10, 25);
  }
  requestAnimationFrame(drawWorld);
}

function checkIfCanGo(x, y, vx, vy) {
  if (map[y + vy][x + vx] !== WALL && map[y + vy][x + vx] !== CLOSED_DOOR){
      return true;
  }
  return false;
}

function movePlayer (){
  if (userActions.key === LEFT){
    if (checkIfCanGo(player.x, player.y, -1, 0)){
      map[player.y][player.x] = PATH;
      player.x = player.x - 1;
    }
  } 
  else if (userActions.key === UP){
    if (checkIfCanGo(player.x, player.y, 0, -1)){
        map[player.y][player.x] = PATH;
        player.y = player.y - 1;
    }
  } 
  else if (userActions.key === RIGHT){
    if (checkIfCanGo(player.x, player.y, 1, 0)){
      map[player.y][player.x] = PATH;
      player.x = player.x + 1;
    }
  } 
  else if (userActions.key === DOWN){
    if (checkIfCanGo(player.x, player.y, 0, 1)){
      map[player.y][player.x] = PATH;
      player.y = player.y + 1;
    }
    }
  if (map[player.y][player.x] == COIN){
    gameData.coinCnt++;
    if (gameData.coinCnt === COIN_AMOUNT){
      map[door.x][door.y] = OPENED_DOOR;
    }
  }

  map[player.y][player.x] = PLAYER;
  userActions.key = '';
}

function gameCycle(){
  movePlayer();
  //moveMonsters()
}

pic.onload = function (){
  drawWorld();
}

document.addEventListener("keydown", (event) => {
  userActions.key = event.keyCode;
})

interval = setInterval(gameCycle, INTERVAL_TIME);
