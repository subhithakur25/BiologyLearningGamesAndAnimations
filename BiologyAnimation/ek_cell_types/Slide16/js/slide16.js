$(document).ready(function() {
    
    function showImageHint(event) {
        imageHints = ['Hint : Is there is a nucleus ?', 'Hint : What type of cells have flagella ?', 'Hint : Do you see a nucleus and organelles ?', 'Hint : Are there membrance bound organelles ?'];
        var hndlr = event.data.textHandler;
        var imageId = event.data.imageId;
        hndlr.html(imageHints[imageId-1]);
    }

    function evaluateAnswers(event) {
        var questions = event.data.rbButtonNames;
        var hndlr = event.data.textHandler;
        var answers = {
            'image1option': 'prokaryotic',
            'image2option': 'eukaryotic',
            'image3option': 'eukaryotic',
            'image4option': 'prokaryotic',
        }
        var correct = 0;
        for (var i = 0; i < questions.length; i=i+1) {
            var qName = questions[i];
            if ($('input[name="' + qName + '"]:checked').val() == answers[qName]) {
                correct = correct + 1;
            }
        }
        hndlr.html('You got ' + correct + ' out of ' + questions.length + ' correct !');
    }

    $("#image1").on('click', {imageId: 1, textHandler: $("#hint_text")}, showImageHint);
    $("#image2").on('click', {imageId: 2, textHandler: $("#hint_text")}, showImageHint);
    $("#image3").on('click', {imageId: 3, textHandler: $("#hint_text")}, showImageHint);
    $("#image4").on('click', {imageId: 4, textHandler: $("#hint_text")}, showImageHint);
    $("#submit_btn").on('click', {rbButtonNames: ["image1option", "image2option", "image3option", "image4option"], textHandler: $("#hint_text")}, evaluateAnswers);



});
