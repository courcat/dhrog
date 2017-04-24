function g(){}

g.hello = function(){
  //mouse x and y
  this.pos = {
    x: 0,
    y: 0
  }

  //last clicked spot
  this.click = {
    x: 0,
    y: 0
  }

  //clicking or not
  this.mouseDown = {
    time: 0,
    x: 0,
    y: 0,
    top: 0,
    left: 0
  }

  //get element
  this.element = document.getElementById('canvas');
  this.ctx = this.element.getContext("2d");

  //image details
  this.image = new Image();
  this.image.src = "data/tileset.png";

  //set size
  g.size();

  //clear
  g.clear();
}

//Set size of canvas to window size
g.size = function(){
  //this.height = window.innerHeight;
  //this.width = window.innerWidth;

  this.height = mapsize.y * tilesize.display;
  this.width = mapsize.x * tilesize.display;

  this.element.height = this.height;
  this.element.width = this.width;
}

//clear canvas
g.clear = function(){
  this.ctx.clearRect(0, 0, this.width, this.height);
}

//display tile
g.display = function(tile,x,y){
  this.ctx.drawImage(this.image,tile.x * tilesize.original, tile.y * tilesize.original, tilesize.original, tilesize.original, x * tilesize.display, y * tilesize.display, tilesize.display, tilesize.display);
}

g.hoverEvent = function(e){
  var x = e.x - parseInt(g.element.style.left);
  var y = e.y - parseInt(g.element.style.top);
  this.pos.x = Math.floor(x/tilesize.display);
  this.pos.y = Math.floor(y/tilesize.display);
}

g.clickEvent = function(e){
  var x = e.x - parseInt(g.element.style.left);
  var y = e.y - parseInt(g.element.style.top);
  this.click.x = Math.floor(x/tilesize.display);
  this.click.y = Math.floor(y/tilesize.display);
}

g.drag = function(e){
  //calculate the movement amount
  var x = (g.mouseDown.x - e.x) - g.mouseDown.left;
  var y = (g.mouseDown.y - e.y) - g.mouseDown.top;

  //move canvas
  g.element.style.top = "-" + y + "px";
  g.element.style.left = "-" + x + "px";
}

g.moveScreen = function(direction){
  var y = parseInt(g.element.style.top);
  var x = parseInt(g.element.style.left);

  if(direction == 'up'){
    y = y + 30;
  } else if(direction == 'down'){
    y = y - 30;
  } else if(direction == 'left'){
    x = x + 30;
  } else if(direction == 'right'){
    x = x - 30;
  }

  g.element.style.top = y + "px";
  g.element.style.left = x + "px";
}
