var interface = {
	updateProgress: function (progress) {
		if (progress > 100) {
			progress = 100;
		}
		document.getElementById("textbox").getElementsByClassName("progress")[0].style.width = progress + "%";
		document.getElementById("text-progress").children[0].innerHTML = Math.round(progress) + "%";
	},
	changeDescription: function (string) {
		document.getElementById("textbox").children[0].innerHTML = string;
	},
	changeProgressText: function (string) {
		document.getElementById("text-progress").children[0].innerHTML = string;
	},
	updateLife: function () {
		document.getElementById("life").getElementsByClassName("progress")[0].style.width = (character.life * 100 / character.maxLife) + "%";
		document.getElementById("life").children[0].innerHTML = character.life + "/" + character.maxLife;
	},
	updateXp: function () {
		document.getElementById("xp").getElementsByClassName("progress")[0].style.width = (character.xp * 100 / character.maxXp) + "%";
		document.getElementById("xp").children[0].innerHTML = character.xp + "/" + character.maxXp;
	},
	updateAttack: function () {
		document.getElementById("attack").innerHTML = character.attack;
	},
	updateLevel: function () {
		document.getElementById("level").innerHTML = character.level;
	},
	updateCoins: function () {
		document.getElementById("coins").innerHTML = character.coins;
	},
	updateCharacter: function () {
		this.updateLife();
		this.updateXp();
		this.updateAttack();
		this.updateLevel();
		this.updateCoins();
	},
	updateMonster: function (monster) {
		document.getElementById("monster-name").innerHTML = monster.name;
		this.updateMonsterLife(monster);
		document.getElementById("monster-attack").innerHTML = monster.attack;
		document.getElementById("monster-info").style.background = "white";
		document.getElementById("monster-info").getElementsByTagName('div')[0].style.visibility = "visible";
		document.getElementById("monster-info").getElementsByTagName('div')[1].style.visibility = "visible";
		document.getElementById("monster-info").getElementsByTagName('div')[2].style.visibility = "visible";
		document.getElementById("monster-info").getElementsByTagName('div')[3].style.visibility = "visible";
	},
	hideMonster: function (monster) {
		document.getElementById("monster-info").style.background = 'rgba(' + 0 + ',' + 0 + ',' + 0 + ',' + 0.8 + ')';
		document.getElementById("monster-info").getElementsByTagName('div')[0].style.visibility = "hidden";
		document.getElementById("monster-info").getElementsByTagName('div')[1].style.visibility = "hidden";
		document.getElementById("monster-info").getElementsByTagName('div')[2].style.visibility = "hidden";
		document.getElementById("monster-info").getElementsByTagName('div')[3].style.visibility = "hidden";
	},
	updateMonsterLife: function (monster) {
		document.getElementById("monster-life").getElementsByClassName("progress")[0].style.width = (monster.life * 100 / monster.maxLife) + "%";
		document.getElementById("monster-life").children[0].innerHTML = monster.life + "/" + monster.maxLife;
	},
	changeInventoryMenu: function (menu) {
		document.getElementById("inventoryTable").style.display = "none";
		document.getElementById("equipmentTable").style.display = "none";
		document.getElementById("inventory").getElementsByTagName('a')[0].className = "desactivated";
		document.getElementById("equipment").getElementsByTagName('a')[0].className = "desactivated";
		
		document.getElementById(menu).getElementsByTagName('a')[0].className = "activated";
		document.getElementById(menu+"Table").style.display = "table";
	},
	showMenu: function (onglet) {
		var menus = document.getElementsByClassName("menu");
		for (var i = 0; i < menus.length; i++) {
			menus[i].className = "menu invisible";
		};

		var menuId = onglet.innerHTML.toLowerCase()
		document.getElementById(menuId).className = "menu";

		var onglets = document.getElementById("menus").getElementsByTagName("a");
		for (var i = 0; i < menus.length; i++) {
			onglets[i].className = "";
		};
		onglet.className = "activated";
	},
	addObject: function (object) {
		var objectId = "object_" + object.id;
		if(!document.getElementById(objectId)) {
			var table = document.getElementById("inventoryTable");
			var row = table.insertRow(0);
			row.id = objectId;
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var li = document.createElement("li");
			li.innerHTML = object.name;
			cell1.appendChild(li);
			cell2.value = "1";
			cell2.innerHTML = cell2.value;
		}
		else {
			row = document.getElementById(objectId);
			var number = row.getElementsByTagName("td")[1];
			number.value++;
			number.innerHTML = number.value;
		}
	},
	equip: function (object) {
		document.getElementById("equipment-"+object.type).innerHTML = object.name;
	}
}