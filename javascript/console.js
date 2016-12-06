var gameConsole = {
	addLog: function (string) {
		var consoleDiv = document.getElementById("console");
		var p = document.createElement("p");
		p.innerHTML = string;
		consoleDiv.appendChild(p);
		consoleDiv.scrollTop = consoleDiv.scrollHeight;
	}
}