var board = new Array();
var hCed = new Array();
var score = 0;
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function () {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="grid-cell" id="g' + i + '-' + j + '"></div>');
        }
    }
    prepareForMobile();
    newgame();
});
function prepareForMobile() {
    if (documentWidth > 500) {
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }
    $("#grid-container").css("width", gridContainerWidth - 2 * cellSpace);
    $("#grid-container").css("height", gridContainerWidth - 2 * cellSpace);
    $("#grid-container").css("padding", cellSpace);
    $("#grid-container").css("border-radius", gridContainerWidth * 0.02);

    $(".grid-cell").css("width", cellSideLength);
    $(".grid-cell").css("height", cellSideLength);
    $(".grid-cell").css("border-radius", 0.02 * cellSideLength);
}
function newgame() {
    //初始化
    init();
    KoneNumber();
    KoneNumber();
}
function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $("#number-cell-" + i + "-" + j + " ");
            if (board[i][j] == 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j) + cellSideLength / 2);
                theNumberCell.css('left', getPosLeft(i, j) + cellSideLength / 2);
            }
            else {
                theNumberCell.css('width', cellSideLength);
                theNumberCell.css('height', cellSideLength);
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            hCed[i][j] = false;
        }
    }
    $(".number-cell").css("line-height", cellSideLength + "px");
    $(".number-cell").css("font-size", 0.6 * cellSideLength + "px");
}
function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridcell = $("#g" + i + "-" + j);
            gridcell.css('top', getPosTop(i, j));
            gridcell.css('left', getPosLeft(i, j));
        }
    }
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hCed[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hCed[i][j] = false;
        }
    }
    updateBoardView();

}
function KoneNumber() {
    if (nospace(board)) {
        return false;
    }
    //随机位置1
    // var randx = parseInt(Math.floor(Math.random() * 4));
    // var randy = parseInt(Math.floor(Math.random() * 4));
    // while (true) {
    //     if (board[randx][randy] == 0) {
    //         break;
    //     }
    //     var randx = parseInt(Math.floor(Math.random() * 4));
    //     var randy = parseInt(Math.floor(Math.random() * 4));
    // }
    //随机位置2
    var haveSpace = new Array();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                var temp = new Array(i, j);
                haveSpace.push(temp);
            }
        }
    }
    var pos = parseInt(Math.floor(Math.random() * haveSpace.length));
    var randx = haveSpace[pos][0];
    var randy = haveSpace[pos][1];
    //随机数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    //随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);
    return true;
}
$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37://left
            event.preventDefault();
            if (moveLeft()) {
                setTimeout("KoneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 38://up
            event.preventDefault();
            if (moveUp()) {
                setTimeout("KoneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 39://right
            event.preventDefault();
            if (moveRight()) {
                setTimeout("KoneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 40://down
            event.preventDefault();
            if (moveDown()) {
                setTimeout("KoneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        default:
            break;
    }
});

document.addEventListener("touchstart", function (event) {
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});
document.addEventListener("touchmove", function (event) {
    event.preventDefault();
},{ passive: false });
///{ passive: false }
/// elem.addEventListener('touchstart',fn, { passive: false });
document.addEventListener("touchend", function (event) {
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;
    //如果在棋盘格外触控,不进行滑动
    var containerY = $('#grid-container').offset().top;
    if (containerY >= starty)
        return true;
    /////////////////////////////
    if (Math.abs(deltax) < 0.3 * documentWidth && Math.abs(deltay) < 0.3 * documentWidth) {
        return;
    }
    if (Math.abs(deltax) >= Math.abs(deltay)) {
        if (deltax > 0) {
            if (moveRight()) {
                setTimeout("KoneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
        }//moveright
        else {
            if (moveLeft()) {
                setTimeout("KoneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
        }//moveleft
    }
    else {
        if (deltay > 0) {
            if (moveDown()) {
                setTimeout("KoneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
        }//movedown
        else {
            if (moveUp()) {
                setTimeout("KoneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
        }//moveup
    }
});
function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockRow(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockRow(i, k, j, board) && !hCed[i][k]) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add socre
                        score += board[i][k];
                        updateScore(score);
                        hCed[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}
function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockRow(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockRow(i, j, k, board) && !hCed[i][k]) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add socre
                        score += board[i][k];
                        updateScore(score);
                        hCed[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}
function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockLine(j, k, i, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[k][j] == board[i][j] && noBlockLine(j, k, i, board) && !hCed[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add socre
                        score += board[k][j];
                        updateScore(score);
                        hCed[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}
function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockLine(j, i, k, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[k][j] == board[i][j] && noBlockLine(j, i, k, board) && !hCed[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add socre
                        score += board[k][j];
                        updateScore(score);
                        hCed[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}
function isgameover() {
    if (nospace(board) && nomove(board)) {
        alert("game over!");
    }
}