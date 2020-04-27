var board = new Array();
var hCed = new Array();
var score = 0;


$(document).ready(function () {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="grid-cell" id="g' + i + '-' + j + '"></div>');
        }
    }
    newgame();
});

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
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
            }
            else {
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            hCed[i][j] = false;
        }
    }

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
            if (moveLeft()) {
                setTimeout("KoneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 38://up
            if (moveUp()) {
                setTimeout("KoneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 39://right
            if (moveRight()) {
                setTimeout("KoneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 40://down
            if (moveDown()) {
                setTimeout("KoneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        default:
            break;
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