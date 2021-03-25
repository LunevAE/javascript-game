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
  let player = {
    x: 11,
    y: 1
  }

  let map = [
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

  let gameData = {
    map: map,
    player: player,
    userActions: userActions,
    coinCnt: 0
  }

  let canvas = document.getElementById("canvas"),
  ctx = canvas.getContext('2d');
  let pic = new Image();
  pic.src    = 'sprites.png';

  let el = document.getElementById('world');
  let cellSize = 50;

  function drawWorld(){
    el.innerHTML = '';
    ctx.fillStyle = 'white';
    ctx.clearRect(0, 0, canvas.width, canvas.height); //очистка

    for(let y = 0; y < map.length; ++y) {
      for(let x = 0; x < map[y].length; ++x) {
        if (map[y][x] === WALL) {
          ctx.drawImage(pic, 0, 0, 50, 50, x * cellSize, y * cellSize, cellSize, cellSize);
        }
        else if (map[y][x] === PLAYER) {
          ctx.drawImage(pic, 100, 0, 50, 50, x * cellSize, y * cellSize, cellSize, cellSize);
        }
        else if (map[y][x] === COIN) {
          ctx.drawImage(pic, 50, 0, 50, 50, x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
      ctx.fillStyle = 'red';
      ctx.font = "20px serif";
      ctx.fillText("Score: " + gameData.coinCnt, 10, 25);
    }
    requestAnimationFrame(drawWorld);
  }

  pic.onload = function () {
    drawWorld();
  }
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
    if (map[player.y][player.x] == COIN) {
      gameData.coinCnt++;
      if (gameData.coinCnt === COIN_AMOUNT) {
        map[0][10] = PATH;
      }
    }
    map[player.y][player.x] = PLAYER;
    userActions.key = '';
  }

document.addEventListener("keydown", (event) => {
  userActions.key = event.keyCode;
})
