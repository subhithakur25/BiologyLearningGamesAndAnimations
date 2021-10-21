

var words = window.easywords;
var alphabet = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z"
];
var word; // Selected word
var lives; // Lives
var difficulty = "Easy";
const fieldSize = 121; //Must be a square
var fieldArray = [];
var insertedWords = [];
var selectedWord = "";
var selectedLetters = [];

//each letter on grid is of class Letter
class Letter {
	constructor(letter, inWord, word) {
		this.letter = letter;	//char
		this.inWord = inWord;	//bool
		this.word = word;		//string
		this.selected = false;
		this.letterid = "";
	}
};

var reset = function()
{
	word = "";
	lives = 3;
	fieldArray = [];
	insertedWords = [];
	selectedWord = "";
	selectedLetters = [];
	letters.parentNode.removeChild(letters);
};

//create "buttons"
var buttons = function () {
	myButtons = document.getElementById("buttons");
	letters = document.createElement("ul");
	letters.id = "alphabet";
	for (var i = 0; i < Math.sqrt(fieldSize); i++) {	
		fieldArray.push([]);
		for(var j = 0; j < Math.sqrt(fieldSize); j++){
			tempChar = alphabet[Math.floor(Math.random() * 26)];
			let tempLetter = new Letter(tempChar, false, "");
			fieldArray[i].push(tempLetter);
			
			//insert into the html
			list = document.createElement("li");
			list.id = String(i) + ',' + String(j);
			list.setAttribute("onclick", "selector()");
			//list.onclick = "selector()";
			list.innerHTML = tempLetter.letter;
			check();
			myButtons.appendChild(letters);
			letters.appendChild(list);
		}
	}
	//word insertion
	for(i = 0; i < words.length; i++){
		switch(Math.floor(Math.random() * 3)){
			case 0:
				insertRight(words[i]);
				break;
			case 1:
				insertDown(words[i]);
				break;
			case 2:
				insertDiagonal(words[i]);
				break;
			default:
				insertRight(words[i]);

		}
	}
};

//insert facing right
function insertRight(word){
	var taken = true;
	var row = 0;
	var col = 0;
	iter = 0;

	//checking to see if it can place the word in random spots
	while(taken == true && iter < 100){
		row = Math.floor(Math.floor(Math.random() * fieldSize)/Math.sqrt(fieldSize));
		col = Math.floor(Math.random() * Math.sqrt(fieldSize));
		if(!(word.length > Math.sqrt(fieldSize)-col)){
			for(var z = 0; z < word.length && z < Math.sqrt(fieldSize)-col; z++){
				taken = false;
				if(fieldArray[row][col+z].inWord){
					taken = true;
					break;
				}
			}
			if(!taken){
				for(z = 0; z < word.length; z++){
					fieldArray[row][col+z].letter = word.substring(z, z+1);
					fieldArray[row][col+z].inWord = true;
					fieldArray[row][col+z].word = word;
					tempvar = document.getElementById(String(row) + ',' + String(col+z));
					tempvar.innerHTML = word.substring(z, z+1);
				}
				insertedWords.push(word);
			}
		}
		iter++;
	}
};

//insert facing down
function insertDown(word){
	var taken = true;
	var row = 0;
	var col = 0;
	iter = 0;
	//checking to see if it can place the word in random spots
	while(taken == true && iter < 100){
		row = Math.floor(Math.floor(Math.random() * fieldSize)/Math.sqrt(fieldSize));
		col = Math.floor(Math.random() * Math.sqrt(fieldSize));
		if(!(word.length > Math.sqrt(fieldSize)-row)){
			for(var z = 0; z < word.length && z < Math.sqrt(fieldSize)-row; z++){
				taken = false;
				if(fieldArray[row+z][col].inWord){
					taken = true;
					break;
				}
			}
			if(!taken){
				for(z = 0; z < word.length; z++){
					fieldArray[row+z][col].letter = word.substring(z, z+1);
					fieldArray[row+z][col].inWord = true;
					fieldArray[row+z][col].word = word;
					tempvar = document.getElementById(String(row+z) + ',' + String(col));
					tempvar.innerHTML = word.substring(z, z+1);
				}
				insertedWords.push(word);
			}
		}
		iter++;
	}
};

//insert facing diagonal (top left to bottom right)
function insertDiagonal(word){
	var taken = true;
	var row = 0;
	var col = 0;
	iter = 0;
	//checking to see if it can place the word in random spots
	while(taken == true && iter < 100){
		row = Math.floor(Math.floor(Math.random() * fieldSize)/Math.sqrt(fieldSize));
		col = Math.floor(Math.random() * Math.sqrt(fieldSize));
		if(!( (word.length > Math.sqrt(fieldSize)-col) || (word.length > Math.sqrt(fieldSize)-row))){
			for(var z = 0; z < word.length && z < Math.sqrt(fieldSize)-col && z < Math.sqrt(fieldSize)-col; z++){
				taken = false;
				if(fieldArray[row+z][col+z].inWord){
					taken = true;
					break;
				}
			}
			if(!taken){
				for(z = 0; z < word.length; z++){
					fieldArray[row+z][col+z].letter = word.substring(z, z+1);
					fieldArray[row+z][col+z].inWord = true;
					fieldArray[row+z][col+z].word = word;
					tempvar = document.getElementById(String(row+z) + ',' + String(col+z));
					tempvar.innerHTML = word.substring(z, z+1);
				}
				insertedWords.push(word);
			}
		}
		iter++;
	}
};

// Select Catagory
var wordsRemaining = function () {
	catagoryName.innerHTML = "Words Remaining : " + insertedWords.length;
};

//checks to see if word is valid entry on submit
verifyWord = function (){
	//might need to redo this later, this is lazy way of checking
	if(selectedWord.length == selectedLetters.length){
		for(var z = 0; z < insertedWords.length; z++){
			if(selectedWord == insertedWords[z]){
				insertedWords.splice(z,1);
				selectedLetters = [];
				wordsRemaining();
				break;
			}
		}
		if(insertedWords.length == 0){
			swal("", "<div style='font-size :24px;'>" + "Congratulations, you found all the words!" + "</div>")
		}else{
			swal("", "<div style='font-size :24px;'>" + "Correct!" + "</div>")
		}
	}else{

		lives = lives-1;
		setShowLives("You have " + lives + " lives ");
		if(lives > 0)
			swal("", "<div style='font-size :24px;'>" + "Incorrect, please try again." + "</div>")
		else
		{
			swal("", "<div style='font-size :24px;'>" + "You are out of lives. Please play again!" + "</div>")
		reset();
		play();
		setShowWordBank();
		}
	}
};

//show lives remaining
setShowLives = function (str) {
	var showLives = document.getElementById("mylives");
	showLives.innerHTML = str;
	
	dif = document.createElement("p");
	dif.id = "difficulty frame";
	dif.innerHTML = difficulty;
	showLives.appendChild(dif);
	
};

//show words to find
setShowWordBank = function()
{
	var showLives = document.getElementById("wordbank");
	showLives.innerHTML = "Words to find: ";
	wblist = document.createElement("ul");
	if(difficulty != "Hard")
	{
		for (var i = 0; i < insertedWords.length; i++) {
			hold = document.createElement("li");
			hold.id = "Word " + String(i);
			hold.innerHTML = insertedWords[i];
			wblist.appendChild(hold);
		}
	}
	else
	{
		hold = document.createElement("li");
		hold.id = "Sorry";
		hold.innerHTML = "NO BANK AVAILABLE ON HARD";
		wblist.appendChild(hold);
	}
	wordbank.appendChild(wblist);
};

// OnClick Function
check = function () {
	list.onclick = function () {
		id = this.id.split(',');
		id_col = id[0];
		id_row = id[1];
		fieldArrayLetter = fieldArray[id_col][id_row];
		//select values for word submission
		if(!fieldArrayLetter.selected){
			fieldArrayLetter.selected = true;
			this.setAttribute("class", "active");
			selectedWord = fieldArrayLetter.word;
			selectedLetters.push(fieldArrayLetter.letter);
		}else{
			fieldArrayLetter.selected = false;
			this.setAttribute("class", "notactive");
			selectedWord = fieldArrayLetter.word;
			//remove letter from selected letters
			for(var z = 0; z < selectedLetters.length; z++){
				if(fieldArrayLetter.letter == selectedLetters[z]){
					selectedLetters.splice(z,1);
					break;
				}
			}
		}
		var property = document.getElementById(this.id);
		var temp = property.id.split(',');
		var row = temp[0];
		var col = temp[1];
	};
};

// Play
function play() {
	buttons();
	if(difficulty == "Easy")
	{
		lives = 5;
	}
	else
		lives = 3;
	setShowLives("You have " + lives + " lives ");
	wordsRemaining();
};

window.onload = function () {
	window.count = 0;
	play();
	setShowWordBank();

	document.getElementById("level").onclick = function () {
		swal({
			title: 'Please Select Difficulty Level',
			html: "<br>" +
				'<button id="buttonEasy" class="button btn-lg" style="margin: 0 5px">EASY</button>' +
				'<button id="buttonMedium" class="button btn-lg" style="margin: 0 5px">MEDIUM</button>' +
				'<button id="buttonHard" class="button btn-lg" style="margin: 0 5px">HARD</button>',
			showCancelButton: false,
			showConfirmButton: false
		}) //swal
		document.getElementById("buttonEasy").onclick = function () {
			difficulty = "Easy";
			words = window.easywords;
			reset();
			play();
			setShowWordBank();
			swal.clickConfirm();
		} //buttonEasy
		document.getElementById("buttonMedium").onclick = function () {
			difficulty = "Medium";
			words = window.mediumwords;
			reset();
			play();
			setShowWordBank();
			swal.clickConfirm();
		} //buttonMedium
		document.getElementById("buttonHard").onclick = function () {
			difficulty = "Hard";
			words = window.hardwords;
			reset();
			play();
			setShowWordBank();
			swal.clickConfirm();
		}
	}

	// Reset
	document.getElementById("reset").onclick = function () {
		reset();
		play();
		setShowWordBank();
	};
};