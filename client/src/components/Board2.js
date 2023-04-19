import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import Knight from './Knight'
import Bishop from './Bishop'
import Queen from './Queen'
import King from './King'
import Rook from './Rook'

function sketch(p5, props) {
  let squareSize = 500/8;
  let boardWidth = squareSize * 8;
  let boardImg = ["/images/board-squares/White-Dark.svg", "/images/board-squares/Green-Dark.svg"];
  let whiteImg, greenImg, dot;
  let bRook, bKnight, bKing, bQueen, bBishop, bPawn;
  let wRook, wKnight, wKing, wQueen, wBishop, wPawn;
  var peices = [];
  var clickedPiece = null;
  var holdingPiece = false;
  var pressed = false;
  var possibleMoves = [];
  var gameState = props.gameState;

  var resetPieceArray = function(customGameState){
    peices = []
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const piece = customGameState[y][x];
        switch(piece){
          case 'bp': 
            //peices.push(new Pawn(x,y,"black", customGameState));
            break;
          case 'wp':
            //peices.push(new Pawn(x,y,"white", customGameState));
            break;
          case 'br':
            peices.push(new Rook(x,y,"black", customGameState))
            break;
          case 'wr':
            peices.push(new Rook(x,y,"white", customGameState))
            break;
          case 'bkn':
            peices.push(new Knight(x,y,"black", customGameState))
            break;
          case 'wkn':
            peices.push(new Knight(x,y,"white", customGameState))
            break;
          case 'bb':
            peices.push(new Bishop(x,y,"black", customGameState))
            break;
          case 'wb':
            peices.push(new Bishop(x,y,"white", customGameState))
            break;
          case 'bk':
            peices.push(new King(x,y,"black", customGameState))
            break;
          case 'wk':
            peices.push(new King(x,y,"white", customGameState))
            break;
          case 'bq':
            peices.push(new Queen(x,y,"black", customGameState))
            break;
          case 'wq':
            peices.push(new Queen(x,y,"white", customGameState))
            break;
        }
      }
    }
  }
  var setNewGameState = function(newGameState){
    for(var i = 0; i < peices.length; i++){
      peices[i].gameState = newGameState;
    }
  }
  var makeMove = function(mouseX, mouseY){
    for(let i = 0; i < possibleMoves.length; i++){
      if(Math.floor(mouseX/squareSize) == possibleMoves[i][1] && Math.floor(mouseY/squareSize) == possibleMoves[i][0]){
        //get new game state
        var newGameState = clickedPiece.updatedBoardState(possibleMoves[i][1], possibleMoves[i][0]);
        gameState = newGameState;
        //set to all pieces
        resetPieceArray(gameState);
      }
    }
    clickedPiece = null;
    holdingPiece = false;
    possibleMoves = []
  }

  p5.preload = () => {
    resetPieceArray(gameState);
    whiteImg = p5.loadImage(boardImg[0]);
    greenImg = p5.loadImage(boardImg[1]);
    wRook = p5.loadImage("/images/peices/w_rook.svg")
    wPawn = p5.loadImage("/images/peices/w_pawn.svg")
    wQueen = p5.loadImage("/images/peices/w_queen.svg")
    wKing = p5.loadImage("/images/peices/w_king.svg")
    wBishop = p5.loadImage("/images/peices/w_bishop.svg")
    wKnight = p5.loadImage("/images/peices/w_knight.svg")

    bRook = p5.loadImage("/images/peices/b_rook.svg")
    bPawn = p5.loadImage("/images/peices/b_pawn.svg")
    bQueen = p5.loadImage("/images/peices/b_queen.svg")
    bKing = p5.loadImage("/images/peices/b_king.svg")
    bBishop = p5.loadImage("/images/peices/b_bishop.svg")
    bKnight = p5.loadImage("/images/peices/b_knight.svg")

    dot = p5.loadImage("/images/dot.svg")
  };

  p5.setup = () => {
    p5.createCanvas(500, 500, p5.WEBGL);
    p5.canvas.style.border = "1px solid black";
  }

  p5.mousePressed = () => {
    pressed = true;
    const mouseX = p5.mouseX;
    const mouseY = p5.mouseY;
    
    //if press mouse and have not clicked a piece, then set the clicked piece to piece you clicked 
    if(!clickedPiece){
      for(let i = peices.length-1; i >= 0; i--){
        if(Math.floor(mouseX/squareSize) == peices[i].x && Math.floor(mouseY/squareSize) == peices[i].y){
          clickedPiece = peices[i];
          possibleMoves = clickedPiece.possibleMoves();
          //loop through all possible moves and see if they put the moving side in check
          for(let j = possibleMoves.length - 1; j >= 0; j--){
            var removedAlready = false;
            //set up possible position
            var possiblePostion = clickedPiece.updatedBoardState(possibleMoves[j][1], possibleMoves[j][0]);
            resetPieceArray(possiblePostion);
            //see if moving side is in check
            for(let k = 0; k < peices.length; k++){
              if(peices[k].color != clickedPiece.color){
                var opponentMoves = peices[k].possibleMoves();
                for(let l = 0 ; l < opponentMoves.length; l ++){
                  const pieceAttacked = possiblePostion[opponentMoves[l][0]][opponentMoves[l][1]];
                  if((pieceAttacked == 'wk' && clickedPiece.color == "white") || (pieceAttacked == 'bk' && clickedPiece.color == "black")){
                    if(!removedAlready){
                      possibleMoves.splice(j, 1);
                      removedAlready = true;
                    }
                  }
                }
              }
            }
            //reset position
            resetPieceArray(gameState);
          }
        }
      }
    }else{ // if press mouse piece is piece already clicked, then place piece if possible move
      makeMove(mouseX, mouseY)
    } 
  }
  p5.mouseDragged = () => {
    //if mouse pressed and dragging, then show piece in hand
    if(pressed){
      holdingPiece = true;
    }
  }
  p5.mouseReleased = () => {
    pressed = false;
    const mouseX = p5.mouseX;
    const mouseY = p5.mouseY;
    // if holding peice and piece released, then place if possible move
    if(holdingPiece){
      makeMove(mouseX, mouseY)
    }
    holdingPiece = false;
  }

  p5.draw = () => {
    //draw the board
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        if ((x + y) % 2 === 0) {
          p5.image(whiteImg, x * squareSize - 250, y * squareSize - 250, squareSize, squareSize);
        } else {
          p5.image(greenImg, x * squareSize - 250, y * squareSize-250, squareSize, squareSize);
        }
      }
    }
    //draw the pieces
    for(let i = 0; i < peices.length; i++){
      if (clickedPiece && clickedPiece.x == peices[i].x && clickedPiece.y == peices[i].y && holdingPiece){
        continue;
      }
      if(peices[i].type == "knight" && peices[i].color == "white"){
        p5.image(wKnight, peices[i].x * squareSize - 250, peices[i].y * squareSize - 250, squareSize, squareSize);
      }else if(peices[i].type == "knight"){
        p5.image(bKnight, peices[i].x * squareSize - 250, peices[i].y * squareSize - 250, squareSize, squareSize);
      }else if(peices[i].type == "bishop" && peices[i].color == "white"){
        p5.image(wBishop, peices[i].x * squareSize - 250, peices[i].y * squareSize - 250, squareSize, squareSize);
      }else if(peices[i].type == "bishop"){
        p5.image(bBishop, peices[i].x * squareSize - 250, peices[i].y * squareSize - 250, squareSize, squareSize);
      }else if(peices[i].type == "queen" && peices[i].color == "white"){
        p5.image(wQueen, peices[i].x * squareSize - 250, peices[i].y * squareSize - 250, squareSize, squareSize);
      }else if(peices[i].type == "queen"){
        p5.image(bQueen, peices[i].x * squareSize - 250, peices[i].y * squareSize - 250, squareSize, squareSize);
      }else if(peices[i].type == "king" && peices[i].color == "white"){
        p5.image(wKing, peices[i].x * squareSize - 250, peices[i].y * squareSize - 250, squareSize, squareSize);
      }else if(peices[i].type == "king"){
        p5.image(bKing, peices[i].x * squareSize - 250, peices[i].y * squareSize - 250, squareSize, squareSize);
      }else if(peices[i].type == "rook" && peices[i].color == "white"){
        p5.image(wRook, peices[i].x * squareSize - 250, peices[i].y * squareSize - 250, squareSize, squareSize);
      }else if(peices[i].type == "rook"){
        p5.image(bRook, peices[i].x * squareSize - 250, peices[i].y * squareSize - 250, squareSize, squareSize);
      }
    }
    //draw the piece if holding it 
    if(clickedPiece && holdingPiece){
      if(clickedPiece.type == "knight" && clickedPiece.color == "white"){
        p5.image(wKnight, p5.mouseX-250 - squareSize/2, p5.mouseY-250- squareSize/2, squareSize, squareSize);
      }else if(clickedPiece.type == "knight"){
        p5.image(bKnight, p5.mouseX-250 - squareSize/2, p5.mouseY-250- squareSize/2, squareSize, squareSize);
      }else if(clickedPiece.type == "bishop" && clickedPiece.color == "white"){
        p5.image(wBishop, p5.mouseX-250 - squareSize/2, p5.mouseY-250- squareSize/2, squareSize, squareSize);
      }else if(clickedPiece.type == "bishop"){
        p5.image(bBishop, p5.mouseX-250 - squareSize/2, p5.mouseY-250- squareSize/2, squareSize, squareSize);
      }else if(clickedPiece.type == "queen" && clickedPiece.color == "white"){
        p5.image(wQueen, p5.mouseX-250 - squareSize/2, p5.mouseY-250- squareSize/2, squareSize, squareSize);
      }else if(clickedPiece.type == "queen"){
        p5.image(bQueen, p5.mouseX-250 - squareSize/2, p5.mouseY-250- squareSize/2, squareSize, squareSize);
      }else if(clickedPiece.type == "king" && clickedPiece.color == "white"){
        p5.image(wKing, p5.mouseX-250 - squareSize/2, p5.mouseY-250- squareSize/2, squareSize, squareSize);
      }else if(clickedPiece.type == "king"){
        p5.image(bKing, p5.mouseX-250 - squareSize/2, p5.mouseY-250- squareSize/2, squareSize, squareSize);
      }else if(clickedPiece.type == "rook" && clickedPiece.color == "white"){
        p5.image(wRook, p5.mouseX-250 - squareSize/2, p5.mouseY-250- squareSize/2, squareSize, squareSize);
      }else if(clickedPiece.type == "rook"){
        p5.image(bRook, p5.mouseX-250 - squareSize/2, p5.mouseY-250- squareSize/2, squareSize, squareSize);
      }
    }
    //draw possible move dots
    for(let i = 0; i < possibleMoves.length; i++){
      p5.tint(255, 100);
      p5.image(dot, possibleMoves[i][1] * squareSize - 250, possibleMoves[i][0] * squareSize - 250, squareSize, squareSize);
      p5.tint(255, 255);
    }
  };
}

function SketchComponent (props) {
  return <ReactP5Wrapper sketch={(p5) => sketch(p5, props)}/>;
}

export default SketchComponent;