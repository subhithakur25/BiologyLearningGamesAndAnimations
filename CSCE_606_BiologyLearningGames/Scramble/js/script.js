
var level;
var wordbank;
var rndNum;
var word;
var originalHTML = document.getElementById("squares").innerHTML()
var score = 0;
var guessed = []

String.prototype.shuffle = function () {
  var a = this.split(""),
    n = a.length;
  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
} //shuffle function

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}//get Random int

function reSetSquares() {
  document.getElementById("squares").innerHTML = originalHTML;
}

function chooseLevel(lvl) {
  level = lvl
  wordbank = Object.keys(level);
  rndNum = getRandomInt(0, wordbank.length - 1);
  word = wordbank[rndNum];
  reSetSquares();
  }//chooseLevel

function play() {
  if (level != levelMedium && level != levelHard) {
    chooseLevel(levelEasy);
  }
  reSetSquares();
  var rstring = word.shuffle();
  for (var i = 1; i < word.length + 1; i++) {
    document.getElementById("squares").innerHTML += '<td id="' + i + '" class ="ui-sortable-handle tile_size"></td>'
  }
  for (var i = 0; i < word.length; i++) {
    document.getElementById(i + 1).innerHTML ='<span class="hover_pointer">' + rstring.charAt(i) + '</span>';
  }
} //play function

document.getElementById("next").onclick = function () {
  reSetSquares();
  rndNum = getRandomInt(0, wordbank.length - 1);
  word = wordbank[rndNum];
  play();
} //next function

document.getElementById("levels").onclick = function () {
  swal({
    title: 'Please Select Difficulty Level',
    html: "<br>" +
      '<button id="buttonEasy" class="button btn-lg" style="margin: 0 5px">EASY</button>' +
      '<button id="buttonMedium" class="button btn-lg" style="margin: 0 5px">MEDIUM</button>' +
      '<button id="buttonHard" class="button btn-lg" style="margin: 0 5px">HARD</button>',
    showCancelButton: false,
    showConfirmButton: false
  })//swal
  document.getElementById("buttonEasy").onclick = function () {
    chooseLevel(levelEasy)
    swal.clickConfirm();
  }//buttonEasy
  document.getElementById("buttonMedium").onclick = function () {
    chooseLevel(levelMedium);
    swal.clickConfirm();
  }//buttonMedium
  document.getElementById("buttonHard").onclick = function () {
    chooseLevel(levelHard)
    swal.clickConfirm();
  }//buttonHard

} //levels

document.getElementById("hint").onclick = function () {
  swal(level[word]);
}
$('#board tr').sortable({
  //placeholder: 'sortable-placeholder',
  tolerance: "pointer" ,
  axis: "x" ,
  update: function checkOrder(event, ui) {
    var tiles = $('td');
    var tempWord = '';
    for (var i = 0; i < tiles.length; i++) {
      var letter = $(tiles[i]).text();
      tempWord += letter;
    }
    if (tempWord === word && !guessed.includes(tempWord)) {
      swal("", word.toUpperCase() + " : "+ level[word], "success");
      $('ul').append('<li>' + word + '</li>');
      score++
      $('#score').text(score);
      guessed.push(tempWord)

    } //tempword
  }//function check order
}); //sortable

module.exports = {
  getRandomInt: getRandomInt
}