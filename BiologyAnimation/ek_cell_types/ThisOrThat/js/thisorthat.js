window.onload = function() {
    var q_num = 0;

    var outputText = document.getElementById("output-text");
    var h2 = document.getElementById("question_no");
    var p = document.getElementById("question_body");
    var button1 = document.getElementById("option1");
    var button2 = document.getElementById("option2");

    var randomizedQuestions = [];
    var numQuestions = questions.length;

    for (var i = 0; i < numQuestions; i++) {
        var idx = Math.floor(Math.random() * questions.length);
        randomizedQuestions.push(questions[idx]);
        questions.splice(idx, 1);
    }

    questions = randomizedQuestions;
    genQuestion(q_num);

    document.getElementById("option1").onclick = function() {
        qFunction(document.getElementById("option1").textContent)
    };

    document.getElementById("option2").onclick = function() {
        qFunction(document.getElementById("option2").textContent)
    };

    function genQuestion(q_num) {
        document.getElementById("next").disabled = true;
        h2.innerHTML = "Question " + (q_num+1) + " of " + questions.length + " [Topic: "+ questions[q_num]["topic"] + "]";
        p.innerHTML = questions[q_num]["question"];
        button1.innerHTML = questions[q_num]["options"][0]
        button2.innerHTML = questions[q_num]["options"][1]
    }

    function qFunction(value) {
        if (value.localeCompare(questions[q_num]["answer"]) == 0) {
            outputText.innerHTML = "That's right!";
            outputText.style.color = 'blue';
            document.getElementById("option1").disabled = true;
            document.getElementById("option2").disabled = true;

            if (q_num >= questions.length - 1) {
                document.getElementById("next").disabled = true;
                h2.disabled = true;
                p.disabled = true;
            } else {
                document.getElementById("next").disabled = false;
                outputText.innerHTML += " Click Next to continue.";
            }
        } else {
            outputText.innerHTML = questions[q_num]["hint"];
            outputText.style.color = 'red';
            document.getElementById("option1").disabled = true;
            document.getElementById("option2").disabled = true;

            if (q_num < questions.length - 1) {
                document.getElementById("next").disabled = false;
                outputText.innerHTML += " or Click Next.";
	    }
        }
    }

    document.getElementById("next").onclick = function() {
        document.getElementById("option1").disabled = false;
        document.getElementById("option2").disabled = false;

        q_num += 1;
        outputText.innerHTML = "";

        genQuestion(q_num);
    };
}
