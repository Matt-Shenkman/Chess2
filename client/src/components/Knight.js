import GameState from './GameState'

class Knight{
  constructor(x, y, color, gameState){
    this.x = x;
    this.y = y;
    this.color = color
    this.type = "knight"
    this.gameState = gameState
  }
  #canMoveTo(x, y){
    const piece = this.gameState.board[y][x];
    if(piece == '' || piece.charAt(0) != this.color.charAt(0)){
      return true;
    }
    return false;
  }
  possibleMoves(){
    var moves = []
    if(this.x + 2 < 8 && this.y - 1 >= 0 && this.#canMoveTo(this.x+2,this.y-1)){
      moves.push([this.y-1,this.x+2])
    }
    if(this.x - 2 >= 0 && this.y + 1 < 8 && this.#canMoveTo(this.x-2,this.y+1)){
      moves.push([this.y+1,this.x-2])
    }
    if(this.x + 2 < 8 && this.y + 1 < 8 && this.#canMoveTo(this.x+2,this.y+1)){
      moves.push([this.y+1,this.x+2])
    }
    if(this.x - 2 >= 0 && this.y - 1 >= 0 && this.#canMoveTo(this.x-2,this.y-1)){
      moves.push([this.y-1,this.x-2])
    }
    if(this.x + 1 < 8 && this.y - 2 >= 0 && this.#canMoveTo(this.x+1,this.y-2)){
      moves.push([this.y-2,this.x+1])
    }
    if(this.x - 1 >= 0 && this.y + 2 < 8 && this.#canMoveTo(this.x-1,this.y+2)){
      moves.push([this.y+2,this.x-1])
    }
    if(this.x + 1 < 8 && this.y + 2 < 8 && this.#canMoveTo(this.x+1,this.y+2)){
      moves.push([this.y+2,this.x+1])
    }
    if(this.x - 1 >= 0 && this.y - 2 >= 0 && this.#canMoveTo(this.x-1,this.y-2)){
      moves.push([this.y-2,this.x-1])
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
    copy[moveY][moveX] = store;

    if(this.color == 'white' && moveY == 0){
      copy[moveY][moveX] = 'wr';
    }else if(this.color == 'black' && moveY == 7){
      copy[moveY][moveX] = 'br';
    }

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
export default Knight;