//Map array
var map = new Array();

var map = {
  clip: {
    x: 0,
    y: 0
  },
  get tile(){
    return map[game.selected.x][game.selected.y];
  }
}

//quick commands
map.checkTerrain = function(x,y){
  var value = true;

  //can it be walked upon
  if(!map[x][y].ground.walk){
    value = false;
  }

  //movement cost
  if(map[x][y].terrain){
    if(map[x][y].terrain.movementcost > 10){
      value = false;
    }
  }

  //visable
  if(!game.team.visible[x][y]){
    value = false;
  }

  return value;
}

map.changeTerrain = function(input){
  map.tile.terrain = input;
}

map.changeBuilding = function(input){
  map.tile.build(input, game.team);
}

map.changeGround = function(input){
  map.tile.ground = input;
}

//Initialize
map.dullMap = function(){
  //create a giant empty array
  for(var x = 0;x < mapsize.x;x++){
    map[x] = new Array();
    for(var y = 0;y < mapsize.y;y++){
      map[x][y] = new tile();
    }
  }

  //null visable array
  for(var key in team){
    team[key].newWorld();
  }
}

//visibility
map.letMeSee = function(){
  game.team.seeWorld();
  for(var x = 0;x < mapsize.x;x++){
    for(var y = 0;y < mapsize.y;y++){
      //unit
      if(map[x][y].unit){
        if(map[x][y].unitStatus.team == game.team){
          map.see(x,y,map[x][y].unit.visibility,map[x][y].unitStatus.team);
        }
      }

      //building
      if(map[x][y].building){
        if(map[x][y].team == game.team){
          map.see(x,y,map[x][y].building.visibility,map[x][y].team);
        }
      }
    }
  }
}

//see a circle around a certain points
map.see = function(x,y,r,team){
  for(var sx = x-r;sx < x+r;sx++){
    for(var sy = y-r;sy < y+r;sy++){
      if((sx - x) * (sx - x) + (sy - y) * (sy - y) < r * r){
        team.visible[sx][sy] = true;
      }
    }
  }
}

//tile creator
function tile(){
  this.ground = null; //type ground
  this.terrain = null; //type terrain

  this.health = null;
  this.building = null; //type building
  this.castle = {x:null,y:null,square:null, toJSON:function(){return null}}
  this.team = null; //type color
  this.unit = null; //type character
  this.unitStatus = null;
  this.event = null;
  this.eventStatus = {t:0};

  this.x = null; //number
  this.y = null; //number

  //build a building here
  this.build = function(building, color){
    this.building = building;
    this.team = color;
    this.health = building.health;
  }

  //spawn a unit here
  this.spawn = function(unit, color){
    this.unit = unit;
    this.unitStatus = {team:color,health:100,movement:0};
  }

  //kill a unit
  this.kill = function(){
    this.unit = null;
  }

  //move a character
  this.tp = function(x,y){
    //move unit
    map[x][y].unit = map.tile.unit;
    map.tile.unit = null;

    //move stats with it
    map[x][y].unitStatus = map.tile.unitStatus;
    map.tile.unitStatus = {health:100,defense:0,attack:0,team:team.grey,movement:0};
  }

  //constructor
  this.create = function(prop){
    //bring in any new data from the constructor
    var list = Object.keys(this);
    for(var i = 0; i < list.length; i++){
      //fill in the blanks
      if(prop[list[i]] != undefined){
        if(prop[list[i]] != null){
          this[list[i]] = prop[list[i]];
        }
      }

      //if it's a reference
      if(typeof this[list[i]] === 'string'){
        //fill with data from data.js
        this[list[i]] = window[list[i]][this[list[i]]];
      }

      //special cases
      if(list[i] == "unitStatus"){
        if(prop.unitStatus){
            this.unitStatus.team = team[prop.unitStatus.team];
        }
      }
    }
  }

  //event
  this.createEvent = function(event){
    this.event = event;
    this.eventStatus = {t:event.duration}
  }

  //checkmovement
  this.checkMovement = function(){
    var value = true;

    var changex = Math.abs(game.selected.x - this.x);
    var changey = Math.abs(game.selected.y - this.y);

    if(this.unit){
      value = false;
    }

    if(map.tile.unitStatus.team != game.team){
      value = false;
    }

    if(changex > 1 || changey > 1){
      value = false;
    }

    if(map.tile.unitStatus.movement < 0){
      value = false;
    }

    if(!map.checkTerrain(this.x,this.y)){
      value = false;
    }

    return value;
  }

  //checkattack
  this.checkAttack = function(){
    var value = true;

    var changex = Math.abs(game.selected.x - this.x);
    var changey = Math.abs(game.selected.y - this.y);

    if(game.selected.x == this.x && game.selected.y == this.y){
      value = false;
    }

    if(map.tile.unitStatus.team != game.team){
      value = false;
    }

    if(changex > 1 || changey > 1){
      value = false;
    }

    if(!this.unit) {
      value = false;
    }

    if(this.unitStatus){
      if(this.unitStatus.team == game.team){
        value = false;
      }
    }  

    if(map.tile.unitStatus.movement < 0){
      value = false;
    }

    if(!map.checkTerrain(this.x,this.y)){
      value = false;
    }

    return value;
  }
}
