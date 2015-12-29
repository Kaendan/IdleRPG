function addClickEvents(e) {
    var bag = document.getElementById("bag").getElementsByTagName("li");
    for (var i = 0; i < bag.length; i++) {
        bag[i].onclick = function() {
            interface.changeInventoryMenu(this.id);
        };
    };

    var menus = document.getElementById("menus").getElementsByTagName("li");
    for (var i = 0; i < menus.length; i++) {
        menus[i].onclick = function() {
            interface.showMenu(this.getElementsByTagName("a")[0]);
        };
    };
}

function addEvents() {
    addClickEvents();
}