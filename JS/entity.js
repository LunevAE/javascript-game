function Entity(x, y) {
	this.x = x;
	this.y = y;
	this.checkIfCanGo = function(map, vx, vy) {
		return  map[this.y + vy][this.x + vx] !== WALL && 
				map[this.y + vy][this.x + vx] !== CLOSED_DOOR;
	}
}