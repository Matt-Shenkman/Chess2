import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import Knight from './Knight'
import Bishop from './Bishop'
import Queen from './Queen'
import King from './King'
import Rook from './Rook'
import Pawn from './Pawn'
import GameState from './GameState'
import { useRef, useImperativeHandle, forwardRef } from 'react';

import io from 'socket.io-client'
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';


import './Board.css'


const SketchComponent = (props) => {



  function sketch(p5, props) {
    const socket = io.connect("192.168.1.230:3001")
    var message;
    var messageReceived;
    var joinedState = 0;
    var info;
    var userId;
    var joinedroom = false;
    var height = 600;
    var width = 500;

    const joinRoom = function(){
      if(!joinedroom){
        socket.emit("join_room", {userId});
        joinedroom = true;
        joinedState = 1;
      }
    }
    const sendMessage = function(){
      socket.emit("send_message", {message, userId})
    } 
    const sendState = function(state){
      socket.emit("send_message", {state, userId})
    } 

    let squareSize = 500/8;
    let boardWidth = squareSize * 8;
    let boardImg = ["/images/board-squares/White-Dark.svg", "/images/board-squares/Green-Dark.svg"];
    let whiteImg, greenImg, dot;
    let bRook, bKnight, bKing, bQueen, bBishop, bPawn, bSPawn;
    let wRook, wKnight, wKing, wQueen, wBishop, wPawn, wSPawn;
    var font;
    var joinButton;
    var peices = [];
    var clickedPiece = null;
    var holdingPiece = false;
    var pressed = false;
    var possibleMoves = [];
    var gameState;
    
    var pieceTypes = {};
    var madeFirstMove = false;
    var playerColor = "white";
  
    var resetPieceArray = function(customGameState){
      peices = []
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          const piece = customGameState.board[y][x];
          switch(piece){
            case 'bsp':
              peices.push(new Pawn(x,y,"black", customGameState, true));
              break;
            case 'wsp':
              peices.push(new Pawn(x,y,"white", customGameState, true));
              break;
            case 'bp': 
              peices.push(new Pawn(x,y,"black", customGameState));
              break;
            case 'wp':
              peices.push(new Pawn(x,y,"white", customGameState));
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
      for(var i = 0; i < peices.length; i++){
        if(peices[i].type == "king"){
          var oppColor = peices[i].color == "white" ? "black" : "white";
          var attack = [false, false, false, false, false];
          for(var j = 0; j < 5; j++){
            var dx = j - 2;
            if(peices[i].x + dx < 8 && peices[i].x + dx >=0){
              attack[j] = putSquareInCheck(peices[i].x + dx, peices[i].y, oppColor);
            }
          }
          console.log(attack)
          peices[i].attackLL = attack[0];
          peices[i].attackL = attack[1];
          peices[i].attack = attack[2];
          peices[i].attackR = attack[3];
          peices[i].attackRR = attack[4];
          console.log(peices[i])
        }
      }
    }
    var putSquareInCheck = function(x, y, color){
      for(var i = 0; i < peices.length; i++){
        if(peices[i].color == color){
          var possibleMoves = peices[i].possibleMoves();
          for(let j = possibleMoves.length - 1; j >= 0; j--){
            if(possibleMoves[j][1] == x &&  possibleMoves[j][0] == y){
              return true;
            }
          }
        }
      }
      return false;
    }
    var checkTouchingOppSuperPawn = function(moveX, moveY, color){
      for(var dx = -1; dx <= 1; dx++){
        for(var dy = -1; dy <= 1; dy++){
          if(dx != 0 || dy != 0){
            if(moveX + dx >= 0 && moveX + dx < 8 && moveY + dy >= 0 && moveY + dy < 8){
              if(gameState.board[moveY + dy][moveX + dx] == "bsp" && color == "white"){
                return true;
              }else if(gameState.board[moveY + dy][moveX + dx] == "wsp" && color == "black"){
                return true;
              }
            }
          }
        }
      }
      return false;
    }

    var findKing = function(){
      var king;
      for(let k = 0; k < peices.length; k++){
        if(peices[k].type == "king" && 
          ((peices[k].color == "white" && gameState.whiteTurn) ||
          (peices[k].color == "black" && !gameState.whiteTurn))){
            king = peices[k];
        }
      }
      return king;
    }

    var isInCheck = function(){
      var king = findKing();
      //see if in check
      for(let k = 0; k < peices.length; k++){
        if(peices[k].color != king.color){
          var opponentMoves = peices[k].possibleMoves();
          for(let l = 0 ; l < opponentMoves.length; l ++){
            const pieceAttacked = gameState.board[opponentMoves[l][0]][opponentMoves[l][1]];
            if((pieceAttacked == 'wk' && king.color == "white") || (pieceAttacked == 'bk' && king.color == "black")){
              return true;
            }
          }
        }
      }
      return false;
    }

    var canMove = function(){
      var king = findKing();
      for(let i = 0; i < peices.length; i++){
        if(peices[i].color == king.color){
          var possibleMoves = peices[i].possibleMoves();
          for(let j = possibleMoves.length - 1; j >= 0; j--){
            var shouldRemove = false;
            var possiblePostion = peices[i].updatedBoardState(possibleMoves[j][1], possibleMoves[j][0]);
            resetPieceArray(possiblePostion);
            for(let k = 0; k < peices.length; k++){
              if(peices[k].color != king.color){
                var opponentMoves = peices[k].possibleMoves();
                for(let l = 0 ; l < opponentMoves.length; l ++){
                  const pieceAttacked = possiblePostion.board[opponentMoves[l][0]][opponentMoves[l][1]];
                  if((pieceAttacked == 'wk' && king.color == "white") || (pieceAttacked == 'bk' && king.color == "black")){
                    shouldRemove = true;
                  }
                }
              }
            }
            //king cannot move into superpawn
            if(peices[i].type == "king"){
              for(var dy = -1; dy <=1 ; dy++){
                for(var dx = -1; dx <=1 ; dx++){
                  if(dy != 0 || dx!= 0){
                    if(possibleMoves[j][0] + dy < 8 && possibleMoves[j][0] + dy >= 0 && possibleMoves[j][1] + dx < 8 && possibleMoves[j][1] + dx >= 0){
                      const checkSP = gameState.board[possibleMoves[j][0] + dy][possibleMoves[j][1] + dx];
                      if((king.color == "white" && checkSP == "bsp")||(king.color == "black" && checkSP == "wsp")){
                        shouldRemove = true;
                      }
                    }
                  }
                }
              }
            }
            if(shouldRemove){
              possibleMoves.splice(j, 1);
            }
            //reset position
            resetPieceArray(gameState);
          }
          if(possibleMoves.length > 0){
            return true;
          }
        }
      }
      return false;
    }

    var isTouchingSuperPawn = function(){
      var king = findKing();
      //see if king touching superpawn
      for(var dy = -1; dy <=1 ; dy++){
        for(var dx = -1; dx <=1 ; dx++){
          if(dy != 0 || dx!= 0){
            if(king.y + dy < 8 && king.y + dy >= 0 && king.x + dx < 8 && king.x + dx >= 0){
              const checkSP = gameState.board[king.y + dy][king.x + dx];
              if((king.color == "white" && checkSP == "bsp")||(king.color == "black" && checkSP == "wsp")){
                return true;
              }
            }
          }
        }
      }
      return false;
    }

    var makeMove = function(mouseX, mouseY){
      for(let i = 0; i < possibleMoves.length; i++){
        if(mouseX == possibleMoves[i][1] && mouseY == possibleMoves[i][0] && 
        ((clickedPiece.color == "white" && gameState.whiteTurn)||
        (clickedPiece.color == "black" && !gameState.whiteTurn))){
          var newGameState;
  
          //if promoting pawn, prompt user for what to promote to, pass this info the updatedBoardState
          if((clickedPiece.type == "pawn" || clickedPiece.type == "superpawn") && 
            ((clickedPiece.color == "white" && possibleMoves[i][0] == 0)||(clickedPiece.color == "black" && possibleMoves[i][0] == 7))){
              var promotion;
              if(checkTouchingOppSuperPawn(possibleMoves[i][1], possibleMoves[i][0], clickedPiece.color)){
                promotion = 'p'
              }
              else{
                promotion = prompt("Please enter something:");
              }
              if(promotion != "q" && promotion != "n" && promotion != "b" && promotion != "r" && promotion != "p"){
                return;
              }else{
                newGameState = clickedPiece.updatedBoardState(possibleMoves[i][1], possibleMoves[i][0], promotion);
              }
          }
          //get new game state
          else{
            newGameState = clickedPiece.updatedBoardState(possibleMoves[i][1], possibleMoves[i][0]);
          }
          gameState = newGameState;

          sendState(JSON.stringify(gameState));

          //set to all pieces
          resetPieceArray(gameState);
          var checkCanMove = canMove();
          if((!checkCanMove && isInCheck()) || isTouchingSuperPawn()){
            const outcome = "checkmate"
            socket.emit("game_over", {userId,outcome});
            joinedState = 4;
          }else if(!checkCanMove){
            const outcome = "stalemate"
            socket.emit("game_over", {userId,outcome});
            joinedState = 5;
          }
        }
      }
      clickedPiece = null;
      holdingPiece = false;
      possibleMoves = []
    }
  
    p5.preload = () => {
      gameState = new GameState(props.gameState, null, null, true, true, true, true, true);
      resetPieceArray(gameState);
      whiteImg = p5.loadImage(boardImg[0]);
      greenImg = p5.loadImage(boardImg[1]);
      wRook = p5.loadImage("/images/peices/w_rook.svg")
      wPawn = p5.loadImage("/images/peices/w_pawn.svg")
      wQueen = p5.loadImage("/images/peices/w_queen.svg")
      wKing = p5.loadImage("/images/peices/w_king.svg")
      wBishop = p5.loadImage("/images/peices/w_bishop.svg")
      wKnight = p5.loadImage("/images/peices/w_knight.svg")
      wSPawn = p5.loadImage("/images/peices/w_spawn.png")
  
      bRook = p5.loadImage("/images/peices/b_rook.svg")
      bPawn = p5.loadImage("/images/peices/b_pawn.svg")
      bQueen = p5.loadImage("/images/peices/b_queen.svg")
      bKing = p5.loadImage("/images/peices/b_king.svg")
      bBishop = p5.loadImage("/images/peices/b_bishop.svg")
      bKnight = p5.loadImage("/images/peices/b_knight.svg")
      bSPawn = p5.loadImage("/images/peices/b_spawn.png")
  
      dot = p5.loadImage("/images/dot.svg")

      font = p5.loadFont("/fonts/Arial_Rounded_Bold.ttf")
      
  
      pieceTypes = {
        "bishop":{
          "imageWhite": wBishop,
          "imageBlack": bBishop
        },
        "pawn":{
          "imageWhite": wPawn,
          "imageBlack": bPawn
        },
        "superpawn":{
          "imageWhite": wSPawn,
          "imageBlack": bSPawn
        },
        "knight":{
          "imageWhite": wKnight,
          "imageBlack": bKnight
        },
        "king":{
          "imageWhite": wKing,
          "imageBlack": bKing
        },
        "queen":{
          "imageWhite": wQueen,
          "imageBlack": bQueen
        },
        "rook":{
          "imageWhite": wRook,
          "imageBlack": bRook
        },
      }
      const id = Cookies.get('userId') || uuidv4();
      Cookies.set('userId', id);
      userId = id;

      socket.on("connect", () => {
        socket.emit("join_initial", {userId});
      });
      socket.on("receive_message", (data)=>{
        const gameStateObj = JSON.parse(data.state);
        gameState = new GameState(gameStateObj.board, gameStateObj.epFile, gameStateObj.epRank, gameStateObj.whiteTurn, gameStateObj.whiteKingsideCastle, 
          gameStateObj.whiteQueensideCastle, gameStateObj.blackKingsideCastle, gameStateObj.blackQueensideCastle);
        resetPieceArray(gameState);
      })
      socket.on("receive_game_over", (data)=>{
        if(data.outcome == "checkmate"){
          joinedState = 4;
        }else if(data.outcome == "stalemate"){
          joinedState = 5;
        }
      })
      socket.on("joined_room", (data)=>{
        joinedState = 1;
        joinedroom = true;
      })

      socket.on("game_started", (data)=>{
        joinedState = 2;
        joinedroom = true;
      })

      socket.on("receive_connection_info", (data)=>{
        info = data;
        joinedState = 2;
        joinedroom = true;
      })
      socket.on("set_color_black", ()=>{
        playerColor = "black"
      })
      socket.emit("check_joined", {userId});
  
    };
  
    p5.setup = () => {
      p5.createCanvas(width, height, p5.WEBGL);
      p5.canvas.style.border = "1px solid black";
      p5.textFont(font);
      joinButton = p5.createButton('join game');
      
    }
    p5.mousePressed = () => {
      pressed = true;
      const mouseX = reflect(Math.floor(p5.mouseX/squareSize));
      const mouseY = reflect(Math.floor(p5.mouseY/squareSize));
      
      //if press mouse and have not clicked a piece, then set the clicked piece to piece you clicked 
      if(!clickedPiece){
        for(let i = peices.length-1; i >= 0; i--){
          if(mouseX == peices[i].x && mouseY == peices[i].y && peices[i].color == playerColor){
            clickedPiece = peices[i];
            possibleMoves = clickedPiece.possibleMoves();
            //loop through all possible moves and see if they put the moving side in check
            for(let j = possibleMoves.length - 1; j >= 0; j--){
              var shouldRemove = false;
              //set up possible position
              var possiblePostion = clickedPiece.updatedBoardState(possibleMoves[j][1], possibleMoves[j][0]);
              resetPieceArray(possiblePostion);
              
              for(let k = 0; k < peices.length; k++){
                //see if moving side is in check
                if(peices[k].color != clickedPiece.color){
                  var opponentMoves = peices[k].possibleMoves();
                  for(let l = 0 ; l < opponentMoves.length; l ++){
                    const pieceAttacked = possiblePostion.board[opponentMoves[l][0]][opponentMoves[l][1]];
                    if((pieceAttacked == 'wk' && clickedPiece.color == "white") || (pieceAttacked == 'bk' && clickedPiece.color == "black")){
                      shouldRemove = true;
                    }
                  }
                }
              }
              //king cannot move into superpawn
              if(clickedPiece.type == "king"){
                for(var dy = -1; dy <=1 ; dy++){
                  for(var dx = -1; dx <=1 ; dx++){
                    if(dy != 0 || dx!= 0){
                      if(possibleMoves[j][0] + dy < 8 && possibleMoves[j][0] + dy >= 0 && possibleMoves[j][1] + dx < 8 && possibleMoves[j][1] + dx >= 0){
                        const checkSP = gameState.board[possibleMoves[j][0] + dy][possibleMoves[j][1] + dx];
                        if((clickedPiece.color == "white" && checkSP == "bsp")||(clickedPiece.color == "black" && checkSP == "wsp")){
                          shouldRemove = true;
                        }
                      }
                    }
                  }
                }
              }
              if(shouldRemove){
                possibleMoves.splice(j, 1);
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
      const mouseX = reflect(Math.floor(p5.mouseX/squareSize));
      const mouseY = reflect(Math.floor(p5.mouseY/squareSize));
      // if holding peice and piece released, then place if possible move
      if(holdingPiece){
          makeMove(mouseX, mouseY)
      }
      holdingPiece = false;
    }
    var reflect = function(cord){
      if(playerColor == "white"){
        return cord;
      }
      return 7 - cord;
    }
    p5.draw = () => {
      p5.background(255,255,255);
      //draw the board
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          if ((x + y) % 2 === 0) {
            p5.image(whiteImg, x * squareSize - width/2, y * squareSize - height/2, squareSize, squareSize);
          } else {
            p5.image(greenImg, x * squareSize - width/2, y * squareSize-height/2, squareSize, squareSize);
          }
        }
      }
      //draw the pieces
      for(let i = 0; i < peices.length; i++){
        if (clickedPiece && clickedPiece.x == peices[i].x && clickedPiece.y == peices[i].y && holdingPiece){
          continue;
        }
        var dispX = reflect(peices[i].x);
        var dispY = reflect(peices[i].y);
        for (let k in pieceTypes) {
          if(peices[i].type == k && peices[i].color == "white"){
            p5.image(pieceTypes[k]["imageWhite"], dispX * squareSize - width/2, dispY * squareSize - height/2, squareSize, squareSize);
          }else if(peices[i].type == k){
            p5.image(pieceTypes[k]["imageBlack"], dispX * squareSize - width/2, dispY * squareSize - height/2, squareSize, squareSize);
          }
        }
      }
      //draw the piece if holding it 
      if(clickedPiece && holdingPiece){
        for (let k in pieceTypes) {
          if(clickedPiece.type == k && clickedPiece.color == "white"){
            p5.image(pieceTypes[k]["imageWhite"], p5.mouseX - width/2 - squareSize/2, p5.mouseY-height/2- squareSize/2, squareSize, squareSize);
          }else if(clickedPiece.type == k){
            p5.image(pieceTypes[k]["imageBlack"], p5.mouseX-width/2 - squareSize/2, p5.mouseY-height/2- squareSize/2, squareSize, squareSize);
          }
        }
      }
      //draw possible move dots
      for(let i = 0; i < possibleMoves.length; i++){
        p5.tint(255, 100);
        p5.image(dot, reflect(possibleMoves[i][1]) * squareSize - width/2, reflect(possibleMoves[i][0]) * squareSize - height/2, squareSize, squareSize);
        p5.tint(255, 255);
      }
      p5.textSize(32);
      p5.fill(0, 0, 0);
      if(joinedState == 0){
        joinButton.position(220, 520);
        joinButton.mousePressed(joinRoom);
      }else{
        joinButton.hide()
      }
      if(joinedState == 1){
        p5.text("waiting for opponent", -150, 250);
      }else if(joinedState == 2){
        p5.text("game started", -100, 250);
      }else if(joinedState == 4){
        p5.text("checkmate", -100, 250);
      }else if(joinedState == 5){
        p5.text("stalemate", -100, 250);
      }
    };
  }

  return  <ReactP5Wrapper sketch={(p5) => sketch(p5, props)}/>;

}

export default SketchComponent;