class GameState{
  constructor(board, epFile, epRank, whiteTurn, whiteKingsideCastle, whiteQueensideCastle, blackKingsideCastle, blackQueensideCastle){
    this.board = board;
    this.epFile = epFile;
    this.epRank = epRank;
    this.whiteTurn = whiteTurn;
    this.whiteKingsideCastle = whiteKingsideCastle;
    this.whiteQueensideCastle = whiteQueensideCastle;
    this.blackKingsideCastle = blackKingsideCastle;
    this.blackQueensideCastle = blackQueensideCastle;
  }
}
export default GameState;