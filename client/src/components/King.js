import GameState from './GameState'

class King{
  constructor(x, y, color, gameState){
    this.x = x;
    this.y = y;
    this.color = color
    this.type = "king"
    this.gameState = gameState
    this.attackLL = false;
    this.attackL = false;
    this.attack = false;
    this.attackR = false;
    this.attackRR = false;
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
  possibleMoves(){
    var moves = [];
    if(this.x + 1 < 8 && this.#canMoveTo(this.x+1,this.y)){
      moves.push([this.y,this.x+1])
    }
    if(this.x - 1 >= 0 && this.#canMoveTo(this.x-1,this.y)){
      moves.push([this.y,this.x-1])
    }
    if(this.y - 1 >= 0 && this.#canMoveTo(this.x,this.y-1)){
      moves.push([this.y-1,this.x])
    }
    if(this.y + 1 < 8 && this.#canMoveTo(this.x,this.y+1)){
      moves.push([this.y+1,this.x])
    }
    if(this.x + 1 < 8 && this.y + 1 < 8 && this.#canMoveTo(this.x+1,this.y+1)){
      moves.push([this.y+1,this.x+1])
    }
    if(this.x - 1 >= 0 && this.y + 1 < 8 && this.#canMoveTo(this.x-1,this.y+1)){
      moves.push([this.y+1,this.x-1])
    }
    if(this.x + 1 < 8 && this.y - 1 >= 0 && this.#canMoveTo(this.x+1,this.y-1)){
      moves.push([this.y-1,this.x+1])
    }
    if(this.x - 1 >= 0 && this.y - 1 >= 0 && this.#canMoveTo(this.x-1,this.y-1)){
      moves.push([this.y-1,this.x-1])
    }
    if( !this.#isPieceAt(this.x+1 , this.y) && !this.#isPieceAt(this.x+2 , this.y)
    && !this.attack && !this.attackR && !this.attackRR
    && ((this.color == "white" && this.gameState.whiteKingsideCastle)|| 
    (this.color == "black" && this.gameState.blackKingsideCastle))){
      moves.push([this.y,this.x+2])
    }
    if( !this.#isPieceAt(this.x-1 , this.y) && !this.#isPieceAt(this.x-2 , this.y)
    && !this.#isPieceAt(this.x-3 , this.y) && !this.attack && !this.attackL && !this.attackLL 
    && ((this.color == "white" && this.gameState.whiteQueensideCastle)|| 
    (this.color == "black" && this.gameState.blackQueensideCastle))){
      moves.push([this.y,this.x-2])
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

    if(moveX - this.x == 2){
      copy[moveY][5] = this.color == "white" ? 'wr' : 'br';
      copy[moveY][7] = '';
    }else if(moveX - this.x == -2){
      copy[moveY][3] = this.color == "white" ? 'wr' : 'br';
      copy[moveY][0] = '';
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
    if(this.color == "white"){
      wK = false;
      wQ = false;
    }else{
      bK = false;
      bQ = false;
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
export default King;