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
