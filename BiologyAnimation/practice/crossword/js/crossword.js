// Initialise clues //
across = [{"Number" : 1, "Clue" : "System which controls metabolism, sleep, growth and development, reproduction etc"}];
down = [{"Number": 1, "Clue" : "Butterfly-shaped gland located in front of trachea that regulated metabolism"},
	{"Number": 2, "Clue": "Group of cells that produce and secrete chemical messengers"}, 
	{"Number": 3, "Clue": "Gland responsible for modulating sleep patterns"},
	{"Number": 4, "Clue": "Chemical messengers produced by glands to regulate bodily functions"}]

// Variables to track if currently typed word is horizontal or vertical	//
leftToRight = false;
topToBottom = false;

// Class Definitions //
class Word {
    text;
    row;
    column;
    vertical;
	number;

    constructor(text, row, column, vertical, number) {
        this.text = text;
        this.row = row;
        this.column = column;
        this.vertical = vertical;
		this.number = number;
    }
}

class CrosswordGrid {
	constructor () {
     	this.size = 15;
        this.emptyCell = "_";
        this.words = [];
		this.grid = Array.from(Array( this.size ), () => new Array( this.size ));
		for(var row = 0; row < this.size; row++)
			{
				for( var column = 0; column < this.size; column++ )
				{
					this.grid[row][column] = this. emptyCell;
				}
			}
    }

	// Add a word to crossword. This adds a word to the array and populates the word on the crossword grid //
    addWord = function (word) {
        if (this.validateWords(word)) {
            this.words.push(word);
            this.addWordToGrid(word);
        } else {
            console.log("Cannot insert the word as it is invalid");
        }
    }

	//Populates the word to the crossword grid //
    addWordToGrid = function(word)
    {
        for (var i = 0; i < word.text.length; i++)
        {
            var row = word.row;
            var column = word.column;
            if (word.vertical)
            {
                row += i;
            }
            else
            {
                column += i;
            }

            this.grid[row][column] = word.text.substring(i, i+1);
        }
    }

	// Validates if two words are contradicting each other. That is they intersect on the grid with different letters //
    validateWords = function(word) {
        for (var i = 0; i < word.text.length; i++)
        {
            var row = word.row;
            var column = word.column;
            if (word.vertical)
            {
                row += i;
            }
            else
            {
                column += i;
            }

            if(this.grid[row][column] !== word.text.substring(i, i+1) && this.grid[row][column] !== this.emptyCell) {
				console.log(this.grid[row][column]);
				console.log(word.text.substring(i,i+1));
                console.log("invalid word");
            }
            return this.grid[row][column] === word.text.substring(i, i+1) || this.grid[row][column] === this.emptyCell;
        }
    }
	
	// returns the letter at the given row and column of the grid //
	getLetter(row, column) {
		return this.grid[row][column];
	}
}

// Initialize the puzzle and add words //
var puzzle = new CrosswordGrid ();
var word = new Word ("ENDOCRINE", 5, 4, false, 1);
puzzle.addWord(word);
var word = new Word ("PINEAL", 3, 5, true,3);
puzzle.addWord(word);
var word = new Word ("THYROID", 1, 7, true, 1);
puzzle.addWord(word);
var word = new Word ("HORMONE", 3, 9, true, 4);
puzzle.addWord(word);
var word = new Word ("GLAND", 2, 11, true, 2);
puzzle.addWord(word);

// Displays the board html //
var crosswordDiv = document.getElementById("crossword");

// Displays the outline for the whole grid //
for( var row = 0; row < puzzle.size; row++ ) {
	for (var col = 0; col < puzzle.size; col++) {
		var div = document.createElement("DIV");
		div.id = row + "_" + col; 
		div.classList.add("slot");
		div.style.border =  '1px solid #e9e9e9';
		div.style.backgroundColor = '#e9e9e9';
		crosswordDiv.appendChild(div);
	}
}

// Makes the boxes where the letters are located and makes them editable //
for( var row = 0; row < puzzle.size; row++ ){
	for (var col = 0; col < puzzle.size; col++) {
		var slot = document.getElementById(row + "_" + col);
		if( puzzle.getLetter(row, col) !== "_")
		{
			slot.contentEditable = true;
			slot.spellcheck = false;
			slot.tabIndex = -1;
			slot.style.borderBottom =  '1px solid white';
			slot.style.borderRight =  '1px solid white';
			slot.style.backgroundColor = 'white'; 
			for (i in puzzle.words) {
				word = puzzle.words[i];
				if(word.row == row && word.column == col) {
					slot.innerHTML = '<div class="numbers" style="text-align:left; margin-top: 0px; padding-top:0px;"><span style="font-size: 10px;"><sup>'+word.number+'</sup></span></div>';
				}
			}
		}
		else
		{
			slot.innerHTML = "";
			slot.style.border =  '1px solid #e9e9e9';
			slot.style.backgroundColor = '#e9e9e9';
		}
	}
}

// Display the clues table //
var table = $('<table/>');
table.append('<th>Across</th>');
jQuery.each(across, function() {
    table.append( '<tr><td>' + this.Number + ". " +  this.Clue + '</td></tr>' );
});
$('#across').append(table);

var table2 = $('<table>').addClass('foo');
table2.append('<th>Down</th>');
jQuery.each(down, function() {
	table2.append( '<tr><td>' + this.Number + ". " +  this.Clue + '</td></tr>' );
});
$('#down').append(table2);

// Handle letters added to the crossword. Ensures that only 1 letter is added at a time to any box on the grid //
$(document).on("keypress paste",".slot", function(e) {
	isStartingDiv = false;
	id = this.id;
	var split = id.split("_");
	var row = parseInt(split[0]);
	var col = parseInt(split[1]);
	for (i in puzzle.words) {
				word = puzzle.words[i];
				if(word.row == row && word.column == col) {
					isStartingDiv = true;
					this.classList.add("startingDiv");
				}
	}
	if (this.innerHTML.length == 0 || (isStartingDiv && this.innerHTML.length >= 136)) { // Need to change this to make it more robust
		e.preventDefault();
		if (this.contentEditable) {
			var s = String.fromCharCode(e.which);
			if (s.match(/[a-zA-Z\.]/)) {
				this.innerHTML = this.innerHTML + s;
				this.style.border =  '1px solid white';

			}
		findNextDivToFocus(this);
		}	
	} 
	if (this.innerHTML.length >= 1 || (isStartingDiv && this.innerHTML.length >=137)) { // Need to change this to make it more robust
		e.preventDefault();
		if (this.contentEditable) {
			var s = String.fromCharCode(e.which);
			if (s.match(/[a-zA-Z\.]/)) {
				this.innerHTML = this.innerHTML.substring(0, this.innerHTML.length-2) ;
				this.innerHTML = this.innerHTML + s;
				this.style.border =  '1px solid white';

			}
		findNextDivToFocus(this);
		}	
	}
});

// Handle arrow keys to move on the grid //
document.onkeydown = function(e) {
    switch(e.which) {
        case 37: // left
			var id  = e.target.id;
			var split = id.split("_");
			var row = parseInt(split[0]);
			var col = parseInt(split[1]);
			var nextCol = --col;
			var nextPossibleId1 =  row+"_"+nextCol;
			if ($("#"+nextPossibleId1).attr("contenteditable")) {
				$("#"+nextPossibleId1).focus();	
			}
		break;

        case 38: // up
			var id  = e.target.id;
			var split = id.split("_");
			var row = parseInt(split[0]);
			var col = parseInt(split[1]);
			var nextRow = --row;
			var nextPossibleId1 =  nextRow+"_"+col;
			if ($("#"+nextPossibleId1).attr("contenteditable")) {
				$("#"+nextPossibleId1).focus();	
			}
        break;

        case 39: // right
			var id  = e.target.id;
			var split = id.split("_");
			var row = parseInt(split[0]);
			var col = parseInt(split[1]);
			var nextCol = ++col;
			var nextPossibleId1 =  row+"_"+nextCol;
			if ($("#"+nextPossibleId1).attr("contenteditable")) {
				$("#"+nextPossibleId1).focus();	
			}
        break;

        case 40: // down
			var id  = e.target.id;
			var split = id.split("_");
			var row = parseInt(split[0]);
			var col = parseInt(split[1]);
			var nextRow = ++row;
			var nextPossibleId1 =  nextRow+"_"+col;
			if ($("#"+nextPossibleId1).attr("contenteditable")) {
				$("#"+nextPossibleId1).focus();	
			}
        break;
		
		case 8: 
		var div = e.target;
		if (div.innerHTML.length == 0 || div.innerHTML.length == 136) {
				e.preventDefault();
				return false;
		}
		
        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
};


// Moves the cursor to the next div when a word is written. Based on the word is horizontal or vertical, moves either to right or bottom //
function findNextDivToFocus(element) {
	var id  = element.id;
	var split = id.split("_");
	var row = parseInt(split[0]);
	var col = parseInt(split[1]);
	var nextRow = row++;
	var nextCol = col++;
	var nextPossibleId1 =  row+"_"+nextCol;
	var nextPossibleId2 =  nextRow+"_"+col;
	var localTopToBottom = false;
	var localLeftToRight = false;
	if ($("#"+nextPossibleId1).attr("contenteditable")) {
		localTopToBottom = true;
	}
	if ($("#"+nextPossibleId2).attr("contenteditable")) {
		localLeftToRight = true;
	}
	if (leftToRight === true && localLeftToRight === true) {
		$("#"+nextPossibleId2).focus();	
		return;
	}
	if (topToBottom === true && localTopToBottom === true) {
		$("#"+nextPossibleId1).focus();	
		return;
	}
	if (localTopToBottom === true) {
		$("#"+nextPossibleId1).focus();	
		topToBottom = true;
		leftToRight = false;
		return;
	}
	if (localLeftToRight === true) {
		$("#"+nextPossibleId2).focus();	
		leftToRight = true;
		topToBottom = false;
		return;
	}
}

/*	
function findNextDivToFocus(element) {
	var id  = element.id;
	var split = id.split("_");
	var row = parseInt(split[0]);
	var col = parseInt(split[1]);
	var nextRow = row++;
	var nextCol = col++;
	var nextPossibleId1 =  row+"_"+nextCol;
	var nextPossibleId2 =  nextRow+"_"+col;
	console.log(nextPossibleId1)
	console.log(nextPossibleId2)
	console.log($("#"+nextPossibleId1).attr("contenteditable"));
	if ($("#"+nextPossibleId1).attr("contenteditable")) {
		$("#"+nextPossibleId1).focus();	
		return;
	}
	if ($("#"+nextPossibleId2).attr("contenteditable")) {
		$("#"+nextPossibleId2).focus();
		return;
	}
}
*/

// Checks the answer when the user clicks on the check button and displays success or failure messages //
function checkAnswer() {
	correct = true;
	for(var row = 0; row < puzzle.size; row++){
		for (var col = 0; col < puzzle.size; col++) {
			var slot = document.getElementById(row + "_" + col);
			if( puzzle.getLetter(row, col) !== "_" && slot.innerHTML.length == 0) {
				correct = false;
				slot.style.border =  '1px solid red';
			}
			if( puzzle.getLetter(row, col) !== "_" && slot.innerHTML.length > 0)
			{
				if (puzzle.getLetter(row,col).toUpperCase() !== slot.innerHTML[slot.innerHTML.length - 1].toUpperCase()) {
					correct = false;
					slot.innerHTML = slot.innerHTML.substring(0, slot.innerHTML.length-1);
					slot.style.border =  '1px solid red';
				}
			}
		}
	}
	if (correct === true) {
		$('#successdiv').removeClass('hide');
	} else {
		$('#failurediv').removeClass('hide');
	}
    setTimeout(() => $('.alert').addClass('hide'), 2000);
}
