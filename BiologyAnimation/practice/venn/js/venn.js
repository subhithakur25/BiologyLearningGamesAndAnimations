$(document).ready(function() {
    var leftCircle = [];
    var rightCircle = [];
    var commonRegion = [];

    var leftCorrect = ["3", "4", "5", "7", "10"];
    var commonCorrect = ["2", "6", "9"];
    var rightCorrect = ["1", "8"];

    var moves = document.getElementById("moves");

    var removeFromArray = function(id) {
        var index = leftCircle.indexOf(id);
        if (index > -1) {
            leftCircle.splice(index, 1);
        }

        index = rightCircle.indexOf(id);
        if (index > -1) {
            rightCircle.splice(index, 1);
        }

        index = commonRegion.indexOf(id);
        if (index > -1) {
            commonRegion.splice(index, 1);
        }
    }

    $("#reset").prop('disabled', true);

    $(".answer").draggable({
        revert: "invalid",
        revertDuration: 0
    });

    $(".circle").droppable({
        drop: function(event, ui) {
            var draggableId = ui.draggable.attr("id");
            var droppableId = $(this).attr("id");

            removeFromArray(draggableId);

            if (droppableId == "c1") {
                leftCircle.push(draggableId);
            } else if (droppableId == "c2") {
                rightCircle.push(draggableId);
            }
        }
    });

    $(".common").droppable({
        over: function(event, ui) {
            $(".circle").droppable("disable");
        },

        out: function(event, ui) {
            $(".circle").droppable("enable");
        },

        drop: function(event, ui) {
            var draggableId = ui.draggable.attr("id");
            var droppableId = $(this).attr("id");

            removeFromArray(draggableId);

            commonRegion.push(draggableId);
            $(".circle").droppable("enable");
        }
    });

    $(".answer").dblclick(function() {
        $(this).css({'top':'', 'bottom':'', 'left':'', 'right':'', 'border':''});
        var id = $(this).attr("id");
        removeFromArray(id);
    });

    $("#submit").click(function() {
        moves.value -= 1;

        leftCircle.forEach(function(item, index) {
            var elem = document.getElementById(item);
            if (leftCorrect.includes(item)) {
               $("#" + item).css('border', '3px solid lime');
               $("#" + item).draggable("disable");
               $("#" + item).off("dblclick");
            } else {
               $("#" + item).css('border', '3px solid red');
            }
        });

        rightCircle.forEach(function(item, index) {
            var elem = document.getElementById(item);
            if (rightCorrect.includes(item)) {
               $("#" + item).css('border', '3px solid lime');
               $("#" + item).draggable("disable");
               $("#" + item).off("dblclick");
            } else {
               $("#" + item).css('border', '3px solid red');
            }
        });

        commonRegion.forEach(function(item, index) {
            var elem = document.getElementById(item);
            if (commonCorrect.includes(item)) {
               $("#" + item).css('border', '3px solid lime');
               $("#" + item).draggable("disable");
               $("#" + item).off("dblclick");
            } else {
               $("#" + item).css('border', '3px solid red');
            }
        });

        if (moves.value == 0) {
            $(".answer").draggable("disable");
            $(".answer").off("dblclick");
            $(".circle").droppable("disable");
            $(this).prop('disabled', true);
            $("#reset").prop('disabled', false);
        }
    });

    $("#reset").click(function() {
        $(".answer").draggable("enable");
        $(".circle").droppable("enable");
        $("#submit").prop('disabled', false);
        $("#reset").prop('disabled', true);

        moves.value = 3;

        $(".answer").each(function() {
            if (moves.value > 0) {
                $(this).css({'top':'', 'bottom':'', 'left':'', 'right':'', 'border':''});
                var id = $(this).attr("id");
                removeFromArray(id);

                $(".answer").draggable("enable");
                $(".circle").droppable("enable");

                $(".answer").dblclick(function() {
                    $(this).css({'top':'', 'bottom':'', 'left':'', 'right':'', 'border':''});
                    var id = $(this).attr("id");
                    removeFromArray(id);
                });
            }
        });
    });
});
