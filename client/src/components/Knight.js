class Knight{
  constructor(x, y, color, gameState){
    this.x = x;
    this.y = y;
    this.color = color
    this.type = "knight"
    this.gameState = gameState
  }
  #canMoveTo(x, y){
    const piece = this.gameState[y][x];
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
export default Knight;