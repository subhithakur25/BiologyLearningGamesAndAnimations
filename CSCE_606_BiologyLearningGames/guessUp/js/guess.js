var words = window.easywords;
var wordslist = Object.keys(words);
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
var chosenCategory; // Selected catagory
var getHint; // Word getHint
var word; // Selected word
var guess; // Geuss
var geusses = []; // Stored geusses
var lives; // Lives
var counter; // Count correct geusses
var space; // Number of spaces in word '-'
var hintText;

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

// create alphabet ul
var buttons = function () {
	myButtons = document.getElementById("buttons");
	letters = document.createElement("ul");

	for (var i = 0; i < alphabet.length; i++) {
		letters.id = "alphabet";
		list = document.createElement("li");
		list.id = "letter";
		list.innerHTML = alphabet[i];
		check();
		myButtons.appendChild(letters);
		letters.appendChild(list);
	}
};

// Select Catagory
var selectCat = function () {
	catagoryName.innerHTML = "Category : " + chosenCategory;
};

// Create geusses ul
result = function () {
	wordHolder = document.getElementById("hold");
	correct = document.createElement("ul");

	for (var i = 0; i < word.length; i++) {
		correct.setAttribute("id", "my-word");
		guess = document.createElement("li");
		guess.setAttribute("class", "guess");
		if (word[i] === "-") {
			guess.innerHTML = "-";
			space = 1;
		} else {
			guess.innerHTML = "_";
		}

		geusses.push(guess);
		wordHolder.appendChild(correct);
		correct.appendChild(guess);
	}
};

setShowLives = function (str) {
	var showLives = document.getElementById("mylives");
	showLives.innerHTML = str;
};

// Show lives
comments = function () {
	setShowLives("You have " + lives + " lives");
	if (lives < 1) {
		setShowLives("Game Over");
		for (var i = letters.children.length - 1; i >= 0; i--) {
			letters.children[i].onclick = null;
			letters.children[i].setAttribute("class", "active");
		}
		hint.onclick = null;
	}
	if (counter + space === geusses.length) {
		setShowLives("You Win!");
		swal("", "<div style='font-size :24px;'>" + word.toUpperCase() + " : " + hintText + "</div>", "success");
		for (var i = letters.children.length - 1; i >= 0; i--) {
			letters.children[i].onclick = null;
			letters.children[i].setAttribute("class", "active");
		}
		hint.onclick = null;
	}
};

// Animate man
var animate = function () {
	var drawMe = lives;
	drawArray[drawMe]();
};

// Hangman
canvas = function () {
	myStickman = document.getElementById("stickman");
	context = myStickman.getContext("2d");
	context.beginPath();
	context.strokeStyle = "#fff";
	context.lineWidth = 2;
};

head = function () {
	myStickman = document.getElementById("stickman");
	context = myStickman.getContext("2d");
	context.beginPath();
	context.arc(60, 25, 10, 0, Math.PI * 2, true);
	context.stroke();
};

draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {
	context.moveTo($pathFromx, $pathFromy);
	context.lineTo($pathTox, $pathToy);
	context.stroke();
};

frame1 = function () {
	draw(0, 150, 150, 150);
};

frame2 = function () {
	draw(10, 0, 10, 600);
};

frame3 = function () {
	draw(0, 5, 70, 5);
};

frame4 = function () {
	draw(60, 5, 60, 15);
};

torso = function () {
	draw(60, 36, 60, 70);
};

rightArm = function () {
	draw(60, 46, 100, 50);
};

leftArm = function () {
	draw(60, 46, 20, 50);
};

rightLeg = function () {
	draw(60, 70, 100, 100);
};

leftLeg = function () {
	draw(60, 70, 20, 100);
};

drawArray = [
	rightLeg,
	leftLeg,
	rightArm,
	leftArm,
	torso,
	head,
	frame4,
	frame3,
	frame2,
	frame1
];

// OnClick Function
check = function () {
	list.onclick = function () {
		var geuss = this.innerHTML;
		this.setAttribute("class", "active");
		this.onclick = null;
		for (var i = 0; i < word.length; i++) {
			if (word[i] === geuss) {
				geusses[i].innerHTML = geuss;
				counter += 1;
			}
		}
		var j = word.indexOf(geuss);
		if (j === -1) {
			lives -= 1;
			comments();
			animate();
		} else {
			comments();
		}
	};
};

// Hint
function hintFunc() {
	swal("", "<div style='font-size :24px;'>" + hintText + "</div>")
};

// Helper function for unique number of characters in a string
function unique_char(str) {
	var uniql = "";
	for (var x = 0; x < str.length; x++) {
		var char = str.charAt(x);
		if ((/[a-zA-Z]/).test(char) == false) {
			continue;
		}
		if (uniql.indexOf(char) == -1) {
			uniql += str[x];
		}
	}
	return uniql.length;
}

// Helper function for setting image source
function setImageSource(str) {
	var image = document.getElementById("imageguess");
	image.src = str;
}

// Play
function play() {

	if (count % wordslist.length == 0) {
		shuffle(wordslist)
		console.log("shuffled");
	}
	count += 1;
	chosenCategory = words[wordslist[count % wordslist.length]][0];
	word = wordslist[count % wordslist.length];
	hintText = words[wordslist[count % wordslist.length]][1];
	setImageSource("assets/" + words[wordslist[count % wordslist.length]][2]);

	word = word.replace(/\s/g, "-");
	buttons();
	hint.onclick = hintFunc;

	geusses = [];
	lives = Math.min(Math.ceil(unique_char(word) * (3 / 2)), 10); // No. of lives will be based on length of the word
	counter = 0;
	space = 0;
	result();
	comments();
	selectCat();
	canvas();
};

window.onload = function () {

	window.count = 0;

	play();

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
			words = window.easywords;
			wordslist = Object.keys(words);
			correct.parentNode.removeChild(correct);
			letters.parentNode.removeChild(letters);
			context.clearRect(0, 0, 400, 400);
			play();
			swal.clickConfirm();
		} //buttonEasy
		document.getElementById("buttonMedium").onclick = function () {
			words = window.mediumwords;
			wordslist = Object.keys(words);
			correct.parentNode.removeChild(correct);
			letters.parentNode.removeChild(letters);
			context.clearRect(0, 0, 400, 400);
			play();
			swal.clickConfirm();
		} //buttonMedium
		document.getElementById("buttonHard").onclick = function () {
			words = window.hardwords;
			wordslist = Object.keys(words);
			correct.parentNode.removeChild(correct);
			letters.parentNode.removeChild(letters);
			context.clearRect(0, 0, 400, 400);
			play();
			swal.clickConfirm();
		}
	}

	// Reset
	document.getElementById("reset").onclick = function () {
		correct.parentNode.removeChild(correct);
		letters.parentNode.removeChild(letters);
		context.clearRect(0, 0, 400, 400);
		play();
	};
};