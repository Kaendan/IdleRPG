function Monster(monster) {
	this.name = monster.name;
	this.maxLife = monster.life;
	this.life = monster.life;
	this.attack = monster.attack;
	this.xp  = monster.xp;
	this.coins = monster.coins;
	this.inventory = monster.inventory;

	this.loseLife = function (i) {
		if(this.life - i > 0) {
			this.life -= i;
			interface.updateMonsterLife(this);
		}
		else {
			this.life = 0;
			interface.updateMonsterLife(this);
			this.die();
		}
	};

	this.heal = function (i) {
		if(this.life + i < this.maxLife) {
			this.life += i;
		}
		else {
			this.life = this.maxLife;
		}
	};
	
	this.die = function () {
		gameConsole.addLog("the "+this.name+" died.");
	};

	this.hit = function (character) {
		character.loseLife(this.attack);
	}
};