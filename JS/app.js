function randomInteger(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


let app = {
    data: UNINITIALIZATED,
    canvas: document.getElementById("canvas"),
	ctx: UNINITIALIZATED,
	pic: new Image(),
	menu: UNINITIALIZATED,
    initApp: function () {
    	app.ctx = app.canvas.getContext('2d');
    	app.pic.src = SPRITES_LOCATION;
    	let loadedData = app.load(1);
    	app.data = new GameData(loadedData.map, loadedData.monster, loadedData.player, loadedData.door, 1); 
    	app.pic.onload = function (){
		  app.drawWorld();
		}
		document.addEventListener("keydown", (event) => {
          app.data.updateActions(event.keyCode);
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
		ctx.clearRect(0, 0, canvas.width, canvas.height); 

		for (let y = 0; y < map.length; ++y){
			for (let x = 0; x < map[y].length; ++x){
				if (map[y][x] === WALL) {
					ctx.drawImage(pic, 0, 0, 50, 50, x * cellSize, y * cellSize, cellSize, cellSize);
		        }
		        else if (map[y][x] === PATH){
		        }
		        else if (map[y][x] === PLAYER){
		        	ctx.drawImage(pic, 100, 0, 50, 50, x * cellSize, y * cellSize, cellSize, cellSize);
		      	}
			    else if (map[y][x] === COIN){
			        ctx.drawImage(pic, 50, 0, 50, 50, x * cellSize, y * cellSize, app.data.cellSize, cellSize);
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
		    ctx.fillText("Score: " + app.data.coinCnt, 10, 25);
		  }
		  ctx.drawImage(pic, 250, 0, 50, 50, monster.x * cellSize, monster.y * cellSize, cellSize, cellSize);
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
	}
}

app.initApp();
