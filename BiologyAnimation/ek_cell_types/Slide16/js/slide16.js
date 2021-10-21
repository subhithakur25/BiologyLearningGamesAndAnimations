$(document).ready(function() {
    function addEvent(event) {
        var p = event.data.element
        var q = event.data.image

        if (p.hasClass("showAnswer")) {

	} else if (p.hasClass("showImage")) {
            p.removeClass("showImage");
            p.addClass("showAnswer");

            column = p.attr('id');
            if (column == "column1") {

		$("#column2").on('click', {element: $("#column2"), image: $("#image2")}, addEvent);
                $("#column1").off('click');

                $(".prokaryote").css("background-color", "#808080");
                $(".prokaryote").css("color", "#808080");

	    } else if (column == "column2") {
                $("#column3").on('click', {element: $("#column3"), image: $("#image3")}, addEvent);
                $("#column2").off('click');

                $(".eukaryote").css("background-color", "#808080");
                $(".eukaryote").css("color", "#808080");

	    } else if (column == "column3") {
                $("#column4").on('click', {element: $("#column4"), image: $("#image4")}, addEvent);
                $("#column3").off('click');

                $(".prokaryote").css("background-color", "#808080");
                $(".prokaryote").css("color", "#808080");
	    } else if (column == "column4") {
                $("#column4").off('click');

                $(".eukaryote").css("background-color", "#808080");
                $(".eukaryote").css("color", "#808080");
	    }

	} else {
            q.css({opacity: 1});
            p.addClass("showImage");

            $(".prokaryote").css("background-color", "");
            $(".prokaryote").css("color", "black");
            $(".eukaryote").css("background-color", "");
            $(".eukaryote").css("color", "black");
        }
    }

    $("#column1").on('click', {element: $("#column1"), image: $("#image1")}, addEvent);
});
