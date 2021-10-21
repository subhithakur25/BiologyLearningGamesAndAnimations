$(document).ready(function() {
  var clicked = [];
  var currentRow = '';

  var tbmatches = {"image1": "image5", "image2": "image4", "image3": "image1", "image4": "image3", "image5": "image2"};
  var btmatches = {"image1": "image3", "image2": "image5", "image3": "image4", "image4": "image2", "image5": "image1"};

  var tmatches = [];
  var bmatches = [];

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.lineWidth = 3;

  $(".imageList").click(function() {
    imageId = $(this).attr("id");

    if (alreadyMatched($(this).parent().attr("class"), imageId)) {
      return;
    }

    if (clicked.length == 0 || currentRow != $(this).parent().attr("class")) {
      currentRow = $(this).parent().attr("class");

      if (clicked.length == 0) {
        clicked.push(imageId);
        $(this).css("border-color", "yellow");
      
      } else if (clicked.length == 1) {
        rowId = clicked.pop();
        if (currentRow == "row-2") {
          if (tbmatches[rowId] == imageId) {
            bmatches.push(imageId);
            tmatches.push(rowId);

            borderTurnsGreen("ul.row-2 li#" + imageId, "ul.row-1 li#" + rowId);
            drawLine(rowId);
            
          } else {
            let slide_name = [getSlideName(rowId), getSlideName(imageId)];
            $("#Hint").text(`Hint:  Look at the slide on ${slide_name[0]}, and ${slide_name[1]}`);
            borderTurnsRed("ul.row-2 li#" + imageId, "ul.row-1 li#" + rowId);
          }
        } else if (currentRow == "row-1") {
          if (btmatches[rowId] == imageId) {
            bmatches.push(rowId);
            tmatches.push(imageId);

            borderTurnsGreen("ul.row-1 li#" + imageId, "ul.row-2 li#" + rowId);        
            drawLine(imageId);

          } else {
            let slide_name = [getSlideName(imageId), getSlideName(rowId)];
            $("#Hint").text(`Hint:  Look at the slide on ${slide_name[0]}, and ${slide_name[1]}`);
            borderTurnsRed("ul.row-1 li#" + imageId, "ul.row-2 li#" + rowId);
          }
        }
      }
    }

    function getSlideName(elem) {
      var slides = ['Mitochondria', 'Nucleus', 'Cell membrane', 'Cytoskeleton', 'Lysosome and Vacuole'];
      var id = parseInt(elem.replace("image", ""));
      return slides[id - 1];
    }

    function borderTurnsGreen(row1, row2) {
      $(row1).css("border-color", 'rgb(124, 252, 0)');
      $(row2).css("border-color", 'rgb(124, 252, 0)');
    }

    function borderTurnsRed(row1, row2) {
      $(row1).css("border-color", "red");
      $(row2).css("border-color", "red");

      setTimeout(function() {
        $(row1).css("border-color", "black");
        $(row2).css("border-color", "black");
        $("#Hint").text("");
      }, 1000);
    }

    function alreadyMatched(row, imageId) {
      if (row == "row-1") {
        if (tmatches.includes(imageId)) {
          return true;
        }
      } else {
        if (bmatches.includes(imageId)) {
          return true;
        }
      }

      return false;
    }

    function drawLine(imageId) {
      ctx.beginPath();
      
      switch (imageId) {
        case "image1":
          ctx.moveTo(110, 234);
          ctx.lineTo(784, 325);
          break;
        case "image2":
          ctx.moveTo(280, 234);
          ctx.lineTo(620, 325);
          break;
        case "image3":
          ctx.moveTo(450, 234);
          ctx.lineTo(110, 325);
          break;
        case "image4":
          ctx.moveTo(620, 234);
          ctx.lineTo(450, 325);
          break;
        case "image5":
          ctx.moveTo(784, 234);
          ctx.lineTo(264, 325);
          break;
      }

      ctx.stroke();
    }
    
  });
});
