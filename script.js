//Global Variables
let VIDEO=null;
let CANVAS=null;
let CONTEXT=null;
let SCALER=0.6;
let SIZE={x:0,y:0,width:0,height:0,rows:3,cols:3};
let PIECES=[];
let SELECTED_PIECE=null;
let START_TIME=null;
let END_TIME=null;

function main() {
    CANVAS=document.getElementById("myCanvas");
    CONTEXT=CANVAS.getContext("2d");

    let promise=navigator.mediaDevices.getUserMedia({video:true});
    promise.then(function(signal){
        VIDEO=document.createElement("video");
        VIDEO.srcObject=signal;
  
        VIDEO.play();



        VIDEO.onloadeddata=function(){
            handleResize();
            window.addEventListener('resize',handleResize);
            initializePieces(SIZE.rows,SIZE.cols);
            randomizePieces();
            addEventListeners();
            updateCanvas();
        }



    }).catch(function(err){
        alert("Camera error "+err);
    });
}
function getPressedPiece(loc){
    for(var i=PIECES.length-1;i>=0;i--){
        if(loc.x>PIECES[i].x && loc.x<PIECES[i].x+PIECES[i].width && loc.y>PIECES[i].y && loc.y<PIECES[i].y+PIECES[i].height )
         return PIECES[i];
    }
    return null;
}


function setDifficulty(){
    let difficulty=document.getElementById("difficulty").value;
    switch(difficulty){
        case "easy":
            initializePieces(3,3);
            break;
        case "medium":
            initializePieces(5,5);
            break;
        case "hard":
            initializePieces(10,10);
            break;
        case "insane":
            initializePieces(40,25);
            break;    
    }
}
function solveRest(){
    
}
function restart(){
    START_TIME=new Date().getTime();
    END_TIME=null;
    randomizePieces();
}

function updateCanvas(){
   CONTEXT.clearRect(0,0,CANVAS.width,CANVAS.height);

   CONTEXT.globalAlpha=0.5;
   CONTEXT.drawImage(VIDEO,SIZE.x,SIZE.y,SIZE.width,SIZE.height);
   CONTEXT.globalAlpha=1;
            
        for(var i=0;i<PIECES.length;i++){
        PIECES[i].draw(CONTEXT);
    }
   

    window.requestAnimationFrame(updateCanvas);
}

function initializePieces(rows,cols){
    PIECES=[];
    SIZE.rows=rows;
    SIZE.cols=cols;
    for(var i=0;i<SIZE.rows;i++){
        for(var j=0;j<SIZE.cols;j++){
            PIECES.push(new Piece(i,j));
        }
    }
}

function randomizePieces(){
    for(var i=0;i<PIECES.length;i++){
        PIECES[i].x=Math.random()*(CANVAS.width-PIECES[i].width);
        PIECES[i].y=Math.random()*(CANVAS.height-PIECES[i].height);
    }
}
function distance(loc1,loc2){
    return Math.sqrt((loc1.x-loc2.x)*(loc1.x-loc2.x)+(loc1.y-loc2.y)*(loc1.y-loc2.y));
}

