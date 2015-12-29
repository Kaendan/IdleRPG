var character = {
	state: "fine",
	location: null,
	level: 1,
	rawMaxLife: 20,
	maxLife: 20,
	life: 20,
	armorLife: 0,
	maxXp: 15,
	xp: 0,
	rawAttack: 3,
	attack: 3,
	armorAttack: 0,
	regeneration: 3,
	coins: 0,
	inventory: [],
	equipment: {"head": {"name": "none", "life": 0}, "chest": {"name": "none", "life": 0}, "legs": {"name": "none", "life": 0}, "weapon": {"name": "none", "attack": 0}},
	hit: function (monster) {
		monster.loseLife(this.attack);
	},
	loseLife: function (i) {
		if(this.life - i > 0) {
			this.life -= i;
			interface.updateLife();
		}
		else {
			this.life = 0;
			interface.updateLife();
			this.die();
		}
	},
	heal: function (i) {
		if(this.life + i < this.maxLife) {
			this.life += i;
		}
		else {
			this.life = this.maxLife;
		}
		interface.updateLife();
	},
	die: function () {
		clearInterval(interval);
		character.state = "dead";
		gameConsole.addLog("you passed out.");
		time = setTimeout(function(){
			interface.hideMonster();
			character.regenerate();
		}, 1000);
	},
	regenerate: function () {
		clearInterval(interval);
		interface.hideMonster();
		
		interface.updateProgress(0);
		gameConsole.addLog("someone brings you to the hospital.");
		interface.changeDescription("Healing in an hospital.")

		var progress = 0;
		var nb = Math.ceil(character.maxLife / character.regeneration);
		var heal = (character.regeneration / 20) * 100 / (nb * character.regeneration);

		interval = setInterval(function() {
			if((progress % 20 == 0) && (progress != 0)) {
				character.heal(character.regeneration);
			}
			
			character.life * 100 / character.maxLife;
			interface.updateProgress(progress * heal);
			progress++;

			if (character.life >= character.maxLife) {
				gameConsole.addLog("you feel better.");
				character.state = "fine";
				clearInterval(interval);
				time = setTimeout(function(){
					train(character.location);
				}, 1000);
			}
		}, 50)
	},
	gainXp: function (xp) {
		if((this.xp + xp) < this.maxXp) {
			this.xp += xp;
		}
		else {
			this.xp = (this.xp + xp) - this.maxXp;
			this.levelUp();
		}
		interface.updateXp();
	},
	levelUp: function () {
		this.level++;
		this.maxXp = Math.round(this.maxXp * 1.25);
		this.rawMaxLife = Math.round(this.rawMaxLife * 1.25);
		this.maxLife = this.rawMaxLife + this.armorLife;
		this.life = this.maxLife;
		this.rawAttack = Math.round(this.rawAttack * 1.25);
		this.attack = this.rawAttack + this.armorAttack;
		gameConsole.addLog("you gained a level.");
		interface.updateLevel();
		interface.updateLife();
		interface.updateAttack();
	},
	gainCoins: function (coins) {
		this.coins += coins;
		interface.updateCoins();
	},
	loot: function (monster) {
		if(monster.inventory.length > 0) {
			for (var i = monster.inventory.length - 1; i >= 0; i--) {
				var rand = Math.floor((Math.random() * 100) + 1);
				var object = data.objects[monster.inventory[i]];
				if(rand <= object.rate) {															
					if (object.type == 'weapon' && this.equipment.weapon.attack < object.attack) {
						if (this.equipment.weapon.name != "none") {
							this.inventory.push(this.equipment.weapon);
							interface.addObject(this.equipment.weapon);
							this.armorAttack -= this.equipment.weapon.attack;
						}					
						this.equipment.weapon = object;
						interface.equip(object);
						this.armorAttack += object.attack;
						this.attack = this.rawAttack + this.armorAttack;
						interface.updateAttack();
					}
					else if (object.type == 'head' && this.equipment.head.life < object.life) {
						if (this.equipment.head.name != "none") {
							this.inventory.push(this.equipment.head);
							interface.addObject(this.equipment.head);
							this.armorLife -= this.equipment.head.life;
						}										
						this.equipment.head = object;
						interface.equip(object);
						this.armorLife += object.life;
						this.maxLife = this.rawMaxLife + this.armorLife;
						interface.updateLife();
					}
					else if (object.type == 'chest' && this.equipment.chest.life < object.life) {
						if (this.equipment.chest.name != "none") {
							this.inventory.push(this.equipment.chest);
							interface.addObject(this.equipment.chest);
							this.armorLife -= this.equipment.chest.life;
						}						
						this.equipment.chest = object;
						interface.equip(object);
						this.armorLife += object.life;
						this.maxLife = this.rawMaxLife + this.armorLife;
						interface.updateLife();
					}
					else if (object.type == 'legs' && this.equipment.legs.life < object.life) {
						if (this.equipment.legs.name != "none") {
							this.inventory.push(this.equipment.legs);
							interface.addObject(this.equipment.legs);
							this.armorLife -= this.equipment.legs.life;
						}						
						this.equipment.legs = object;
						interface.equip(object);
						this.armorLife += object.life;
						this.maxLife = this.rawMaxLife + this.armorLife;
						interface.updateLife();
					}
					else {						
						this.inventory.push(object);
						interface.addObject(object);
					};
				}
			};
		}
	}

};