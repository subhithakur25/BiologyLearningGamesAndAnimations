window.onload = function () {

var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
      'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
      'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


  var getHint ;          // Word getHint
  var word = "PHOTOSYNTHESIS"; // Selected word
  var guess ;             // Guess
  var geusses = [ ];      // Stored geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'

  // Get elements
  var showLives = document.getElementById("mylives");
  var getHint = document.getElementById("hint");
  var resetGame = document.getElementById('reset');
  var showClue = document.getElementById("clue");

  var state1 = 0;

  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }

  // Create geusses ul
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
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
  }
  function setGameOver(){
    document.getElementById('alphabet').style.pointerEvents = 'none';
    resetGame.disabled = false;
  }



  // Show lives
   comments = function () {
    showLives.style.color = "#FFFFFF";
    //showLives.style.fontSize = "1.6em";
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.style.color = "#8B0000";
      //showLives.style.fontSize = "2.2em";
      showLives.innerHTML = "*** GAME OVER ***";
      setGameOver();
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "You got it correct";
      }
    }
  }

      // Animate man
  var animate = function () {
    var drawMe = lives ;
    show_image(drawArray[drawMe]);
  }


   // Hangman
  	function removeElement(id) {
		var elem = document.getElementById(id);
		return elem.parentNode.removeChild(elem);
	}
  
  var img = document.getElementById("image");
  function show_image(src) {
    if (state1 == 0) {
        img.setAttribute("id", "pic");
        state1 = 1;
    } else if(state1 == 1) {
        img.removeAttribute("id");
        img.setAttribute("id", "pic1");
        state1 = 2;
    } else if(state1 == 2){
        img.removeAttribute("id");
        img.setAttribute("id", "pic");
        state1 = 1;
    }
    
    img.src = src;
  }

   layer1 = "layer1.png";
   layer2 = "layer2.png";
   layer3 = "layer3.png";
   layer4 = "layer4.png";
   layer5 = "layer5.png";

  drawArray = [layer5,layer4,layer3,layer2,layer1];


  // OnClick Function
   check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        }
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
		animate();
      }
    }
  }


  // Play
  play = function () {
    word = word.replace(/\s/g, "-");
    buttons();
    resetGame.disabled = true;
    geusses = [ ];
    lives = 4;
    counter = 0;
    space = 0;
    result();
    comments();
	show_image(layer1);
  }

  play();

  // Hint

    hint.onclick = function() {

      hints = [
        ["Go back and read about Chloroplast"],
    ];

    showClue.innerHTML = "Clue: - " +  hints[0];
  };

   // Reset


  resetGame.onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.textContent = "Clue: - "

	//img.remove();
	state1 = 0;
    play();
  }
}
