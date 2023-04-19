class Queen{
  constructor(x, y, color, gameState){
    this.x = x;
    this.y = y;
    this.color = color
    this.type = "queen"
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
    //like bishop
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

    //like rook
    dx = 1;
    while(this.x + dx < 8 && this.#canMoveTo(this.x + dx, this.y)){
      moves.push([this.y + dy, this.x + dx]);
      if(this.#isPieceAt(this.x + dx, this.y)){
        break;
      }
      dx++;
    }
    dx = 1;
    while(this.x - dx >= 0 && this.#canMoveTo(this.x - dx, this.y)){
      moves.push([this.y, this.x - dx]);
      if(this.#isPieceAt(this.x - dx, this.y)){
        break;
      }
      dx++;
    }
    dy = 1;
    while(this.y + dy < 8 && this.#canMoveTo(this.x, this.y + dy)){
      moves.push([this.y + dy, this.x]);
      if(this.#isPieceAt(this.x, this.y + dy)){
        break;
      }
      dy++;
    }
    dy = 1;
    while(this.y - dy >= 0 && this.#canMoveTo(this.x, this.y - dy)){
      moves.push([this.y - dy, this.x]); 
      if(this.#isPieceAt(this.x, this.y - dy)){
        break;
      }
      dy++;
    }
    return moves;
  }
}
export default Queen;