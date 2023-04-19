class King{
  constructor(x, y, color, gameState){
    this.x = x;
    this.y = y;
    this.color = color
    this.type = "king"
    this.gameState = gameState
  }
  #canMoveTo(x, y){
    const piece = this.gameState[y][x];
    if(piece == '' || piece.charAt(0) != this.color.charAt(0)){
      return true;
    }
    return false;
  }
  #isPieceAt(x, y){
    const piece = this.gameState[y][x];
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
    return moves;
  }
  updatedBoardState(moveX, moveY){
    var copy = [];
    for (var i = 0; i < this.gameState.length; i++) {
      copy[i] = [];
      for (var j = 0; j < this.gameState[i].length; j++) {
        copy[i][j] = this.gameState[i][j];
      }
    }
    var store = copy[this.y][this.x];
    copy[this.y][this.x] = '';
    copy[moveY][moveX] = store;
    return copy;
  }
}
export default King;