const canvas = {first:  document.getElementById("canvas0"),
                second: document.getElementById("canvas1"),
                width: document.getElementById("canvas0").width,
                height: document.getElementById("canvas0").height};
const context = {first: canvas.first.getContext("2d"),
                second: canvas.second.getContext("2d")};

var images = [];

const tile = {width: 48, height: 24, k: 0.5};
var map = {width: 16, height: 16, tiles: null};
    map.tiles = new Array(map.width*map.height).fill(1);
const origin = {x: 8, y: 8};

var mouse = {x: null, y: null}, 
    cell = {x: null, y: null}, 
    offset = {x: null, y: null},
    selected = {x: null, y: null};
    bClicked = false;

canvas.second.addEventListener('mousemove', mouseMoveHandler, false);
canvas.second.addEventListener('click', mouseClickHandler, false);

function mouseMoveHandler(e) {
    mouse = {x: e.clientX, y: e.clientY};
    cell = {x: Math.floor(mouse.x/tile.width), y: Math.floor(mouse.y/tile.height)};
    offset = {x: (mouse.x % tile.width), y: (mouse.y % tile.height)};
    selected = {x: (cell.y - origin.y) + (cell.x - origin.x), y: (cell.y - origin.y) - (cell.x - origin.x)};
    document.getElementById('mouseposition').innerHTML = "Mouse: " + mouse.x + ", " + mouse.y;
    document.getElementById('cellposition').innerHTML = "Cell: " + cell.x + ",  " + cell.y;
    document.getElementById('selectedposition').innerHTML = "Selected Cell: " + selected.x + ",  " + selected.y;
    drawSelectedCell();
}

function mouseClickHandler(e) {
    //console.log("click")
    if(selected.x >= 0 && selected.x < map.width && selected.y >= 0 && selected.y < map.height) {
        map.tiles[selected.y*map.width + selected.x]++;
        map.tiles[selected.y*map.width + selected.x] %= 6;
        
    }
    bClicked = true;
}
        


function loadImages(img, arr) {
    this.img = new Image();
    arr.push(this.img);
    this.img.src = "./img/" + img;
}

loadImages("stile.png", images);
for(var i = 0; i < 6; i++) {
    loadImages("tile" + i + ".png", images);
}
/*
images[0].onload = function() {
    context.first.drawImage(images[0], 0, 0)
}
*/

function drawTileMap() {
    context.first.clearRect(0, 0, canvas.width, canvas.height)
    for(var y = 0; y < map.height; y++) {
        for(var x = 0; x < map.width; x++) {
            if(map.tiles[y*map.width+x] == 1) {
                context.first.drawImage(images[2], (x-y)*(tile.width/2) + origin.x*tile.width, (x+y)*tile.height/2 + origin.y*tile.height);
            }
            else if(map.tiles[y*map.width+x] == 2) {
                context.first.drawImage(images[3], (x-y)*(tile.width/2) + origin.x*tile.width, (x+y)*tile.height/2 + origin.y*tile.height);
            }
            else if(map.tiles[y*map.width+x] == 3) {
                context.first.drawImage(images[4], (x-y)*(tile.width/2) + origin.x*tile.width, (x+y)*tile.height/2 + origin.y*tile.height);
            }
            else if(map.tiles[y*map.width+x] == 4) {
                context.first.drawImage(images[5], (x-y)*(tile.width/2) + origin.x*tile.width, (x+y)*tile.height/2 + origin.y*tile.height - 2*tile.height);
            }
            else if(map.tiles[y*map.width+x] == 5) {
                context.first.drawImage(images[6], (x-y)*(tile.width/2) + origin.x*tile.width, (x+y)*tile.height/2 + origin.y*tile.height - 2*tile.height);
            }
            else {
                context.first.drawImage(images[1], (x-y)*(tile.width/2) + origin.x*tile.width, (x+y)*tile.height/2 + origin.y*tile.height);
            }
            
        }
    }
}

function drawSelectedCell() {
    context.second.clearRect(0, 0, canvas.width, canvas.height)
    if(offset.x < tile.width/2 && offset.y < tile.k*offset.x + 0.5*tile.height) {
        //console.log("left-upper corner")
        //context.second.strokeRect(cell.x*tile.width - 0.5*tile.width, cell.y*tile.height - 0.5*tile.height, tile.width, tile.height);
        selected.x--;
        context.second.drawImage(images[0], cell.x*tile.width - 0.5*tile.width, cell.y*tile.height - 0.5*tile.height);
    }
    else if(offset.x < tile.width/2 && offset.y > -tile.k*offset.x + 0.5*tile.height) {
        //console.log("left-lower corner")
        //context.second.strokeRect(cell.x*tile.width - 0.5*tile.width, cell.y*tile.height + 0.5*tile.height, tile.width, tile.height);
        selected.y++;
        context.second.drawImage(images[0], cell.x*tile.width - 0.5*tile.width, cell.y*tile.height + 0.5*tile.height);
    }
    else if(offset.x > tile.width/2 && offset.y < tile.k*offset.x - 0.5*tile.height) {
        //console.log("right-upper corner")
        //context.second.strokeRect(cell.x*tile.width + 0.5*tile.width, cell.y*tile.height - 0.5*tile.height, tile.width, tile.height);
        selected.y--;
        context.second.drawImage(images[0], cell.x*tile.width + 0.5*tile.width, cell.y*tile.height - 0.5*tile.height);
    }
    else if(offset.x > tile.width/2 && offset.y > -tile.k*offset.x + 1.5*tile.height) {
        //console.log("right-lower corner")
        //context.second.strokeRect(cell.x*tile.width + 0.5*tile.width, cell.y*tile.height + 0.5*tile.height, tile.width, tile.height);
        selected.x++;
        context.second.drawImage(images[0], cell.x*tile.width + 0.5*tile.width, cell.y*tile.height + 0.5*tile.height);
    }
    else {
        //context.second.strokeRect(cell.x*tile.width, cell.y*tile.height, tile.width, tile.height);
        context.second.drawImage(images[0], cell.x*tile.width, cell.y*tile.height);
    }
}


function draw() {
    if(bClicked) {
        drawTileMap();
    }
    bClicked = false;
}


window.onload = function() {
    drawTileMap();
}

setInterval(draw, 1000/30);