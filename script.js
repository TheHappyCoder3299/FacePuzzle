//Global Variables
let VIDEO=null;
let CANVAS=null;
let CONTEXT=null;
let SCALER=0.6;
let SIZE={x:0,y:0,width:0,height:0,rows:3,cols:3};
let PIECES=[];
let SELECTED_PIECE=null;

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
    for(var i=0;i<PIECES.length;i++){
        if(loc.x>PIECES[i].x && loc.x<PIECES[i].x+PIECES[i].width && loc.y>PIECES[i].y && loc.y<PIECES[i].y+PIECES[i].height )
         return PIECES[i];
    }
    return null;
}

function addEventListeners(){
    CANVAS.addEventListener("mousedown",onMouseDown);
    CANVAS.addEventListener("mousemove",onMouseMove);
    CANVAS.addEventListener("mouseup",onMouseUp);
    CANVAS.addEventListener("touchstart",onTouchStart);
    CANVAS.addEventListener("touchmove",onTouchMove);
    CANVAS.addEventListener("touchend",onTouchEnd);
}
function onTouchStart(evt){

    onMouseDown(evt);
}
function onTouchMove(evt){
    let loc={x:evt.touches[0].clientX,y:evt.touches[0].cllientY};
    onMouseMove(loc);
}

function onTouchEnd(){
    onMouseUp();
}
function onMouseUp(){
    if(SELECTED_PIECE.isClose()){
        SELECTED_PIECE.snap();
    }   
    SELECTED_PIECE=null;
}
function onMouseDown(evt){
    SELECTED_PIECE=getPressedPiece(evt);
    if(SELECTED_PIECE!=null){

        SELECTED_PIECE.offset={x:evt.x-SELECTED_PIECE.x,
            y:evt.y-SELECTED_PIECE.y};
        }
}
function onMouseMove(evt){
    if(SELECTED_PIECE!=null){
        SELECTED_PIECE.x=evt.x-SELECTED_PIECE.offset.x;
        SELECTED_PIECE.y=evt.y-SELECTED_PIECE.offset.y;
    }
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
function handleResize()
{
    CANVAS.width=window.innerWidth;
    CANVAS.height=window.innerHeight;
    let resizer=SCALER*Math.min(window.innerHeight/VIDEO.videoHeight,window.innerWidth/VIDEO.videoWidth);
            SIZE.width=resizer*VIDEO.videoWidth;
            SIZE.height=resizer*VIDEO.videoHeight;
            SIZE.x=window.innerWidth/2-VIDEO.videoWidth/2;
            SIZE.y=window.innerHeight/2-VIDEO.videoHeight/2;
}
function initializePieces(rows,cols){
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

class Piece{
    constructor(rowIndex,colIndex){
        this.rowIndex=rowIndex;
        this.colIndex=colIndex;
        this.width=SIZE.width/SIZE.cols;
        this.height=SIZE.height/SIZE.rows;
        this.x=SIZE.x+colIndex*this.width;
        this.y=SIZE.y+rowIndex*this.height;
        this.xCorrect=this.x;
        this.yCorrect=this.y;
        
    }
    draw(context){
        context.beginPath();
           context.drawImage(VIDEO,
                    this.colIndex*VIDEO.videoWidth/SIZE.cols,
                    this.rowIndex*VIDEO.videoHeight/SIZE.rows,
                    VIDEO.videoWidth/SIZE.cols,
                    VIDEO.videoHeight/SIZE.rows,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                    );
        context.rect(this.x,this.y,this.width,this.height);
     
        context.stroke();
    }
    isClose(){
        if(distance({x:this.x,y:this.y},{x:this.xCorrect,y:this.yCorrect})<Math.max(this.width/3,this.height/3))
            return true;
        else
            return false;

    }

    snap(){
        this.x=this.xCorrect;
        this.y=this.yCorrect;
    }
}
