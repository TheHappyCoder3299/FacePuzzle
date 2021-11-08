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
    if(SELECTED_PIECE!=null && SELECTED_PIECE.isClose()){
        SELECTED_PIECE.snap();
    }   
    SELECTED_PIECE=null;
}
function onMouseDown(evt){
    SELECTED_PIECE=getPressedPiece(evt);
    if(SELECTED_PIECE!=null){
        const index=PIECES.indexOf(SELECTED_PIECE);
        if(index>-1)
        {
            PIECES.splice(index,1);
            PIECES.push(SELECTED_PIECE);    
        }
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
function addEventListeners(){
    CANVAS.addEventListener("mousedown",onMouseDown);
    CANVAS.addEventListener("mousemove",onMouseMove);
    CANVAS.addEventListener("mouseup",onMouseUp);
    CANVAS.addEventListener("touchstart",onTouchStart);
    CANVAS.addEventListener("touchmove",onTouchMove);
    CANVAS.addEventListener("touchend",onTouchEnd);
}