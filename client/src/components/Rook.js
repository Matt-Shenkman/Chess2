import GameState from './GameState'

class Rook{
  constructor(x, y, color, gameState){
    this.x = x;
    this.y = y;
    this.color = color
    this.type = "rook"
    this.gameState = gameState
  }
  #canMoveTo(x, y){
    const piece = this.gameState.board[y][x];
    if(piece == '' || piece.charAt(0) != this.color.charAt(0)){
      return true;
    }
    return false;
  }
  #isPieceAt(x, y){
    const piece = this.gameState.board[y][x];
    return piece != '';
  }
  #isSameColorPieceAt(x, y){
    const piece = this.gameState.board[y][x];
    return piece != '' && piece.charAt(0) == this.color.charAt(0);
  }
  possibleMoves(){
    var moves = []
    var dx = 1;
    var dy = 1;
    while(this.x + dx < 8 && this.#canMoveTo(this.x + dx, this.y) && dx <= 3){
      moves.push([this.y, this.x + dx]);
      if(this.#isSameColorPieceAt(this.x + dx, this.y)){
        break;
      }
      dx++;
    }
    dx = 1;
    while(this.x - dx >= 0 && this.#canMoveTo(this.x - dx, this.y) && dx <= 3){
      moves.push([this.y, this.x - dx]);
      if(this.#isSameColorPieceAt(this.x - dx, this.y)){
        break;
      }
      dx++;
    }
    dy = 1;
    while(this.y + dy < 8 && this.#canMoveTo(this.x, this.y + dy) && dy <= 3){
      moves.push([this.y + dy, this.x]);
      if(this.#isSameColorPieceAt(this.x, this.y + dy)){
        break;
      }
      dy++;
    }
    dy = 1;
    while(this.y - dy >= 0 && this.#canMoveTo(this.x, this.y - dy) && dy <= 3){
      moves.push([this.y - dy, this.x]); 
      if(this.#isSameColorPieceAt(this.x, this.y - dy)){
        break;
      }
      dy++;
    }
    return moves;
  }
  updatedBoardState(moveX, moveY){
    var copy = [];
    for (var i = 0; i < this.gameState.board.length; i++) {
      copy[i] = [];
      for (var j = 0; j < this.gameState.board[i].length; j++) {
        copy[i][j] = this.gameState.board[i][j];
      }
    }
    var store = copy[this.y][this.x];
    copy[this.y][this.x] = '';
    if(this.y == moveY){
      for(var j = 0; j <= Math.abs(this.x - moveX); j++){
        const bulldozedX = Math.min(this.x, moveX) + j;
        const bulldozedY = this.y;
        copy[bulldozedY][bulldozedX] = '';
      }
    }else {
      for(var j = 0; j <= Math.abs(this.y - moveY); j++){
        const bulldozedX = this.x;
        const bulldozedY = Math.min(this.y, moveY) + j;
        copy[bulldozedY][bulldozedX] = '';
      }
    }
    copy[moveY][moveX] = store;

    //if move into super pawn, turn to pawn
    for(var dy = -1; dy <=1 ; dy++){
      for(var dx = -1; dx <=1 ; dx++){
        if(dy != 0 || dx!= 0){
          if(moveY + dy < 8 && moveY + dy >= 0 && moveX + dx < 8 && moveX + dx >= 0){
            if(this.color == "white" && copy[moveY + dy][moveX + dx] == "bsp"){
              copy[moveY][moveX] = "wp";
            } else if(this.color == "black" && copy[moveY + dy][moveX + dx] == "wsp"){
              copy[moveY][moveX] = "bp";
            }
          }
        }
      }
    }

    var wK = this.gameState.whiteKingsideCastle;
    var wQ = this.gameState.whiteQueensideCastle;
    var bK = this.gameState.blackKingsideCastle;
    var bQ = this.gameState.blackQueensideCastle;
    if(this.color == "white" && this.x == 0 && this.y == 7){
      wQ = false;
    }else if(this.color == "white" && this.x == 7 && this.y == 7){
      wK = false;
    }else if(this.color == "black" && this.x == 0 && this.y == 0){
      bQ = false;
    }else if(this.color == "black" && this.x == 7 && this.y == 0){
      bK = false;
    }

    if(this.color == "black" && moveX == 0 && moveY == 7){
      wQ = false;
    }else if(this.color == "black" && moveX == 7 && moveY == 7){
      wK = false;
    }else if(this.color == "white" && moveX == 0 && moveY == 0){
      bQ = false;
    }else if(this.color == "white" && moveX == 7 && moveY == 0){
      bK = false;
    }
    return new GameState(copy, null, null, !this.gameState.whiteTurn, wK, wQ, bK, bQ);
  }
}
export default Rook;