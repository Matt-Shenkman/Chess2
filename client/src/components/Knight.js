class Knight{
  constructor(x, y, gameState){
    this.x = x;
    this.y = y;
    this.type = "knight"
    this.gameState = gameState
  }
  possibleMoves(){
    var moves = []
    if(this.x + 2 < 8 && this.y - 1 >= 0 && this.gameState[this.y-1][this.x + 2] == ''){
      moves.push([this.y-1,this.x+2])
    }
    if(this.x - 2 >= 0 && this.y + 1 < 8 && this.gameState[this.y+1][this.x - 2] == ''){
      moves.push([this.y+1,this.x-2])
    }
    if(this.x + 2 < 8 && this.y + 1 < 8 && this.gameState[this.y+1][this.x + 2] == ''){
      moves.push([this.y+1,this.x+2])
    }
    if(this.x - 2 >= 0 && this.y - 1 >= 0 && this.gameState[this.y-1][this.x - 2] == ''){
      moves.push([this.y-1,this.x-2])
    }
    if(this.x + 1 < 8 && this.y - 2 >= 0 && this.gameState[this.y-2][this.x + 1] == ''){
      moves.push([this.y-2,this.x+1])
    }
    if(this.x - 1 >= 0 && this.y + 2 < 8 && this.gameState[this.y+2][this.x - 1] == ''){
      moves.push([this.y+2,this.x-1])
    }
    if(this.x + 1 < 8 && this.y + 2 < 8 && this.gameState[this.y+2][this.x + 1] == ''){
      moves.push([this.y+2,this.x+1])
    }
    if(this.x - 1 >= 0 && this.y - 2 >= 0 && this.gameState[this.y-2][this.x - 1] == ''){
      moves.push([this.y-2,this.x-1])
    }
    return moves;
  }
}
export default Knight;