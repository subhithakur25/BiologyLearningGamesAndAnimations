window.onload = function() {
    var grid = document.getElementById("puzzle-grid");
    var randomizedTiles = [];

    for (var i = 0; i < 4; i++) {
        var idx = Math.floor(Math.random() * tiles.length);
        randomizedTiles.push(tiles[idx]);
        tiles.splice(idx, 1);
    }

    grid.innerHTML = '';
    for (i = 0; i < 4; i++) {
        grid.innerHTML += '<li class="set' + (i + 1) + '">' +
                '<div class="flip-tile-inner">' +
                    '<div class="flip-tile-front">' +
                    '</div>' +
                    '<div class="flip-tile-back">' +
                        '<p class="set-text">' + randomizedTiles[i] + '</p>' +
                    '</div>' +
                '</div>' +
	    '</li>' +
	    '<li class="set' + (i + 1) + '">' +
                '<div class="flip-tile-inner">' +
                    '<div class="flip-tile-front">' +
                    '</div>' +
                    '<div class="flip-tile-back">' +
                        '<img src="img/' + randomizedTiles[i] + '.jpg">' +
                    '</div>' +
                '</div>' +
	    '</li>'
    }

    var numChildren = grid.childElementCount;
    var clickSound = new Audio('assets/click.mp3');

    // randomize the list
    for (i = numChildren; i >= 0; i--) {
        grid.appendChild(grid.children[Math.random() * i | 0]);
    }

    var setNumbers = [];
    for (i = 0; i < numChildren; i++) {
        setNumbers.push(grid.children[i].className);
    }

    var set = document.querySelectorAll(".flip-tile-back");
    var outputText = document.getElementById("output-text");
    var clickedTiles = [];

    for (i = 0; i < numChildren; i++) {
        grid.children[i].addEventListener("click", matchTile);
    }

    function sleep(ms, func) {
        return setTimeout(func, ms);
    }

    function matchTile() {
        clickSound.play();
        clickSound.currentTime = 0;

        if (clickedTiles.length === 0) {
            clickedTiles.push(this);

            // remove click listener to avoid clicking on the same tile
            this.removeEventListener("click", matchTile);
            this.id = "clicked";
        } else {
            var previousTile = clickedTiles.pop();
            var currentTile = this;

            if (previousTile.className == currentTile.className) {
                previousTile.id = "correct";
                currentTile.id = "correct";

                sleep(1000, function() {
                    var tiles = document.getElementsByClassName(currentTile.className);
		
                    for (i = 0; i < tiles.length; i++) {
                        tiles[i].innerHTML = "";
                        tiles[i].id = "removed";
                        tiles[i].removeEventListener("click", matchTile);
                    }

                    var count = 0;
                    for (i = 0; i < numChildren; i++) {
                        if (grid.children[i].id == "removed") {
                            count += 1;
                        }
                    }

                    if (count == 8) {
                        grid.innerHTML = "";

                        for (i = 0; i < numChildren; i++) {
                            var node = document.createElement("li");
                            node.appendChild(set[i].firstElementChild.cloneNode(true));
                            grid.appendChild(node);

                            if (setNumbers[i] === "set1") {
                                grid.children[i].style.border = "5px solid lime";
                            } else if (setNumbers[i] === "set2") {
                                grid.children[i].style.border = "5px solid blue";
                            } else if (setNumbers[i] === "set3") {
                                grid.children[i].style.border = "5px solid red";
                            } else if (setNumbers[i] === "set4") {
                                grid.children[i].style.border = "5px solid pink";
                            }
                        }

                        outputText.innerHTML = "All tiles are matched!";
		    }
                });
	   } else {
                previousTile.id = "incorrect";
                currentTile.id = "incorrect";

                previousTile.addEventListener("click", matchTile);

                sleep(1000, function() {
                    previousTile.id = "unclicked";
                    currentTile.id = "unclicked";
                });
            }
        }
    }
}
