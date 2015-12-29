var interval = null;
var time = null;

function loadJSON(file) {   
  var request = new XMLHttpRequest();
  request.open('GET', file, false);
  request.send();  
  return data = JSON.parse(request.responseText);
}

var data = loadJSON('data/data.json');

for (var i in data.worlds[0].zones) {
  var li = document.createElement("li");
  li.innerHTML = data.worlds[0].zones[i].name;
  li.value = i;

  li.onclick = function() {
    if(character.life > 0 && character.state != "dead") {
      train(this.value);
    }
    else {
      gameConsole.addLog("you're unconscious.");
    }
  };

  document.getElementById("zones").appendChild(li);
};

//Faire un for each onglet (navigation.a ou li)
document.getElementById("inventory").onclick = function() {
  interface.changeInventoryMenu("inventory");
};
document.getElementById("equipment").onclick = function() {
  interface.changeInventoryMenu("equipment");
};

interface.updateCharacter();

function train(zoneId) {
  clearInterval(interval);
  clearTimeout(time);
  interface.hideMonster();

  character.location = zoneId;
  character.heal(character.maxLife);

  var zone = data.worlds[0].zones[zoneId];

  rate = 0;
  for (var i = zone.monsters.length - 1; i >= 0; i--) {
    rate += zone.monsters[i].rate;
  };
  var rand = Math.floor((Math.random() * rate) + 1);
  var monsterId;
  for (var i = zone.monsters.length - 1; i >= 0 && rand > 0; i--) {
    monsterId = i;
    rand -= zone.monsters[i].rate;
  };
  var monster = new Monster(zone.monsters[monsterId]);

  gameConsole.addLog("you're training in the "+zone.name.toLowerCase()+".");
  interface.updateProgress(0);
  interface.changeDescription("Looking for enemies.");
  interface.changeProgressText("");
  
  var progress = 0;
  var nb = Math.floor((Math.random() * 3));
  nb *= 4;
  var cpt = 1;
  var message = "";

  interval = setInterval(function() {
    message = message + ".";

    if (cpt > 3) {
      cpt = 0;
      message = "";
    };

    interface.changeProgressText(message);
    progress++;
    cpt++;
    if (progress >= nb) {
      clearInterval(interval);
      fight(monster);
    };
  }, 1000, monster);
}

function fight(monster) {
  clearTimeout(time);
  clearInterval(interval);
  gameConsole.addLog("a "+monster.name+" attacks.");
  interface.updateMonster(monster);
  interface.changeDescription("Fighting a "+monster.name+".");
  interface.updateProgress(0);

  var progress = 0;
  var nb = Math.ceil(monster.maxLife / character.attack);
  var attack = (character.attack / 20) * 100 / (nb * character.attack);

  interval = setInterval(function() {
    if((progress % 20 == 0) && (progress != 0)) {
      character.hit(monster);
      monster.hit(character);
    }

    interface.updateProgress(progress * attack);
    progress++;

    if (monster.life <= 0 && character.life > 0) {
      character.gainXp(monster.xp);
      character.gainCoins(monster.coins);
      character.loot(monster);
      progress = 0;
      clearInterval(interval);
      setTimeout(function(){
        train(character.location);
      }, 1000, attack);
    }
    else if (character.life <= 0) {
      clearInterval(interval);
    }
  }, 50);
}