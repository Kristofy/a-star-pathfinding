let grid = [];
let m=15;
let openSet = [];
let closedSet = [];
let target;
let gridSize;

function setup(){
    let C = createCanvas(600, 600);
    C.parent('parent');

    gridSize = height/m;
    for(let i=0;i<gridSize;i++){
        grid[i]=[];
        for(let k = 0;k<gridSize;k++){
            grid[i][k] = new Cell(i,k,m,(random(1, 100)>35),{i : gridSize-1, k : gridSize-1});
        }
    }
    target=grid[gridSize-1][gridSize-1];
    grid[0][0].walkable=true;
    grid[gridSize-1][gridSize-1].walkable=true;

    grid[0][0].gScore=0;
    grid[0][0].Open="OPEN"

    openSet.push(grid[0][0]);
}

function draw(){
    background(51);
    for(let i=0;i<gridSize;i++){
        for(let k = 0;k<gridSize;k++){
            grid[i][k].show();
        }
    }

    // game logic

    let current = openSet[0];
    let index=0;
    for(let i=1;i<openSet.length;i++){
        if(current.fScore>openSet[i].fScore){
            current=openSet[i];
            index=i;
        }
    }

    current.Open="CLOSED";
    openSet.splice(index,1);
    closedSet.push(current);

    if(current===target){
        trancePath();
        noLoop();
        return; 
    }

    neighbours = getNeighbours(current.i, current.k);

    for(let n of neighbours){
        let newGScore = current.gScore + Cell.d(current,n);
        if(newGScore<n.gScore){
            n.gScore=newGScore;
            n.parent=current;
            if(n.Open=="UNDEFINED"){
                n.Open="OPEN";
                openSet.push(n);
            }
        }
        
    }
    
    if(openSet.length==0){
        noLoop();

    }
}

function trancePath(){
    let current = target;
    stroke(255);
    fill(0,0,255);
    while (current!==grid[0][0]){
        rect(current.pos.x, current.pos.y, current.w, current.w);

        current=current.parent;
    }
    rect(current.pos.x, current.pos.y, current.w, current.w);
}

function getNeighbours(_i,_k){
    let neighbours = [];
    for(let i = -1; i <= 1; i++){
        for(let k = -1; k <= 1;k++){
            if(i!=0 || k!=0){
                if(i+_i>=0&&i+_i<gridSize&&k+_k>=0&&k+_k<gridSize){
                    if(grid[i+_i][k+_k].walkable&&grid[i+_i][k+_k].Open!="CLOSED"){
                        neighbours.push(grid[i+_i][k+_k]);

                    }
                }
            }
        }
    }
    return neighbours;
}

function lowest(){
    let low=null;
    for(let n in openSet){
        if(low.fCost<n.hCost||low==null){
            low=n;
        }
    }
    return low;
}