class Rook{
  constructor(x, y, color, gameState){
    this.x = x;
    this.y = y;
    this.color = color
    this.type = "rook"
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
  #isOppColorPieceAt(x, y){
    const piece = this.gameState[y][x];
    return piece != '' && piece.charAt(0) == this.color.charAt(0);
  }
  possibleMoves(){
    var moves = []
    var dx = 1;
    var dy = 1;
    while(this.x + dx < 8 && this.#canMoveTo(this.x + dx, this.y) && dx <= 3){
      moves.push([this.y, this.x + dx]);
      if(this.#isOppColorPieceAt(this.x + dx, this.y)){
        break;
      }
      dx++;
    }
    dx = 1;
    while(this.x - dx >= 0 && this.#canMoveTo(this.x - dx, this.y) && dx <= 3){
      moves.push([this.y, this.x - dx]);
      if(this.#isOppColorPieceAt(this.x - dx, this.y)){
        break;
      }
      dx++;
    }
    dy = 1;
    while(this.y + dy < 8 && this.#canMoveTo(this.x, this.y + dy) && dy <= 3){
      moves.push([this.y + dy, this.x]);
      if(this.#isOppColorPieceAt(this.x, this.y + dy)){
        break;
      }
      dy++;
    }
    dy = 1;
    while(this.y - dy >= 0 && this.#canMoveTo(this.x, this.y - dy) && dy <= 3){
      moves.push([this.y - dy, this.x]); 
      if(this.#isOppColorPieceAt(this.x, this.y - dy)){
        break;
      }
      dy++;
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
    return copy;
  }
}
export default Rook;