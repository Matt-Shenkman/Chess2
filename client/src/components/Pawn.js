import GameState from './GameState'

class Pawn{
  constructor(x, y, color, gameState, superPawn){
    this.x = x;
    this.y = y;
    this.color = color
    if(superPawn){
      this.type = "superpawn"
    }else{
      this.type = "pawn"
    }
    this.gameState = gameState
  }
  #isOppColorPieceAt(x, y, board){
    const piece = board[y][x];
    return piece != '' && piece.charAt(0) != this.color.charAt(0);
  }
  #isEmpty(x, y){
    const piece = this.gameState.board[y][x];
    return piece == '';
  }

  possibleMoves(){
    var moves = []
    if(this.color == "white"){
      if(this.y - 1 >= 0 && this.#isEmpty(this.x, this.y-1)){
        moves.push([this.y-1,this.x])
      }
      if(this.y == 6 && this.#isEmpty(this.x, this.y-1) && this.#isEmpty(this.x, this.y-2)){
        moves.push([this.y-2,this.x])
      }
    }else{
      if(this.y + 1 < 8 && this.#isEmpty(this.x, this.y+1)){
        moves.push([this.y+1,this.x])
      }
      if(this.y == 1 && this.#isEmpty(this.x, this.y+1) && this.#isEmpty(this.x, this.y+2)){
        moves.push([this.y+2,this.x])
      }
    }
    if(this.y + 1 < 8 && this.x + 1 < 8 && this.#isOppColorPieceAt(this.x + 1, this.y + 1 , this.gameState.board)){
      moves.push([this.y+1,this.x+1])
    }else if(this.y + 1 < 8 && this.x + 1 < 8 && this.color == "black" && this.gameState.epFile == this.x + 1 && this.gameState.epRank == this.y + 1){
      moves.push([this.y+1,this.x+1])
    }
    if(this.y + 1 < 8 && this.x - 1 >=0 && this.#isOppColorPieceAt(this.x - 1, this.y + 1 , this.gameState.board)){
      moves.push([this.y+1,this.x-1])
    }else if(this.y + 1 < 8 && this.x - 1 >=0 && this.color == "black" && this.gameState.epFile == this.x - 1 && this.gameState.epRank == this.y + 1){
      moves.push([this.y+1,this.x-1])
    }
    if(this.y - 1 >=0 && this.x + 1 < 8 && this.#isOppColorPieceAt(this.x + 1, this.y - 1 , this.gameState.board)){
      moves.push([this.y-1,this.x+1])
    }else if(this.y - 1 >=0 && this.x + 1 < 8 && this.color == "white" && this.gameState.epFile == this.x + 1 && this.gameState.epRank == this.y - 1){
      moves.push([this.y-1,this.x+1])
    }
    if(this.y - 1 >=0 && this.x - 1 >=0 && this.#isOppColorPieceAt(this.x - 1, this.y - 1 , this.gameState.board)){
      moves.push([this.y-1,this.x-1])
    }else if(this.y - 1 >=0 && this.x - 1 >=0 && this.color == "white" && this.gameState.epFile == this.x - 1 && this.gameState.epRank == this.y - 1){
      moves.push([this.y-1,this.x-1])
    }

    return moves;
  }
  updatedBoardState(moveX, moveY, promotion){
    var copy = [];
    for (var i = 0; i < this.gameState.board.length; i++) {
      copy[i] = [];
      for (var j = 0; j < this.gameState.board[i].length; j++) {
        copy[i][j] = this.gameState.board[i][j];
      }
    }
    var store = copy[this.y][this.x];
    copy[this.y][this.x] = '';
    if(this.color == 'white' && moveY == 0){
      if (promotion == "r"){
        copy[moveY][moveX] = 'wr'
      }else if (promotion == "q"){
        copy[moveY][moveX] = 'wq'
      }else if (promotion == "n"){
        copy[moveY][moveX] = 'wkn'
      }else if (promotion == "b"){
        copy[moveY][moveX] = 'wb'
      }
    }else if(this.color == 'black' && moveY == 7){
      if (promotion == "r"){
        copy[moveY][moveX] = 'br'
      }else if (promotion == "q"){
        copy[moveY][moveX] = 'bq'
      }else if (promotion == "n"){
        copy[moveY][moveX] = 'bkn'
      }else if (promotion == "b"){
        copy[moveY][moveX] = 'bb'
      }
    }else{
      if(moveX == this.gameState.epFile && moveY == this.gameState.epRank){
        if(this.color == "white"){
          copy[moveY+1][moveX] = '';
        }else{
          copy[moveY-1][moveX] = '';
        }
      }
      copy[moveY][moveX] = store;
    }
    var epRank = null;
    var epFile = null;
    if(Math.abs(moveY - this.y) == 2){
      epRank = (this.y + moveY)/2;
      epFile = this.x;
    }

    //if super pawn turn to pawns
    if(this.type == "superpawn"){
      for(var dy = -1; dy <=1 ; dy++){
        for(var dx = -1; dx <=1 ; dx++){
          if(dy != 0 || dx!= 0){
            if(moveY + dy < 8 && moveY + dy >= 0 && moveX + dx < 8 && moveX + dx >= 0){
              if(this.#isOppColorPieceAt(moveX + dx, moveY + dy , copy) && 
                copy[moveY + dy][moveX + dx]!= "bsp" && copy[moveY + dy][moveX + dx]!= "wsp"){
                  copy[moveY + dy][moveX + dx] = this.color == "white" ? "bp" : "wp";
              }
            }
          }
        }
      }
    }
    
    return new GameState(copy, epFile, epRank);
  }

}
export default Pawn;