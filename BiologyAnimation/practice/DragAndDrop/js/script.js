$(document).ready(function () {
    $(".draggable").draggable({
        revert: "invalid",
        revertDuration: 0,
		stop:function(event,ui){
			
		}
    });

    $(".dropzone").droppable({
        accept: function(d) { 
        	if(d.attr("id")+"a"==$(this).attr('id')){ 
            	return true;
        	}
    	},
        tolerance: "pointer",
        addClasses: false,
        classes: {
            "ui-droppable-hover": "answer-hover"
        },
        drop: function(event, ui) {
		    var draggable = ui.draggable;
		    var droppable = $(this);
		    draggable.appendTo("#" + draggable.attr("id") + "a");
		    draggable.css({width:'', height: '', top: '', left: ''});
		},
        out:function(event, ui) {
            $q = $(this);
        }
    });
});
