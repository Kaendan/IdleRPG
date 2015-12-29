var inventory = {
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
	}
}