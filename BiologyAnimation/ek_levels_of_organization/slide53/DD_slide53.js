$(document).ready(function () {
    var move_to = function( $obj, $target){
        $parent = $obj.parent();
        $parent.detach($obj);
        $target.append($obj);
        update($parent);
        update($target);
    }
    var update = function($con){
        if($con.hasClass("question")){
            $children = $con.children();
            if($children.length == 0){
                $con.text($con.attr("id"));
            } 
            if($children.hasClass("answer")){
                $con.addClass("has-answer");
                $con.contents().each(function(){
                    if(!$(this).hasClass("answer")){
                        $(this).remove();
                    }
                });
            }else{
                $con.removeClass("has-answer");
            }
        }else if($con.hasClass("word-bank")){
        }
    }
    $(".answer").draggable({
            revert: "invalid",
            revertDuration: 0,
            stop:function(ev, ui){
                $q = $(this);
                $q.css("top", "");
                $q.css("left", "");
            },
            zIndex: 1
        });
    $(".question").droppable({
        accept: ".answer",
        tolerance: "pointer",
        addClasses: false,
        classes: {
            "ui-droppable-hover": "answer-hover"
        },
        drop: function(event, ui) {
            var $q = $(this);
            $ans = ui.draggable;
            if($q.hasClass("has-answer")){
                move_to($q.children(), $(".word-bank"));
            }
            move_to($ans, $q);
        }
    });
    $(".question").dblclick(function(){
        $q = $(this)
        if($q.hasClass("has-answer")){
            move_to($q.children(), $(".word-bank"));
        }
    });
    $( "#submit" ).click(function() {
        var num_wrong =0;
        $('.question').each(function() {
            $q = $(this);
            if(  $q.attr("id") == $q.children().attr("id")){
                $q.css('background', '#94FFBE');
                $q.children().draggable('disable');
                $q.droppable('disable');
                $q.off('dblclick');
            }else{
                num_wrong += 1;
				$q.children().draggable('disable');
                $q.droppable('disable');
                $q.off('dblclick');
                $q.css('background', '#BB2525');
            }
        });

        var $hint_content = $('.hint-content');
        if(num_wrong == 0){
            $hint_content.text('' );
            $hint_content.append('<p>You got them all right!</p>' );
        }else{
            $hint_content.text('' );
            $hint_content.append('<p>You got ' + num_wrong +' answers wrong.</p>' );
            $hint_content.append('<p>Hint: Go back and study the diagram in the section Organisms.</p>' );
        }
        $('.hint').css('visibility', 'visible');
    });

    $('.question').each(function(){
        update($(this));
    });

    $('.hint').click(function(){
        $(this).css("visibility", "hidden");
    });
});
