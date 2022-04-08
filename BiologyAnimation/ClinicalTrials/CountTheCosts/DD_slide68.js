$(document).ready(function () {
    var answered=[]
    var magicString = "position: relative; width: 90px; inset: 0px auto auto 0px; height: 15px"
    var moveBack = function(id){
        $('#'+id).attr("style", magicString);
    }
    $(".answer").draggable({
        revert: "invalid",
        revertDuration: 0,
        start:function(ev, ui){
        }
    });
    
    $(".question").droppable({
        out: function(event, ui) {
			if($.inArray($(this).text(), answered) < 0) {
                if($(this).attr("ans") == ui.draggable.attr('id')) {
                    $(this).css('background', '#34A0FF');
                    $(this).attr("ans", "");
                    $(this).text($(this).attr('qid'));
                }
            }
        },
        drop: function(event, ui) {
            if($.inArray($(this).text(), answered) < 0) {
                if ($(this).attr("ans") != ui.draggable.attr('id')) {
                    moveBack($(this).attr("ans"));
                }
                $(this).css('background', '#FFC707');
                $(this).attr("ans",ui.draggable.attr('id'));
                $(this).text("");
            } else {
                moveBack(ui.draggable.attr('id'));
            }
        }
    });
    $(".question").dblclick(function(){
        console.log($(this));
        if($.inArray($(this).attr("ans"), answered) < 0) {
            moveBack($(this).attr("ans"));
            $(this).css('background', '#34A0FF');
            $(this).attr("ans", 0);
            $(this).text($(this).attr('qid'));
        }
    });
    $( "#submit" ).click(function() {
        var correct =0;
        $('.question').each(function() {
            if($(this).attr("ans") == $(this).attr('qid')){
                correct=correct+1;
			    if($.inArray($(this).text(), answered) < 0)
				    answered.push($(this).text())
                $(this).css('background', '#94FFBE');
				$('#'+$(this).attr("ans")).draggable('disable');
            } else{
                
                if($(this).attr("ans")) {
                    $(this).css('background', '#BB2525');
                    moveBack($(this).attr("ans"));
                }
            }
        });

        if (correct == 11)
            alert( "You got " + correct +" answers correct.\n");
        else
            alert( "You got " + correct +" answers correct.\nHint: Go back and study the Costs of Clinical Trials section");
    });
});
