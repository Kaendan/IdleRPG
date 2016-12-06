function loadJSON(file) {   
  var request = new XMLHttpRequest();
  request.open('GET', file, false);
  request.send();  
  return data = JSON.parse(request.responseText);
};

function clear(node) {
	while (node.lastChild) {
    	node.removeChild(node.lastChild);
    }
};

function loadZones(worldID) {
	var node = document.getElementById("training").getElementsByTagName("ul")[0];
	clear(node);
	for (var i in data.worlds[worldID].zones) {
	  var li = document.createElement("li");
	  li.innerHTML = data.worlds[worldID].zones[i].name;
	  li.value = i;

	  li.onclick = function() {
	  	interface.select(this, "training");
	    character.tryToTrain(this.value);
	  };

	  node.appendChild(li);
	};	
};

function loadQuests(worldID) {
	var node = document.getElementById("quests").getElementsByTagName("ul")[0];
	clear(node);
	for (var i in data.worlds[worldID].quests) {
	  var li = document.createElement("li");
	  li.innerHTML = data.worlds[worldID].quests[i].name;
	  li.value = i;

	  li.onclick = function() {
	  	//displayQuestDetails(this.value);
	  };
	  node.appendChild(li);
	};
};

function loadShop(worldID) {
	var node = document.getElementById("shop").getElementsByTagName("ul")[0];
	//clear(node);
	for (var i in data.worlds[worldID].shop) {
	  var li = document.createElement("li");
	  li.innerHTML = data.objects[data.worlds[worldID].shop[i]
	  ].name;
	  li.value = i;

	  li.onclick = function() { // message de confirmation
	  	var object = data.objects[data.worlds[worldID].shop[this.value]];
	  	character.pay(object.value); // négatif
	  	character.gainObject(object);
	  };

	  node.appendChild(li);
	};
};

function loadWorlds() {
	for (var i in data.worlds) {
	  var li = document.createElement("li");
	  li.innerHTML = data.worlds[i].name;
	  li.value = i;

	  li.onclick = function() {
	  	interface.select(this, "worlds");
	  	console.log(this);
	  	loadWorld(this.value);
	  };

	  document.getElementById("worlds").getElementsByTagName("ul")[0].appendChild(li);
	};	
};

function loadWorld(worldID) {
	loadZones(worldID);
	loadQuests(worldID);
	loadShop(worldID);
}

function loadData() {
	loadWorlds();
	loadWorld(0);
}