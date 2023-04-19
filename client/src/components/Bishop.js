class Bishop{
  constructor(x, y, color, gameState){
    this.x = x;
    this.y = y;
    this.color = color
    this.type = "bishop"
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
}
export default Bishop;