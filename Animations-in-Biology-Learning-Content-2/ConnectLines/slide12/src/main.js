window.onload = () => {
  const c = document.getElementById("canvas");
  const ctx = c.getContext("2d");
  const result = document.getElementById("result");
  const image = document.getElementById("brain");
  let tries = 0;

  const config = {
    boxesLeft: [
      { content: "Digesting your lunch", side: "left", answer: 1 },
      {
        content:
          "Recalling information about the nervous system in order to answer a test question",
        side: "left",
        answer: 0,
      },
      { content: "Riding a bicycle", side: "left", answer: 2 },
    ],
    boxesRight: [
      { content: "", x: 400, y: 100, width: 125, height: 60, side: "right" },
      { content: "", x: 440, y: 250, width: 140, height: 60, side: "right" },
      { content: "", x: 730, y: 280, width: 150, height: 60, side: "right" },
    ],
  };

  function drawBox(x, y, width, height, box) {
    function getLines(ctx, text, maxWidth) {
      var words = text.split(" ");
      var lines = [];
      var currentLine = words[0];

      for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
          currentLine += " " + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      lines.push(currentLine);
      return lines;
    }

    if (box.x) {
      x = box.x;
    } else {
      box.x = x;
    }
    if (box.y) {
      y = box.y;
    } else {
      box.y = y;
    }
    if (box.width) {
      width = box.width;
    } else {
      box.width = width;
    }
    if (box.height) {
      height = box.height;
    } else {
      box.height = height;
    }

    ctx.strokeStyle = "rgba(0,0,0,0.5)";
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.stroke();
    ctx.fillStyle = "rgba(0,0,0,1)";

    ctx.font = "15px Comic Sans MS";
    ctx.textAlign = "center";
    const lines = getLines(ctx, box.content, width);
    lines.forEach((line, i) => {
      ctx.fillText(line, x + width / 2, y + 15 * (i + 4 - lines.length / 2));
    });

    box.topLeftCorner = { x, y };
    box.bottomRightCorner = { x: x + width, y: y + height };
  }

  function drawBoxes() {
    config.boxesLeft.forEach((box, i) => {
      const x = 40;
      const y = 40 + i * 150;
      const width = 150;
      const height = 100;

      drawBox(x, y, width, height, box);

      box.drawPoint = { x: x + width + 1, y: y + height / 2 };
    });

    config.boxesRight.forEach((box, i) => {
      drawBox(box.x, box.y, box.width, box.height, box);

      box.drawPoint = { x: box.x - 1, y: box.y + box.height / 2 };
    });
  }

  function drawLine(point1, point2) {
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.stroke();
  }

  function drawLines() {
    config.boxesLeft.forEach((box) => {
      if (box.line) {
        drawLine(box.drawPoint, box.line.drawPoint);
      }
    });
  }

  function drawLineBetweenBoxes(box1, box2) {
    const point1 = box1.drawPoint;
    const point2 = box2.drawPoint;

    // check if there already exists a line
    if (box1.line) {
      box1.line.line = null;
      box1.line = null;
      drawEverything();
    }

    if (box2.line) {
      box2.line.line = null;
      box2.line = null;
      drawEverything();
    }

    drawLine(point1, point2);

    box1.line = box2;
    box2.line = box1;
  }

  function drawConnectors() {
    function drawDot(pos) {
      ctx.fillStyle = "rgba(0,0,0,0.8)";
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 3, 0, 2 * Math.PI);
      ctx.fill();
    }

    config.boxesLeft.forEach((box) => {
      drawDot(box.drawPoint);
    });
    config.boxesRight.forEach((box) => {
      drawDot(box.drawPoint);
    });
  }

  function drawEverything() {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(image, 400, 100, 471, 224);
    drawBoxes();
    drawLines();
    drawConnectors();
  }

  function getBoxFromPos(pos) {
    function isPosInBox(box) {
      const buffer = 20;
      return (
        pos.x > box.topLeftCorner.x - buffer &&
        pos.x < box.bottomRightCorner.x + buffer &&
        pos.y > box.topLeftCorner.y - buffer &&
        pos.y < box.bottomRightCorner.y + buffer
      );
    }

    return (
      config.boxesLeft.find(isPosInBox) || config.boxesRight.find(isPosInBox)
    );
  }
  
  var btn = document.getElementById("submit");
  btn.onclick = function(){
    let complete = true;
    let win = true;
    config.boxesLeft.forEach((box) => {
      complete = complete && box.line;
      win = win && box.line === config.boxesRight[box.answer];
    });

    setTimeout(() => {
      if (complete) {
        if (win) {
          result.innerText = "That's Correct! Good Job!";
          result.style.color = "#009933";
        } else {
          result.innerText = "Wrong. Try Again.";
          result.style.color = "#FF0000";
          tries++;

          const curTries = tries;

        }
      } else{
        result.innerText = "Please connect all 3 lines";
        result.style.color = "#FF0000";
        tries++;
      }
    }, 10);
  }


  function setupMouseListener() {
    let isDragging = false;
    let startPos;
    let lastTouch;

    function getCursorPosition(canvas, event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      return { x, y };
    }

    function onDown(e) {
      isDragging = true;
      startPos = getCursorPosition(c, e);
    }

    function onUp(e) {
      isDragging = false;

      const endPos = getCursorPosition(c, e);
      const boxStart = getBoxFromPos(startPos);
      const boxEnd = getBoxFromPos(endPos);
      if (boxStart && boxEnd && boxStart.side != boxEnd.side) {
        drawLineBetweenBoxes(boxStart, boxEnd);
        checkEnd();
      }
    }

    c.addEventListener("mousedown", onDown);

    c.addEventListener("mouseup", onUp);

    c.addEventListener("touchstart", (e) => {
      onDown(e.touches[0]);
      lastTouch = e.touches[0];
    });

    c.addEventListener("touchmove", (e) => {
      lastTouch = e.touches[0];
    });

    c.addEventListener("touchend", (e) => {
      onUp(lastTouch);
    });
  }

  function updateCanvasResolution() {
    const compStyles = window.getComputedStyle(c);
    c.width = compStyles.width.substr(0, compStyles.width.length - 2);
    c.height = compStyles.height.substr(0, compStyles.height.length - 2);
  }

  // canvas, context are defined
  function render() {
    try {
      updateCanvasResolution();
      drawEverything();
    } catch (error) {
      console.log(error);
    }
    requestAnimationFrame(render);
  }

  render();
  setupMouseListener();
};
