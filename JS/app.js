function randomInteger(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


let app = {
    data: UNINITIALIZATED,
    canvas: document.getElementById("canvas"),
    outerCanvas: document.getElementById("outerCanvas"),
	ctx: UNINITIALIZATED,
	outerCtx: UNINITIALIZATED,
	pic: new Image(),
	menu: UNINITIALIZATED,
    initApp: function () {
		canvas.width = 100 * 13;
		canvas.height = 100 * 9;
		outerCanvas.width = window.innerWidth;
		outerCanvas.height = window.innerHeight;

		window.onresize = function() {
			outerCanvas.width = window.innerWidth;
			outerCanvas.height = window.innerHeight;
		}
		
    	app.ctx = app.canvas.getContext('2d');
    	app.outerCtx = app.outerCanvas.getContext('2d');
    	app.pic.src = SPRITES_LOCATION;
    	let loadedData = app.load(1);
    	app.data = new GameData(loadedData.map, loadedData.monster, loadedData.player, loadedData.door, 1); 
    	app.pic.onload = function (){
		  app.drawWorld();
		}
		document.addEventListener("keydown", (event) => {
          app.data.updateActions(event.keyCode);
      	})
		let f = true;
      	document.getElementById("pause").addEventListener('click', function() {

      		if (f) {
      			app.gamePause();
      		} else {
      			app.removePause();
      		}
      		f = !f;
      		
      	})
      	app.data.setInterval(setInterval(app.gameCycle, INTERVAL_TIME));
      	app.menu = new Menu(app, "Menu", "Play");
      	app.defeat = new endGameWindow(app, "Game over", "You lose");
      	app.victory = new endGameWindow(app, "Congratulations", "You won!!!");
      	app.nextLevel = new nextLevelWindow(app, "Level completed!", "Next level");
      	app.menu.show();
    },
	load: function (level){
	    let xhr = new XMLHttpRequest();
	    xhr.open('GET', LEVEL_DESTINATION_PATH + level + '.json', false);
	    xhr.send();
	    return JSON.parse(xhr.responseText);
	},
    updateLevel: function (level) {
    	let loadedData = app.load(level);
    	app.data = new GameData(loadedData.map, loadedData.monster, loadedData.player, loadedData.door, level); 
    	app.data.setInterval(setInterval(app.gameCycle, INTERVAL_TIME));
    }, 
    drawWorld: function () {
    	let ctx = app.ctx;
    	let pic = app.pic;
    	let map = app.data.map;
    	let monster = app.data.monster;
    	let cellSize = app.data.cellSize;
    	ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, canvas.width, canvas.height); 
		let cellSizeX = 100;
		let cellSizeY = 100;

		for (let y = 0; y < map.length; ++y){
			for (let x = 0; x < map[y].length; ++x){
				if (map[y][x] === WALL) {
					ctx.drawImage(pic, 0, 0, 100, 100, x * cellSizeX, y * cellSizeY, cellSizeX, cellSizeY);
		        }
		        else if (map[y][x] === PLAYER){
		        	ctx.drawImage(pic, 200, 0, 100, 100, x * cellSizeX, y * cellSizeY, cellSizeX, cellSizeY);
		      	}
			    else if (map[y][x] === COIN){
			        ctx.drawImage(pic, 100, 0, 100, 100, x * cellSizeX, y * cellSizeY, cellSizeX, cellSizeY);
			    }
			    else if (map[y][x] === CLOSED_DOOR){
			        ctx.drawImage(pic, 300, 0, 100, 100, x * cellSizeX, y * cellSizeY, cellSizeX, cellSizeY);
			    }
			    else if (map[y][x] === OPENED_DOOR){
			        ctx.drawImage(pic, 400, 0, 100, 100, x * cellSizeX, y * cellSizeY, cellSizeX, cellSizeY);
			    }
		    }
		    ctx.fillStyle = 'red';
		    ctx.font = "50px serif";
		    ctx.fillText("Score: " + app.data.coinCnt, 50, 75);
		  }

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
	  app.movePlayer();
	  app.moveMonsters();
	},
	gamePause: function() {
		clearInterval(app.data.interval);
	},
	removePause: function() {
		app.data.setInterval(setInterval(app.gameCycle, INTERVAL_TIME));
	}
}

app.initApp();
