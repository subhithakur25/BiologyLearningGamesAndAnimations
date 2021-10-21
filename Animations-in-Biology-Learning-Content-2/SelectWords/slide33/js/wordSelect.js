var answers = ['endocrine', 'chemical', 'hormones', 'slowly']
var studentAnswers = [null, null, null, null]

function question(num, event) {
    // Reset the result text when a new selection is made
    if (document.getElementById("result").innerText != ""){
        document.getElementById("result").innerText = "";
    }
    var ans = event.target.textContent;
    if (studentAnswers[num] != null) {
        document.getElementById(studentAnswers[num]).classList.toggle("selected");
    }
    studentAnswers[num] = ans;
    document.getElementById(ans).classList.toggle("selected");
}

function submit() {
    if (JSON.stringify(answers) == JSON.stringify(studentAnswers)) {
        document.getElementById("result").innerText = "Correct!";
        document.getElementById("result").classList = "text-success";
    } else {
        document.getElementById("result").innerText = "One or more choices are incorrect.";
        document.getElementById("result").classList = "text-danger";
    }
}
