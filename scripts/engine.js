var engine = {}

//attack
engine.attack = function(x,y,x2,y2){
  var result = false;

  var target = 'unit';

  if(map[x2][y2].building){
    //building here, default to building
    target = 'building';

    //if it's not a defensive building and there is a unit, target the unit
    if(!map[x2][y2].building.defensive && map[x2][y2].unit){
      target = 'unit';
    }
  }

  if(target == 'building'){
    //attack attack
    var a = map[x][y].unit.attack;

    //attacker health
    var h = map[x][y].unitStatus.health;

    //calculate the death
    var hploss = Math.round(a * (0.8 + ((h/100)* 0.2)));

    //remove movement points
    map[x][y].unitStatus.movement = -1;

    //subtract health from defender
    map[x2][y2].health = map[x2][y2].health - hploss;

    //check if the guy is dead
    if(map[x2][y2].health <= 0){
      result = true;
    }

  } else {
    //attack attack
    var a = map[x][y].unit.attack;

    //defender defense
    var d = map[x2][y2].unit.defense;

    //attacker health
    var h = map[x][y].unitStatus.health;

    //calculate the death
    var hploss = Math.round(a * (0.8 + ((h/100)* 0.2)) * (100 - d)/100);

    //remove movement points
    map[x][y].unitStatus.movement = -1;

    //subtract health from defender
    map[x2][y2].unitStatus.health = map[x2][y2].unitStatus.health - hploss;

    //check if the guy is dead
    if(map[x2][y2].unitStatus.health <= 0){
      result = true;
    }
  }

  return result;
}

//turn is over for the player
engine.turn = function(){
  //find production
  for(var x = 0;x < mapsize.x;x++){
    for(var y = 0;y < mapsize.y;y++){
      //inventory
      if(map[x][y].building){
        if(map[x][y].building.produces && map[x][y].team == game.team){
          if(map[x][y].building.reqWorker == false){
            game.team.inventory.add(map[x][y].building.count,map[x][y].building.produces);
          } else if(map[x][y].unit == unit.worker) {
            game.team.inventory.add(map[x][y].building.count,map[x][y].building.produces);
          }
        }
      }

      //reset movement info
      if(map[x][y].unit){
        map[x][y].unitStatus.movement = map[x][y].unit.movement;
      }
    }
  }
}

//list inventory
engine.listInventoryFor = function(object){
    var result = "";

    for(var i = 0; i < item.list.length; i++){
      if(object.cost[item.list[i].text]){
        var enough = "";
        if(object.cost[item.list[i].text] > game.team.inventory.get(item.list[i])){
          enough = "inventory_red ";
        }
        result = result + "<i class='inventory " + item.list[i].text + "'></i> <span class='" +  enough + "'>" + object.cost[item.list[i].text] + "</span><br>";
      }
    }

    return result;
}
