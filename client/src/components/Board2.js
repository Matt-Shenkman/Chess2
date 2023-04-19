import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import Knight from './Knight'

function sketch(p5, props) {
  let squareSize = 500/8;
  let boardWidth = squareSize * 8;
  let boardImg = ["/images/board-squares/White-Dark.svg", "/images/board-squares/Green-Dark.svg"];
  let whiteImg, greenImg, dot;
  let bRook, bKnight, bKing, bQueen, bBishop, bPawn;
  let wRook, wKnight, wKing, wQueen, wBishop, wPawn;
  let peices = [new Knight(1,1, props.gameState), new Knight(3,1, props.gameState)]
  var clickedPiece = null;
  var holdingPiece = false;
  var pressed = false;
  var possibleMoves = [];

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
    if(!clickedPiece){
      for(let i = 0; i < peices.length; i++){
        if(Math.floor(mouseX/squareSize) == peices[i].x && Math.floor(mouseY/squareSize) == peices[i].y){
          console.log(holdingPiece)
          clickedPiece = peices[i];
          possibleMoves = clickedPiece.possibleMoves();
          console.log(possibleMoves)
        }
      }
    }else{
      for(let i = 0; i < possibleMoves.length; i++){
        if(Math.floor(mouseX/squareSize) == possibleMoves[i][1] && Math.floor(mouseY/squareSize) == possibleMoves[i][0]){
          props.gameState[clickedPiece.y][clickedPiece.x] = ''
          clickedPiece.x = possibleMoves[i][1];
          clickedPiece.y = possibleMoves[i][0];
          props.gameState[clickedPiece.y][clickedPiece.x] = 'wkn'
        }
      }
      clickedPiece = null;
      possibleMoves = []
    }
    
  }
  p5.mouseDragged = () => {
    if(pressed){
      holdingPiece = true;
    }
    console.log("dragged")
  }
  p5.mouseClicked= () => {
    console.log("clicked")
  }
  p5.mouseReleased = () => {
    pressed = false;
    console.log("released")
    const mouseX = p5.mouseX;
    const mouseY = p5.mouseY;
    if(holdingPiece){
      for(let i = 0; i < possibleMoves.length; i++){
        if(Math.floor(mouseX/squareSize) == possibleMoves[i][1] && Math.floor(mouseY/squareSize) == possibleMoves[i][0]){
          props.gameState[clickedPiece.y][clickedPiece.x] = ''
          clickedPiece.x = possibleMoves[i][1];
          clickedPiece.y = possibleMoves[i][0];
          props.gameState[clickedPiece.y][clickedPiece.x] = 'wkn'
        }
      }
      clickedPiece = null;
      holdingPiece = false;
      possibleMoves = []
    }
    holdingPiece = false;
    console.log(holdingPiece)
  }


  p5.draw = () => {
    
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        if ((x + y) % 2 === 0) {
          p5.image(whiteImg, x * squareSize - 250, y * squareSize - 250, squareSize, squareSize);
        } else {
          p5.image(greenImg, x * squareSize - 250, y * squareSize-250, squareSize, squareSize);
        }
        // const peice = props.gameState[y][x];
        // switch(peice) {
        //   case 'bp': 
        //     p5.image(bPawn, x * squareSize - 250, y * squareSize - 250, squareSize, squareSize);
        //     break;
        //   case 'wp':
        //     p5.image(wPawn, x * squareSize - 250, y * squareSize - 250, squareSize, squareSize);
        //     break;
        //   case 'br':
        //     p5.image(bRook, x * squareSize - 250, y * squareSize - 250, squareSize, squareSize);
        //     break;
        //   case 'wr':
        //     p5.image(wRook, x * squareSize - 250, y * squareSize - 250, squareSize, squareSize);
        //     break;
        //   case 'bkn':
        //     p5.image(bKnight, x * squareSize - 250, y * squareSize - 250, squareSize, squareSize);
        //     break;
        //   case 'wkn':
        //     p5.image(wKnight, x * squareSize - 250, y * squareSize - 250, squareSize, squareSize);
        //     break;
        //   case 'bb':
        //     p5.image(bBishop, x * squareSize - 250, y * squareSize - 250, squareSize, squareSize);
        //     break;
        //   case 'wb':
        //     p5.image(wBishop, x * squareSize - 250, y * squareSize - 250, squareSize, squareSize);
        //     break;
        //   case 'bk':
        //     p5.image(bKing, x * squareSize - 250, y * squareSize - 250, squareSize, squareSize);
        //     break;
        //   case 'wk':
        //     p5.image(wKing, x * squareSize - 250, y * squareSize - 250, squareSize, squareSize);
        //     break;
        //   case 'bq':
        //     p5.image(bQueen, x * squareSize - 250, y * squareSize - 250, squareSize, squareSize);
        //     break;
        //   case 'wq':
        //     p5.image(wQueen, x * squareSize - 250, y * squareSize - 250, squareSize, squareSize);
        //     break;
        // }
      }
    }
    for(let i = 0; i < peices.length; i++){
      if(peices[i].type == "knight" && !(clickedPiece && clickedPiece.x == peices[i].x && clickedPiece.y == peices[i].y && holdingPiece)){
        p5.image(wKnight, peices[i].x * squareSize - 250, peices[i].y * squareSize - 250, squareSize, squareSize);
      }
    }
    if(clickedPiece && holdingPiece){
      if(clickedPiece.type == "knight"){
        p5.image(wKnight, p5.mouseX-250 - squareSize/2, p5.mouseY-250- squareSize/2, squareSize, squareSize);
      }
    }
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