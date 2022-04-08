$(document).ready(function () {
    var answers= $("#word-bank");
    data.sort(() => .5 - Math.random());
    data.forEach(function (item) {
        console.log(item);
        answers.append($(`<div class="answer" id="${item["id"]}" >${item["value"]}</div>`))
    });
    var move_to = function($obj, $target) {
        $parent = $obj.parent();
        $parent.detach($obj);
        $target.append($obj);
        update($parent);
        update($target);
    }

    var update = function($con) {
        if ($con.hasClass("dropBox")) {
            $children = $con.children();
            if ($children.length == 0) {
                $con.text($con.attr("id"));
            }

            if ($children.hasClass("answer")) {
                $con.addClass("has-answer");
                 $con.css("background", "");
                index = $con.attr("id").substring(1);
                $("#"+ index).css("color", "");
                $con.contents().each(function() {
                    if (!$(this).hasClass("answer")) {
                        $(this).remove();
                    }
                });
            } else {
                $con.removeClass("has-answer");
            }
        } else if ($con.hasClass("word-bank")) {
        }
    }
	$(".answer").draggable({
        revert: "invalid",
        revertDuration: 0,
        stop:function(ev, ui) {
            $q = $(this);
            $q.css("top", "");
            $q.css("left", "");
        },

        zIndex: 1
    });

    $(".dropBox").droppable({
        accept: ".answer",
        tolerance: "pointer",
        addClasses: false,
        classes: {
            "ui-droppable-hover": "answer-hover"
        },

        drop: function(event, ui) {
            var $q = $(this);
            $ans = ui.draggable;

            $q.removeClass('incorrect');

            if ($q.hasClass("has-answer")) {
                move_to($q.children(), $(".word-bank"));
            }

            move_to($ans, $q);
        },

        out: function(event, ui) {
            $q = $(this);
            $q.removeClass('correct');
            $q.removeClass('incorrect');
        }
    });

    $(".dropBox").dblclick(function() {
        $q = $(this)
        if ($q.hasClass("has-answer")) {
            move_to($q.children(), $(".word-bank"));
            $q.removeClass('correct');
            $q.removeClass('incorrect');
        }
    });

    $("#submit").click(function() {
        var numCorrect = 0;
        $('.dropBox').each(function() {
            $q = $(this);
            // if ($q.attr("id") == "#" + $q.children().attr("id")) {
if ( $q.children().attr("id") <=6 )
    
{
                numCorrect += 1;
                $q.addClass('correct');
                $q.children().draggable('disable');
                $q.droppable('disable');
                $q.off('dblclick');
            } else {
                if ($q.hasClass("has-answer")) {
                    $q.addClass('incorrect');
                }
                
				$q.children().draggable('enable');
                $q.droppable('enable');
               
            }
             $q.css("background", "");
            if ($q.hasClass("has-answer")) {
                 index = $q.attr("id").substring(1);
                 $("#"+ index).css("color", "");
            }
        });
        
         $('#result').text(`You matched ${numCorrect}/6  options correctly!`);

        window.setTimeout(function() {
            $('#result').text('');
        }, 2500)
    });
});