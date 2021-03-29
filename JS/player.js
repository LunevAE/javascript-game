function Player(x, y) {
	this.__proto__ = new Entity(x, y)
	this.move = function (gameData){
		if (gameData.key === LEFT){
			if (this.checkIfCanGo(gameData.map, -1, 0)){
				gameData.map[this.y][this.x] = PATH;
	    		this.x = this.x - 1;
	    	}
	    } else if (gameData.key === UP){
	    	if (this.checkIfCanGo(gameData.map, 0, -1)){
	    		gameData.map[this.y][this.x] = PATH;
	    		this.y = this.y - 1;
	    	}
	    } else if (gameData.key === RIGHT){
	    	if (this.checkIfCanGo(gameData.map, 1, 0)){
	    		gameData.map[this.y][this.x] = PATH;
	    		this.x = this.x + 1;
	    	}
	    } else if (gameData.key === DOWN){
	    	if (this.checkIfCanGo(gameData.map, 0, 1)){
	    		gameData.map[this.y][this.x] = PATH;
	    		this.y = this.y + 1;
	    	}
	  	}
	  	if (gameData.map[this.y][this.x] == COIN){
	  		gameData.coinCnt++;
	  		if (gameData.coinCnt === COIN_AMOUNT){
	  			gameData.map[gameData.door.y][gameData.door.x] = OPENED_DOOR;
	  		}
	  	}
	  	if (this.y === gameData.monster.y && this.x === gameData.monster.x){
	  		app.defeat.show();
	  	}
	  	gameData.map[this.y][this.x] = PLAYER;
	  	if (this.x === gameData.door.x && this.y === gameData.door.y){
	  		if (gameData.lvl < LVL_AMOUNT){
	  			app.nextLevel.show();
	  		}
	  		else {
	  			app.victory.show();
	  		}
	  	}
	  	gameData.key = 0;
	}
}