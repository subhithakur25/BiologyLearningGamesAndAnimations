window.onload = function() {
    var grid = document.getElementById("puzzle-grid");
    var emptycell = document.getElementById("empty");
    var emptyCellIndex = Array.prototype.indexOf.call(grid.children, emptycell);
    var numChildren = grid.childElementCount;
    var directions = [[-1, 0], [0, 1], [0, -1], [1, 0]];
    var outputText = document.getElementById("output-text");
    var moves = document.getElementById("moves");

    var container = document.getElementById("container");
    var gridClone = grid.cloneNode(true);

    var counter = 0;
    moves.value = counter;

    function initialSetup() {
        var emptyCellRow = Math.floor(emptyCellIndex / 3);
        var emptyCellColumn = emptyCellIndex % 3;

        for (i = 0; i < directions.length; i++) {
            if (emptyCellRow + directions[i][0] >= 0 &&
                emptyCellRow + directions[i][0] < 3) {
                if (emptyCellColumn + directions[i][1] >= 0 &&
                    emptyCellColumn + directions[i][1] < 3) {
                    index = convertGridToIndex(emptyCellRow + directions[i][0],
			                       emptyCellColumn + directions[i][1]);
                    grid.children[index].addEventListener("click", swap);
                }
            }
        }
    }

    document.getElementById("reset").onclick = function resetGrid() {
        container.innerHTML = "";
        container.appendChild(gridClone);
        outputText.innerHTML = "";

        grid = document.getElementById("puzzle-grid");
        emptycell = document.getElementById("empty");
        emptyCellIndex = Array.prototype.indexOf.call(grid.children, emptycell);
        numChildren = grid.childElementCount;

        container = document.getElementById("container");
        gridClone = grid.cloneNode(true);

        counter = 0;
        moves.value = counter;
        initialSetup();
    }

    function checkAnswer() {
        for (i = 0; i < numChildren - 1; i++) {
            if (grid.children[i].id != "img".concat(i + 1)) {
                return false;
            }
        }

        return true;
    }

    function swap() {
        counter += 1;
        moves.value = counter;

        for (i = 0; i < numChildren; i++) {
            grid.children[i].removeEventListener("click", swap);
        }

        var clickIndex = Array.prototype.indexOf.call(grid.children, this);
        var sibling = this.nextElementSibling;

        if (sibling === emptycell) {
            grid.insertBefore(emptycell, this);
        } else {
            grid.insertBefore(this, emptycell);
            grid.insertBefore(emptycell, sibling);
        }

        if (checkAnswer()) {
            outputText.innerHTML = "You've done it!";

            for (i = 0; i < numChildren; i++) {
                grid.children[i].className = "opaque";
            }

            return;
        }

        emptycell = document.getElementById("empty");
        emptyCellIndex = Array.prototype.indexOf.call(grid.children, emptycell);

        emptyCellRow = Math.floor(emptyCellIndex / 3);
        emptyCellColumn = emptyCellIndex % 3;

        for (i = 0; i < directions.length; i++) {
            if (emptyCellRow + directions[i][0] >= 0 &&
                emptyCellRow + directions[i][0] < 3) {
                if (emptyCellColumn + directions[i][1] >= 0 &&
                    emptyCellColumn + directions[i][1] < 3) {
                    index = convertGridToIndex(emptyCellRow + directions[i][0],
			                       emptyCellColumn + directions[i][1]);
                    grid.children[index].addEventListener("click", swap);
                }
            }
        }
    }

    function convertGridToIndex(row, col) {
        return 3 * row + col;
    }

    if (checkAnswer()) {
        outputText.innerHTML = "You've done it!";

        for (i = 0; i < numChildren; i++) {
            grid.children[i].className = "opaque";
        }

        return;
    }

    initialSetup();
}
