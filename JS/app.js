function randomInteger(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maxLen(map) {
  let max = 0;
  for (line of map) {
    if (line.length > max) {
      max = line.length;
    }
  }
  return max;
}

let app = {
    data: UNINITIALIZATED,
    canvas: document.getElementById("canvas"),
    outerCanvas: document.getElementById("outerCanvas"),
  	ctx: UNINITIALIZATED,
  	outerCtx: UNINITIALIZATED,
  	pic: new Image(),
  	menu: UNINITIALIZATED,
  	isPause: false,
  	timer: new Timer(),
    gameIsRunning: false,
    maxLen: 0,
    initApp: function () {
  		outerCanvas.width = window.innerWidth;
  		outerCanvas.height = window.innerHeight;

  		window.addEventListener('resize', function(event){
  			outerCanvas.width = window.innerWidth;
  			outerCanvas.height = window.innerHeight;
  		});

    	app.ctx = app.canvas.getContext('2d');
    	app.outerCtx = app.outerCanvas.getContext('2d');
    	app.pic.src = SPRITES_LOCATION;
    	let loadedData = app.load(1);
    	app.data = new GameData(loadedData.map, loadedData.monster, loadedData.player, loadedData.door, 1);
    	app.pic.onload = function (){
		      app.drawWorld();
		  }
		  document.addEventListener("keydown", (event) => {
          if(app.gameIsRunning && event.key === "Escape") {
             document.getElementById('pause').click();
          } else if (!app.timer.paused) {
             app.data.updateActions(event.keyCode);
          }
      })
    	document.getElementById("pause").addEventListener('click', function() {
    		app.pauseHandler();
    	})
    	app.data.setInterval(setInterval(app.gameCycle, INTERVAL_TIME));
    	app.menu = new Menu(app, "Menu", "Play");
    	app.defeat = new endGameWindow(app, "Game over", "You lose");
      app.pauseMenu = new PauseMenu(app, "Pause", "Resume");
    	app.victory = new endGameWindow(app, "Congratulations", "You won!!!");
    	app.nextLevel = new nextLevelWindow(app, "Level completed!", "Next level");
    	app.menu.show();
    },
    pauseHandler: function(){
  		if (app.isPause) {
  			app.removePause();
        app.pauseMenu.hide();
  		} else {
  			app.gamePause();
        app.pauseMenu.show();
  		}
  		app.isPause = !app.isPause;
    },
	load: function (level){
	    let xhr = new XMLHttpRequest();
	    xhr.open('GET', LEVEL_DESTINATION_PATH + level + '.json', false);
	    xhr.send();
	    let res = JSON.parse(xhr.responseText);
      app.maxLen = maxLen(res.map);
      return res;
	},
    updateLevel: function (level) {
    	let loadedData = app.load(level);
    	app.data = new GameData(loadedData.map, loadedData.monster, loadedData.player, loadedData.door, level);
      app.timer.restart();
      app.data.setInterval(setInterval(app.gameCycle, INTERVAL_TIME));
    },
    drawWorld: function () {
    	let ctx = app.ctx;
    	let pic = app.pic;
    	let map = app.data.map;
    	let monster = app.data.monster;
    	let cellSize = app.data.cellSize;
    	ctx.fillStyle = 'white';
      canvas.width = 100 * app.maxLen;
  		canvas.height = 100 * map.length;
		  ctx.fillRect(0, 0, canvas.width, canvas.height); 
		  let cellSizeX = 100;
		  let cellSizeY = 100;

		for (let y = 0; y < map.length; ++y){
			for (let x = 0; x < map[y].length; ++x){
				switch(map[y][x]){
					case WALL:
						ctx.drawImage(pic, 0, 0, 100, 100, x * cellSizeX, y * cellSizeY, cellSizeX, cellSizeY);
						break;
					case PLAYER:
						ctx.drawImage(pic, 200, 0, 100, 100, x * cellSizeX, y * cellSizeY, cellSizeX, cellSizeY);
						break;
					case COIN:
						ctx.drawImage(pic, 100, 0, 100, 100, x * cellSizeX, y * cellSizeY, cellSizeX, cellSizeY);
						break;
					case CLOSED_DOOR:
						ctx.drawImage(pic, 300, 0, 100, 100, x * cellSizeX, y * cellSizeY, cellSizeX, cellSizeY);
						break;
					case OPENED_DOOR:
						ctx.drawImage(pic, 400, 0, 100, 100, x * cellSizeX, y * cellSizeY, cellSizeX, cellSizeY);
						break;
          default:
            ctx.fillStyle = 'white';
            ctx.fillRect(x * cellSizeX, y * cellSizeY, cellSizeX, cellSizeY);
            break;
			  }
     }

   }

   ctx.fillStyle = 'red';
   ctx.font = "50px serif";
   ctx.fillText("Score: " + app.data.coinCnt, 50, 75);
   ctx.fillText("Time: " + app.timer.getTime(), 500, 75);

		  ctx.drawImage(pic, 500, 0, 100, 100, monster.x * cellSizeX, monster.y * cellSizeY, cellSizeX, cellSizeY);

 		  let k1 = outerCanvas.width / outerCanvas.height;
		  let k2 = outerCanvas.height / outerCanvas.width;

		  let newWidth =  outerCanvas.width;
		  let newHeight = outerCanvas.width /  canvas.width * canvas.height;

		  if (newHeight > outerCanvas.height) {
		  		newHeight = outerCanvas.height;
		  		newWidth = outerCanvas.height / canvas.height * canvas.width;
		  }

		  let dx = (outerCanvas.width - newWidth) / 2;
		  let dy = (outerCanvas.height - newHeight) / 2;

		  app.outerCtx.clearRect(0, 0, outerCanvas.width,  outerCanvas.height);
	      app.outerCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, dx, dy, newWidth, newHeight);

		  requestAnimationFrame(app.drawWorld);
    },
    movePlayer: function () {
    	app.data.player.move(app.data);
	},
	moveMonsters: function(){
		app.data.monster.move(app.data);
	},
	gameCycle: function(){
    app.gameIsRunning = true;
	  app.movePlayer();
    if (app.skip >= 3) {
      app.moveMonsters();
      app.skip = 0;
    }
	  ++app.skip
	},
  skip: 0,
	gamePause: function() {
    app.timer.pause();
		clearInterval(app.data.interval);
	},
	removePause: function() {
    app.timer.resume();
		app.data.setInterval(setInterval(app.gameCycle, INTERVAL_TIME));
	},
	levelFinish: function(status) {
    app.gamePause();
    app.gameIsRunning = false;
    switch (status) {
      case WIN_LEVEL:
        app.nextLevel.show()
        break;
      case WIN_GAME:
        app.victory.show()
        break;
      case DEFEAT_LEVEL:
        app.defeat.show()
        break;
    }
	}
}

app.initApp();
