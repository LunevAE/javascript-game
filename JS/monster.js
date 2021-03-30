function Monster(x, y) {
	this.__proto__ = new Entity(x, y)
	this.move = function (gameData){
		let direction = randomInteger(LEFT, DOWN);
		if (direction === LEFT){
			if (this.checkIfCanGo(gameData.map, -1, 0)){
				this.x = this.x - 1;
			}
		}
		else if (direction === UP){
			if (this.checkIfCanGo(gameData.map, 0, -1)){
		    	this.y = this.y - 1;
		  	}
		}
		else if (direction === RIGHT){
		 	if (this.checkIfCanGo(gameData.map, 1, 0)){
		    	this.x = this.x + 1;
		  	}
		}
		else if (direction === DOWN){
		  	if (this.checkIfCanGo(gameData.map, 0, 1)){
		    	this.y = this.y + 1;
		  	}
		}
	}
}
