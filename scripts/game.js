//made editor mode
var override = false;

//main game loop (approx 60/sec)
function gameLoop(){
  //upon a new animation frame, do this loop again if the game isn't paused
  if(!pause){
    window.requestAnimationFrame(gameLoop);

    //if we are in override, cause havoc
    if(override){
      //reset inventory
    }

    //clear game
    g.clear();

    //render map
    map.render();
    map.letMeSee();

    //display hover
    g.display(interface.clearBox, g.pos.x, g.pos.y);

    //input event
    input.loop();

    //display selected tile
    ui.selectedTile();

    //if we have a unit
    if(map.tile.unit){
      //set fancy box guy
      game.displayMovement(map.tile.x,map.tile.y);
    }

    //display a unit or hide display window
    ui.displayUnit();

    //upon a click
    input.on.click(function(){ game.click(g.click.x,g.click.y); });
  }
}

var game = {
  get team(){
    return team[game.activePlayer];
  },
  set team(par){
    this.activePlayer = par.text;
  }
};

//game variables
game.activePlayer = "grey";
game.turns = 0;
//this is for key pushing
game.moving = false;

//selected tile
game.selected = {
  x: null,
  y: null
}

//initialize teams
game.setTeams = function(){
  var list = Object.keys(teams);
  for(var i = 0; i < list.length; i++){
    team[list[i]] = new player(list[i],teams[list[i]]);
  }
}

//Start the game
game.start = function(){
  //load map
  map.load(map.slot);

  //display selected inventory
  game.displayInventory();

  //game has started
  pause = false;

  //start game loop
  gameLoop();
}

//stop game rendering
game.pause = function(){
  //stop game rendering
  pause = true;
}

//display movement Options
game.displayMovement = function(x,y){
  for(var x2 = x-1;x2 <= x+1;x2++){
    for(var y2 = y-1;y2 <= y+1;y2++){
      if(map[x2][y2].checkMovement()){
        g.display(interface.dot.yellow, x2, y2);
      } else if(map[x2][y2].checkAttack()) {
        g.display(interface.dot.red, x2, y2);
      }
    }
  }
}

//click/tap handler
game.click = function(x,y){
  //action
  if((map.tile.unit || game.moving) && map[g.click.x][g.click.y].checkMovement()){
    game.movement(g.click.x,g.click.y);
  } else if((map.tile.unit|| game.moving) && map[g.click.x][g.click.y].checkAttack()){
    game.attack(g.click.x,g.click.y);
  }

  game.selected = {
    x: x,
    y: y
  }
}

//next turn
game.turn = function(){
  var list = Object.keys(teams);
  var next = team[list[list.indexOf(game.team.text) + 1]];

  //events
  for(var x = 0;x < mapsize.x;x++){
    for(var y = 0;y < mapsize.y;y++){
      //event
      if(map[x][y].event){
        if(map[x][y].event.type == "turn"){
          map[x][y].eventStatus.t--;
          if(map[x][y].eventStatus.t <= 0){
            map[x][y].event = null;
          }
        }
      }
    }
  }

  if(next.text == "grey"){
    //month end, add up
    next = team['red'];

    game.turns++;
  } else {
    //we havn't finished the month, there are more to finish the month
    //add up income and reset unit info
    engine.turn();
  }

  game.setTeam(next);

  //AI check
  if(game.team.ai){
    ai.turn();
  } else {
    if(game.team.identity != null){
     if(game.team.identity != multiplayer.identity) {
       ui.window(mod.onlineTurn);
       multiplayer.push();
     } else {
       ui.window(mod.next);
     }   
   } else {
     ui.window(mod.next);
   }
  }
}

//team has been chosen, activate game
game.setTeam = function(newTeam){
  game.team = newTeam;
  ui.hello();
  game.displayInventory();
  game.centerMap();
}

//center the map on the users Castle
game.centerMap = function(){
  //select the home castle
  game.selected = game.team.home;

  //find x and y
  var y = (game.selected.y * tilesize.display) - (window.innerHeight)/2;
  var x = (game.selected.x * tilesize.display) - (window.innerWidth)/2;

  //make sure they aren't negative
  if(y < 0){ y = 0; }
  if(x < 0){ x = 0; }

  //move canvas
  g.element.style.top = "-" + y + "px";
  g.element.style.left = "-" + x + "px";
}

//display Inventory
game.displayInventory = function(){
  for(var i = 0; i < item.list.length; i++){
    $('.inventory-' + item.list[i].text).html(game.team.inventory.get(item.list[i]));
  }
}

//list Teams
game.listTeams = function(){
  return Object.keys(team);
}

//mouse and keyboard events
game.setEvents = function(platform){

}

/* game actions */

  game.build = function(building){
    var fail = false;

    //check for price
    for(var i = 0; i < item.list.length; i++){
      if(building.cost[item.list[i].text] > game.team.inventory.get(item[item.list[i].text])){ fail = "You can't afford that silly."; }
    }

    //check for standable terrain
    if(!map.checkTerrain(game.selected.x,game.selected.y)){
      fail = "You can't stand there.";
    }

    //check for builder
    if(map.tile.unit != unit.builder){
      fail = "error";
    }

    //check for other buildings
    if(map.tile.building || map.tile.castle.square){
      fail = "There is another building there.";
    }

    if(!fail){
      //remove funds
      for(var i = 0; i < item.list.length; i++){
        if(building.cost[item.list[i].text]){game.team.inventory.sub(building.cost[item.list[i].text],item[item.list[i].text]);}
      }

      //build building
      map.changeBuilding(building);
    } else {
      //Failed
      async(function(){ui.alert('Nope',fail);});
    }
    game.displayInventory();
  }
  
  /* Build terrain (i.e. roads) */
  game.buildTerrain = function(building){
    var fail = false;

    //check for price
    for(var i = 0; i < item.list.length; i++){
      if(building.cost[item.list[i].text] > game.team.inventory.get(item[item.list[i].text])){ fail = "You can't afford that silly."; }
    }

    //check for standable terrain
    if(!map.checkTerrain(game.selected.x,game.selected.y)){
      fail = "You can't stand there.";
    }

    //check for builder
    if(map.tile.unit != unit.builder){
      fail = "error";
    }

    if(!fail){
      //remove funds
      for(var i = 0; i < item.list.length; i++){
        if(building.cost[item.list[i].text]){game.team.inventory.sub(building.cost[item.list[i].text],item[item.list[i].text]);}
      }

      //build building
      map.changeTerrain(building);
    } else {
      //Failed
      async(function(){ui.alert('Nope',fail);});
    }
    game.displayInventory();
  }

  //upgrade a building
  game.upgrade = function(){
    var fail = false;

    var building = map.tile.building.upgrade;

    //check for other buildings
    if(!map.tile.building || (map.tile.castle.square && !map.tile.building == building.castle) || map.tile.team != game.team){
      fail = "Not possible.";
    }

    //check for price
    for(var i = 0; i < item.list.length; i++){
      if(building.cost[item.list[i].text] > game.team.inventory.get(item[item.list[i].text])){ fail = "You can't afford that silly."; }
    }

    //check for standable terrain
    if(!map.checkTerrain(game.selected.x,game.selected.y)){
      fail = "You can't stand there.";
    }

    //check for builder
    if(map.tile.unit != unit.builder){
      fail = "A builder is required.";
    }

    if(!fail){
      //remove funds
      for(var i = 0; i < item.list.length; i++){
        if(building.cost[item.list[i].text]){game.team.inventory.sub(building.cost[item.list[i].text],item[item.list[i].text]);}
      }

      //build building
      map.changeBuilding(building);
    } else {
      //Failed
      async(function(){ui.alert('Nope',fail);});
    }
    game.displayInventory();
  }

  //train units
  game.train = function(unit){
    var fail = false;
    var list = Object.keys(unit.cost);

    var x = game.team.home.x;
    var y = game.team.home.y;

    //check for holes
    for(var i = 0; i < list.length; i++){
      if(unit.cost[list[i]] > game.team.inventory.get(item[list[i]])){ fail = "You don't have enough resources for that"; }
    }

    if(map[x][y].unit != null){
      fail = "There is another unit there.";
    }

    if(!fail){
      //remove funds
      for(var i = 0; i < item.list.length; i++){
        if(unit.cost[item.list[i].text]){game.team.inventory.sub(unit.cost[item.list[i].text],item[item.list[i].text]);}
      }

      //spawn unit
      map[x][y].spawn(unit, game.team);
      game.selected = game.team.home;
    } else {
      //Failed
      async(function(){ui.alert('Nope',fail);});
    }
    game.displayInventory();
  }

  //move character
  game.movement = function(x,y){
    /*//check for castle
    if(map[x][y].castle.x){
      x = map[x][y].castle.x;
      y = map[x][y].castle.y;
    }

    if(map[x][y].building && map[x][y].team != game.team && map[x][y].team != team.gray){
      game.attack(x,y);
    } else if(map.tile.unit && !(game.selected.y == y && game.selected.x == x) && map.tile.unitStatus.team == game.team){
      if(map[x][y].unit == null){
        if(map[x][y].checkMovement()){
          //move character
          map[x][y].tp(x,y);

          //adjust movement points
          var newMovement = map[x][y].unitStatus.movement - map[x][y].terrain.movementcost;
          map[x][y].unitStatus.movement = newMovement;
        }
      } else {
        //attack
        if(map[x][y].unitStatus.team != game.team){
          game.attack(x,y);
        }
      }
    }*/
    if(map[x][y].checkMovement()){
      if(map[x][y].building){
        //attack a building
      }

      //move character
      map[x][y].tp(x,y);

      //adjust movement points
      var newMovement = map[x][y].unitStatus.movement - map[x][y].terrain.movementcost;
      map[x][y].unitStatus.movement = newMovement;
    }

    game.moving = false;
  }

  //attack a unit
  game.attack = function(x,y){
    var from = {x: game.selected.x, y:game.selected.y}
    var to = {x: x, y:y}

    //casle management
    if(map[x][y].building || map[x][y].castle.x){ //if it's a castle
      if(engine.attack(from.x,from.y,to.x,to.y)){
        if(!map[x][y].castle.x){
          map[x][y].createEvent(event.destroy);
          map[x][y].build(building.ruins,team.gray);
        } else {
          map[x][y].createEvent(event.burn);
          map[x+1][y].createEvent(event.burn);
          map[x][y+1].createEvent(event.burn);
          map[x+1][y+1].createEvent(event.burn);

          team[map[x][y].team.text].obliterate();
        }
      } else {
        map[x][y].createEvent(event.attack);
      }
    } else { //attack
      if(engine.attack(from.x,from.y,to.x,to.y)){
        //unit was killed
        //create event
        map[x][y].createEvent(event.death);

        //delete enemy
        map[x][y].kill();
      } else {
        //unit is still alive, just damaged
        //creat fight graphics
        map[x][y].createEvent(event.attack);
      }
    }
  }

  //select team
  game.selectTeam = function(){
    ui.window(mod.teamSelect);
  }

  //start the map with a new team
  game.startGame = function(){
    ui.close();
    game.setTeam(team.red);
    game.start();

    if(game.team.ai){
        game.turn();
    }
  }

  //team button was selected
  game.startTeam = function(chooseTeam){
    if($('.team_' + chooseTeam.text).html() == "AI"){
      team[chooseTeam.text].ai = false;
      $('.team_' + chooseTeam.text).html("Player");
    } else if($('.team_' + chooseTeam.text).html() == "Player"){
      team[chooseTeam.text].ai = true;
      $('.team_' + chooseTeam.text).html("AI");
    }
  }

// List all roads connected to this tile
function listRoads() {
  var the_tile = map.tile;
  var roads = [];
  var checked = [];
  var tocheck = [];

  tocheck.push(the_tile);

  while (tocheck.length > 0) {
    
    if (checked.includes(the_tile) == false) {
      checked.push(the_tile);
      
      var x = the_tile.x;
      var y = the_tile.y;

      if (the_tile.terrain.road) {
        roads.push(the_tile);
      }
      if (map[x-1][y].terrain.road && checked.indexOf(map[x-1][y]) == -1) {
        tocheck.push(map[x-1][y]);
      }
      if (map[x+1][y].terrain.road && checked.indexOf(map[x+1][y]) == -1) {
        tocheck.push(map[x+1][y]);
      }
      if (map[x][y-1].terrain.road && checked.indexOf(map[x][y-1]) == -1) {
        tocheck.push(map[x][y-1]);
      }
      if (map[x][y+1].terrain.road && checked.indexOf(map[x][y+1]) == -1) {
        tocheck.push(map[x][y+1]);
      }
      
      var old_tile = the_tile;
    }
    var index = tocheck.indexOf(the_tile);
    if (index > -1) {
      tocheck.splice(index, 1);
    }
    if (tocheck.length > 0) {
      the_tile = tocheck[0];
    }
  }
  
  return roads;
};


// Adjust road orientation
function adjustRoads(roads) {
  for (i = 0; i < roads.length; i++) { 
    var the_tile = roads[i];
    var x = roads[i].x;
    var y = roads[i].y;

    // Crossroad
    if (map[x-1][y].terrain.road && map[x+1][y].terrain.road && map[x][y-1].terrain.road && map[x][y+1].terrain.road) {
      map[x][y].terrain = terrain.roadCrossroad;
    }
    // Horizontal T Up
    else if (map[x-1][y].terrain.road && map[x+1][y].terrain.road && map[x][y-1].terrain.road) {
      map[x][y].terrain = terrain.roadTHorizontalUp;
    }
    // Horizontal T Down
    else if (map[x-1][y].terrain.road && map[x+1][y].terrain.road && map[x][y+1].terrain.road) {
      map[x][y].terrain = terrain.roadTHorizontalDown;
    }
    // Vertical T Left
    else if (map[x-1][y].terrain.road && map[x][y-1].terrain.road && map[x][y+1].terrain.road) {
      map[x][y].terrain = terrain.roadTVerticalLeft;
    }
    // Vertical T Right
    else if (map[x+1][y].terrain.road && map[x][y-1].terrain.road && map[x][y+1].terrain.road) {
      map[x][y].terrain = terrain.roadTVerticalRight;
    }
    // Horizontal
    else if (map[x-1][y].terrain.road && map[x+1][y].terrain.road) {
      map[x][y].terrain = terrain.roadHorizontal;
    }
    // Vertical
    else if (map[x][y-1].terrain.road && map[x][y+1].terrain.road) {
      map[x][y].terrain = terrain.roadVertical;
    }
    // Corner Down Right
    else if (map[x+1][y].terrain.road && map[x][y+1].terrain.road) {
      map[x][y].terrain = terrain.roadCDownRight;
    }
    // Corner Down Left
    else if (map[x-1][y].terrain.road && map[x][y+1].terrain.road) {
      map[x][y].terrain = terrain.roadCDownLeft;
    }
    // Corner Up Right
    else if (map[x+1][y].terrain.road && map[x][y-1].terrain.road) {
      map[x][y].terrain = terrain.roadCUpRight;
    }
    // Corner Up Left
    else if (map[x-1][y].terrain.road && map[x][y-1].terrain.road) {
      map[x][y].terrain = terrain.roadCUpLeft;
    }
    // Horizontal End 1
    else if (map[x-1][y].terrain.road) {
      map[x][y].terrain = terrain.roadHorizontal;
    }
    // Horizontal End 2
    else if (map[x+1][y].terrain.road) {
      map[x][y].terrain = terrain.roadHorizontal;
    }
    // Vertical End 1
    else if (map[x][y+1].terrain.road) {
      map[x][y].terrain = terrain.roadVertical;
    }
    // Vertical End 2
    else if (map[x][y-1].terrain.road) {
      map[x][y].terrain = terrain.roadVertical;
    }
  };
  return true;
};


// Find all connected roads, and adjust their rotation
function processRoads() {
  var roads = listRoads();
  adjustRoads(roads);
};
