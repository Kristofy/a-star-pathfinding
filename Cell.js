class Cell{


    constructor(i,k,w,walkable, target){
        this.Open="UNDEFINED";
        this.walkable=walkable;
        this.i=i;
        this.k=k;
        this.pos= new Vec2(i*w,k*w);
        this.w=w;
        this.gScore=Infinity;
        this.parent=null;
        if(abs(this.k-target.k)<abs(this.i-target.i)){
            this.hScore=abs(this.k-target.k)*14+(abs(this.i-target.i)-abs(this.k-target.k))*10;
        }else{
            this.hScore=abs(this.i-target.i)*14+(abs(this.k-target.k)-abs(this.i-target.i))*10;
        }
        this.fScore=Infinity;
    }

    show(){
        stroke(255);

        if(this.walkable){
            fill(200);

        }else {
            fill(51);
        }
        if(this.Open=="OPEN"){
            fill(0,255,0);
        }else if(this.Open == "CLOSED"){
            fill(255,0,0);
        }
        
        rect(this.pos.x, this.pos.y, this.w, this.w);
        stroke(0);

    }

    static d(a,b){
        let i=abs(a.i-b.i);
        let k=abs(a.k-b.k);
        if(k+i==1){
            return 10;
        }
        else{
            return 14;
        }
    }
}

class Vec2{

    constructor(x,y){
        this.x=x;this.y=y;
    }
}

