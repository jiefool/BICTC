$(document).ready(function(){
  var windowWidth = window.screen.availWidth;
  if (windowWidth > 360){
    canvasWidth = windowWidth/3;
  } else {
    canvasWidth = windowWidth - 60;
  }
  $("#c").width(canvasWidth);
});


var canvas = document.getElementById('c').getContext('2d');
    cells = [];



init();

function init() {
    for (var i=0; i<23; i++) {
        cells[i] = [];
        for (var j=0; j<17; j++) {
            cells[i][j] = -1;
        }
    }

    // Prefilled cells
    [
        [13,1,0],[14,1,0],[11,2,0],[12,2,0],[13,2,0],[14,2,0],
        [15,2,0],[16,2,0],[10,3,0],[11,3,0],[12,3,0],[13,3,0],
        [14,3,0],[15,3,0],[16,3,0],[17,3,0],[9,4,0],[10,4,0],
        [11,4,0],[12,4,0],[13,4,0],[14,4,0],[15,4,0],[16,4,0],
        [17,4,0],[18,4,0],[19,4,0],[9,5,0],[10,5,0],[11,5,0],
        [12,5,0],[13,5,0],[14,5,0],[15,5,0],[16,5,0],[17,5,0],
        [18,5,0],[19,5,0],[20,5,0],[7,6,0],[8,6,0],[9,6,0],
        [10,6,0],[11,6,0],[12,6,0],[13,6,0],[14,6,0],[15,6,0],
        [16,6,0],[17,6,0],[18,6,0],[19,6,0],[20,6,0],[5,7,0],
        [6,7,0],[7,7,0],[8,7,0],[9,7,0],[10,7,0],[11,7,0],
        [12,7,0],[13,7,0],[14,7,0],[15,7,0],[16,7,0],[17,7,0],
        [18,7,0],[19,7,0],[20,7,0],[4,8,1],[5,8,1],[6,8,1],
        [7,8,1],[8,8,1],[9,8,1],[10,8,1],[11,8,0],[12,8,0],
        [13,8,0],[14,8,0],[15,8,0],[16,8,0],[17,8,0],[18,8,0],
        [19,8,0],[4,9,1],[5,9,1],[6,9,1],[7,9,1],[8,9,1],
        [9,9,1],[10,9,1],[11,9,1],[12,9,0],[13,9,0],[14,9,0],
        [15,9,0],[16,9,0],[17,9,0],[18,9,0],[19,9,0],[20,9,0],
        [3,10,1],[4,10,1],[5,10,1],[6,10,1],[7,10,1],[8,10,1],
        [9,10,1],[10,10,1],[11,10,1],[12,10,0],[13,10,0],
        [14,10,0],[15,10,0],[16,10,0],[17,10,0],[18,10,0],
        [19,10,0],[20,10,0],[21,10,0],[3,11,1],[4,11,1],
        [5,11,1],[6,11,1],[7,11,1],[8,11,1],[9,11,1],[10,11,1],
        [11,11,1],[12,11,0],[13,11,0],[14,11,0],[15,11,0],
        [16,11,0],[17,11,0],[20,11,0],[5,12,1],[6,12,1],
        [7,12,1],[8,12,1],[9,12,1],[10,12,1],[11,12,1],
        [12,12,0],[13,12,0],[14,12,0],[15,12,0],[16,12,0],
        [3,13,1],[4,13,1],[5,13,1],[6,13,1],[7,13,1],[8,13,1],
        [9,13,1],[10,13,1],[11,13,1],[12,13,0],[13,13,0],
        [14,13,0],[15,13,0],[1,14,1],[2,14,1],[3,14,1],[4,14,1],
        [6,14,1],[7,14,1],[8,14,1],[9,14,1],[10,14,1],[11,14,1],
        [12,14,0],[13,14,0],[14,14,0],[2,15,1],[3,15,1],
        [9,15,1],[10,15,1],[11,15,1]
    ]
    .forEach(function(point) {
        cells[point[0]][point[1]] = point[2];
    });
    draw();
}

function update() {

    var result = [];

    /* Return amount of alive neighbours for a cell */
    function _countNeighbours(x, y) {
        var amount = 0;

        function _isFilled(x, y) {
            filled = 0;
            if (x > -1 && x < 23 && y > -1 && y < 17)
            {
                if (cells[x][y] == 1)
                    {filled = 1;}
            }
            return filled;
        }

        if (_isFilled(x-1, y-1)) amount++;
        if (_isFilled(x,   y-1)) amount++;
        if (_isFilled(x+1, y-1)) amount++;
        if (_isFilled(x-1, y  )) amount++;
        if (_isFilled(x+1, y  )) amount++;
        if (_isFilled(x-1, y+1)) amount++;
        if (_isFilled(x,   y+1)) amount++;
        if (_isFilled(x+1, y+1)) amount++;

        return amount;
    }

    cells.forEach(function(row, x) {
        result[x] = [];
        row.forEach(function(cell, y) {
            var alive = 0;
            if (cell == -1) {
                alive = -1;
                // console.log(x,y);
            }
            else
            {
                var count = _countNeighbours(x, y);
                if (cell > 0) {
                    alive = count === 2 || count === 3 ? 1 : 0;
                } else {
                    alive = count === 3 ? 1 : 0;
                }
            }

            result[x][y] = alive;
        });
    });

    cells = result;

    draw();
}

function draw() {
    canvas.clearRect(0, 0, 480, 360);
    cells.forEach(function(row, x) {
        row.forEach(function(cell, y) {
            canvas.beginPath();
            switch (cell) {
                case -1:
                    color = "rgba(255, 255, 255, 0)";
                    break;
                case 0:
                    color = "#4DA6E7";
                    break;
                case 1:
                    color = "#040858";
                    break;
            }
            canvas.fillStyle = color;
            canvas.arc(x*20+10, y*20+10, 9, 0, Math.PI*2, true);
            canvas.fill();
            canvas.closePath()
        });
    });
    setTimeout(function() {update();}, 500);
}
