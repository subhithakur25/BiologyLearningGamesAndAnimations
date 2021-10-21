/*
If you want to customize this hangman for differnt words or sentences, just change the 'sentence'
variable below. You MUST follow the specifications below or it will not work: 
    1. For each 'word' you want guessed, enter a number followed by a ? character in the sentence where it should be displayed. 
    2. For each 'word' you want guessed, put it in the words array

This hangman is built to sustain the standard maximum of 8 incorrect guesses before a loss. If you wish to change
this limit, you will need to: 
    1. adjust the "total" mapped value within the guess_map variable
    2. in ../img/ you will find images representing each step of wrong guesses. 
       you will need to add or remove images based on how many wrong guesses you will allow
*/

window.onload = function() {
    /* sentence you want displayed to the player; see header comment for customization */
    var sentence = "The peripheral nervous system is made up of 1? and has two divisions: the 2? and 3?."; 
    /* answers to the guessable words marked in the sentece, IN ORDER */
    var words = ["nerves","autonomic","somatic"];    
    
    /*  * map letters of each word to indices  (_ characters) we can swap
        * map has the following structure: 
        letter1 -> [[word_i, index in word_i],[word_i,index in word_i] . . . ]
        letter2 -> [[word_i, index in word_i],[word_i,index in word_i] . . . ]
        . . .
        lettern -> [[word_i, index in word_i],[word_i,index in word_i] . . . ]
        s.t. each letter maps to an array of [word,index] pairs to mark where the _ character we must replace          
    */
    var answer_map = new Map(); 
    /* single-variable map to maintain how many wrong/right guesses have been made */
    var guess_map = new Map([["total",8],["wrong",0],["right",0]]); 
    document.getElementById("totalGuesses").innerText = guess_map.get("total"); 

    /* alphabet array */
    var alphabet = ['a','b','c','d','e','f','g','h','i',
                    'j','k','l','m','n','o','p','q','r',
                    's','t','u','v','w','x','y','z'];

    /* pre-assigned document variables for easy access */
    var sentence_display = document.getElementById('sentenceToFill'); 
    var status = document.getElementById('status'); 
    var result = document.getElementById('result');
    var hangman_picture = document.getElementById('hangmanPic'); 
    var wrong_guesses = document.getElementById('wrong'); 
    var letter_buttons = document.getElementById('letters'); 
    var word_displays; 
    var reset_button = document.getElementById('reset'); 

    /* process the given sentence, list of words, and set up the phrase for playing */ 
    function loadSentence() {
        words.forEach(function(word, i) {
            //apply span to each word so their text can be red and easily targetable
            var span = "<span class='word'>" + '_ '.repeat(word.length) + "</span>";
            sentence = sentence.replace((i+1).toString() + '?',span);

            /* map the word letters to the answer map as described above */
            for (var j = 0; j < word.length; j++) {
                if (answer_map.get(word.charAt(j)) == undefined) {
                    answer_map.set(word.charAt(j),[]); 
                    answer_map.get(word.charAt(j)).push([i,j]); 
                } else {
                    answer_map.get(word.charAt(j)).push([i,j]); 
                }
            }
        });
        sentence_display.innerHTML = sentence; 
        word_displays = document.getElementsByClassName('word'); 
    }
    
    /* generate buttons for each alphabetical letter to allow guessing */ 
    function generateButtons() {
        letter_buttons.innerHTML = ""; 
        for (var i = 0; i < alphabet.length; i++) {
            var button = document.createElement("li"); 
            button.id = alphabet[i];
            button.className = "btn btn-primary m-2"; 
            button.innerText = alphabet[i]; 
            button.onclick = function() { handleGuess(event); }
            letter_buttons.appendChild(button); 
        }
    }
    
    /* handle the player's next guess (triggered by clicking on an active button) */ 
    function handleGuess(event) {
        var button = event.target;  
        var letter = button.innerText;
        button.className += " disabled"; 
        button.onclick = null; 
        /* correct guess */ 
        if (answer_map.get(letter) != undefined) {
            guess_map.set("right",guess_map.get("right")+1); 
            var blanks = answer_map.get(letter); 
            var blank; 
            for (blank of blanks) {
                var str = word_displays[blank[0]].innerText; 
                word_displays[blank[0]].innerText = str.substr(0,blank[1]*2) + letter + str.substr(blank[1]*2+1,str.length); 
            }
            if (guess_map.get("right") == answer_map.size) {
                hangman_picture.src = "./img/win.png"; 
                result.innerHTML = "You win! Hope you enjoyed playing."
                letter_buttons.innerHTML = ""; 
                reset_button.style.display = ""; 
            }
        /* incorrect guess */ 
        } else {
            guess_map.set("wrong",guess_map.get("wrong")+1); 
            wrong_guesses.innerHTML = guess_map.get("wrong"); 
            if (guess_map.get("wrong") == guess_map.get("total")) {
                hangman_picture.src = "./img/lose.png"; 
                result.innerHTML = "You lose. Click Reset to try again!";  
                letter_buttons.innerHTML = "";
                reset_button.style.display = "";
            } else {
                hangman_picture.src = "./img/wrong" + guess_map.get("wrong").toString() + ".png"; 
            }
        }
    }
    
    /* reset the game */ 
    reset_button.onclick = function() {
        guess_map.set("right",0);
        guess_map.set("wrong",0); 
        wrong_guesses.innerText = 0; 
        hangman_picture.src = "./img/wrong0.png"; 
        result.innerHTML = '';
        loadSentence(); 
        generateButtons();
        reset_button.style.display = "none"; 
    }   

    /* initialize the game */ 
    loadSentence(); 
    generateButtons();
}