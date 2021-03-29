function GameData (map, monster, player, door, level){
	this.map = map;
	this.player = new Player(player.x, player.y);
  	this.monster = new Monster(monster.x, monster.y);
  	this.door = door;
  	this.coinCnt = 0;
  	this.lvl = level;
  	this.cellSize = 50;
  	this.key = 0;
  	this.interval = '';
  	this.setInterval = function(interval) {
  		this.interval = interval;
  	} 
  	this.updateActions = function (key) {
    	this.key = key;
  	}
}
