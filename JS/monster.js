function Monster(x, y) {
	this.__proto__ = new Entity(x, y)
	this.move = function (gameData){
		let p = randomInteger(1, 100);
		if (p < 40){
			let monsterPath = this.leeAlgo(gameData);
			let px = monsterPath[0];
			let py = monsterPath[1];
			for (let i = 0; i < 2; ++i){
				this.x = px[i];
				this.y = py[i];
			}
		}
		else {
			this.randMove(gameData);
		}

	}
	this.leeAlgo = function (gameData){
		let mm = gameData.map.map(function (item) {
			return [...item]
		})

		let dx = [1, 0, -1, 0];
  		let dy = [0, 1, 0, -1];
  		let stop;
  		let x, y, k;
  		let px = [];
  		let py = [];
		let d = 0;
		mm[this.y][this.x] = 0;

		do {
			stop = true;
			for (y = 0; y < mm.length; ++y){
				for (x = 0; x < mm[y].length; ++x){
					if (mm[y][x] == d){
         				 for (k = 0; k < 4; ++k ) {
             				let iy = y + dy[k];
             				let ix = x + dx[k];
             				if (iy >= 0 && ix >= 0  && (mm[iy][ix] == PATH || mm[iy][ix] == PLAYER || mm[iy][ix] == COIN)){
                				stop = false;
                				mm[iy][ix] = d + 1;
             				}
          				}
					}
				}
			}
			++d;
		} while (!stop && mm[gameData.player.y][gameData.player.x] == PLAYER);

	    x = gameData.player.x;
		y = gameData.player.y;
		d = mm[gameData.player.y][gameData.player.x];
		while ( d > 0 ){
			px[d] = x;
		    py[d] = y;
		    d--;
		    for (k = 0; k < 4; ++k){
		       let iy = y + dy[k];
		       let ix = x + dx[k];
		       if ( iy >= 0 && ix >= 0 && mm[iy][ix] == d){
		          x = x + dx[k];
		          y = y + dy[k];
		          break;
		      	}
		    }
		}
		px[0] = this.x;
		py[0] = this.y;

		let monsterPath = [px,py];
		return monsterPath;
	}

	this.randMove = function (gameData){
		let direction = randomInteger(LEFT, DOWN);
		if (direction === LEFT){
			if (this.checkIfCanGo(gameData.map, -1, 0) && gameData.map[this.y][this.x] != OPENED_DOOR){
				this.x = this.x - 1;
			}
		}
		else if (direction === UP){
			if (this.checkIfCanGo(gameData.map, 0, -1) && gameData.map[this.y][this.x] != OPENED_DOOR){
		    	this.y = this.y - 1;
		  	}
		}
		else if (direction === RIGHT){
		 	if (this.checkIfCanGo(gameData.map, 1, 0) && gameData.map[this.y][this.x] != OPENED_DOOR){
		    	this.x = this.x + 1;
		  	}
		}
		else if (direction === DOWN){
		  	if (this.checkIfCanGo(gameData.map, 0, 1) && gameData.map[this.y][this.x] != OPENED_DOOR){
		    	this.y = this.y + 1;
		  	}
		}
	}
}
