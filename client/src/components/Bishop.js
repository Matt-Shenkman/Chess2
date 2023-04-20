import GameState from './GameState'

class Bishop{
  constructor(x, y, color, gameState){
    this.x = x;
    this.y = y;
    this.color = color
    this.type = "bishop"
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
  possibleMoves(){
    var moves = []
    var dx = 1;
    var dy = 1;
    while(this.x + dx < 8 && this.y + dy < 8 && this.#canMoveTo(this.x + dx, this.y + dy)){
      moves.push([this.y + dy, this.x + dx]);
      if(this.#isPieceAt(this.x + dx, this.y + dy)){
        break;
      }
      dx++;
      dy++;
    }
    dx = 1;
    dy = 1;
    while(this.x + dx < 8 && this.y - dy >= 0 && this.#canMoveTo(this.x + dx, this.y - dy)){
      moves.push([this.y - dy, this.x + dx]);
      if(this.#isPieceAt(this.x + dx, this.y - dy)){
        break;
      }
      dx++;
      dy++;
    }
    dx = 1;
    dy = 1;
    while(this.x - dx >=0 && this.y + dy < 8 && this.#canMoveTo(this.x - dx, this.y + dy)){
      moves.push([this.y + dy, this.x - dx]);
      if(this.#isPieceAt(this.x - dx, this.y + dy)){
        break;
      }
      dx++;
      dy++;
    }
    dx = 1;
    dy = 1;
    while(this.x - dx >=0 && this.y - dy >= 0 && this.#canMoveTo(this.x - dx, this.y - dy)){
      moves.push([this.y - dy, this.x - dx]); 
      if(this.#isPieceAt(this.x - dx, this.y - dy)){
        break;
      }
      dx++;
      dy++;
    }

    if(this.x + 1 < 8 && !this.#isPieceAt(this.x+1,this.y)){
      moves.push([this.y,this.x+1])
    }
    if(this.x - 1 >= 0 && !this.#isPieceAt(this.x-1,this.y)){
      moves.push([this.y,this.x-1])
    }
    if(this.y - 1 >= 0 && !this.#isPieceAt(this.x,this.y-1)){
      moves.push([this.y-1,this.x])
    }
    if(this.y + 1 < 8 && !this.#isPieceAt(this.x,this.y+1)){
      moves.push([this.y+1,this.x])
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


    return new GameState(copy);
  }
}
export default Bishop;