import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import Knight from './Knight'
import Bishop from './Bishop'
import Queen from './Queen'

function sketch(p5, props) {
  let squareSize = 500/8;
  let boardWidth = squareSize * 8;
  let boardImg = ["/images/board-squares/White-Dark.svg", "/images/board-squares/Green-Dark.svg"];
  let whiteImg, greenImg, dot;
  let bRook, bKnight, bKing, bQueen, bBishop, bPawn;
  let wRook, wKnight, wKing, wQueen, wBishop, wPawn;
  let peices = [new Knight(1,1, "white", props.gameState), new Knight(3,1, "black",props.gameState), new Knight(5,1, "black",props.gameState), new Bishop(0,0,"white", props.gameState), new Queen(7,7,"black", props.gameState)]
  var clickedPiece = null;
  var holdingPiece = false;
  var pressed = false;
  var possibleMoves = [];

  var makeMove = function(mouseX, mouseY){
    for(let i = 0; i < possibleMoves.length; i++){
      if(Math.floor(mouseX/squareSize) == possibleMoves[i][1] && Math.floor(mouseY/squareSize) == possibleMoves[i][0]){
        for(let j = peices.length-1; j >= 0; j--){
          if(peices[j].x == possibleMoves[i][1] && peices[j].y == possibleMoves[i][0]){
            peices.splice(j, 1);
          }
        }
        var store = props.gameState[clickedPiece.y][clickedPiece.x];
        props.gameState[clickedPiece.y][clickedPiece.x] = '';
        clickedPiece.x = possibleMoves[i][1];
        clickedPiece.y = possibleMoves[i][0];
        props.gameState[clickedPiece.y][clickedPiece.x] = store
      }
    }
    clickedPiece = null;
    holdingPiece = false;
    possibleMoves = []
  }

  p5.preload = () => {
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
    console.log("pressed")
    const mouseX = p5.mouseX;
    const mouseY = p5.mouseY;
    //if press mouse and have not clicked a piece, then set the clicked piece to piece you clicked 
    if(!clickedPiece){
      for(let i = 0; i < peices.length; i++){
        if(Math.floor(mouseX/squareSize) == peices[i].x && Math.floor(mouseY/squareSize) == peices[i].y){
          clickedPiece = peices[i];
          possibleMoves = clickedPiece.possibleMoves();
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
    console.log(holdingPiece)
  }


  p5.draw = () => {
    console.log(props.gameState)
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