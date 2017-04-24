//companion to map.js
//map display functions

//Render map
map.render = function(){
  //display tiles
  for(var x = 0;x < mapsize.x;x++){
    for(var y = 0;y < mapsize.y;y++){
      if(override){
        game.team.visible[x][y] = true;
      }

      if(game.team.visible[x][y]){
        //ground
        map.displayGround(x,y);

        //building
        map.displayBuilding(x,y);

        //if the user can see it
        if(game.team.visible[x][y] == true){
          //unit
          map.displayUnit(x,y);
        } else {
          //show the user the data is outdated
          g.display(interface.fogBox,x,y);
        }

        //event
        if(map[x][y].event != null){
          if(map[x][y].event.type == "flash"){
            map[x][y].eventStatus.t--;
            if(map[x][y].eventStatus.t > 0){
              g.display(map[x][y].event,x,y);
            } else {
              map[x][y].event = null;
            }
          } else {
            g.display(map[x][y].event,x,y);
          }
        }

      } else {
        //g.display(interface.cloud,x,y);
      }

      //reset the visiblity to null if the override function is on (essentially reseting the world)
      if(override){
        game.team.visible[x][y] = null;
      }
    }
  }
}

//display unit
map.displayUnit = function(x,y){
  //display unit
  var reqworker = false;
  if(map[x][y].building){
    reqworker = map[x][y].building.reqWorker;
  }

  if(map[x][y].unit != undefined){
    if(map[x][y].unit == unit.worker && reqworker){
      g.display(map[x][y].building.produces,x,y);
    } else {
      g.display(map[x][y].unit[map[x][y].unitStatus.team.text],x,y);
      if(map[x][y].unitStatus.movement >= 0 && map[x][y].unitStatus.team == game.team){
        g.display(interface.bluestar,x,y);
      }
    }
  }
}
//display Buildings
map.displayBuilding = function(x,y,building){
  if(game.team.visible[x][y] == true){
    if(map[x][y].building){
      //display castles
      if(map[x][y].building.castle){
        //set the corners
        map[x][y].castle = {x:x, y:y, square:"I"}
        map[x+1][y].castle = {x:x, y:y, square:"II"}
        map[x][y+1].castle = {x:x, y:y, square:"III"}
        map[x+1][y+1].castle = {x:x, y:y, square:"IV"}
      }

      //display Building
      if(map[x][y].building.red){
        g.display(map[x][y].building[map[x][y].team.text],x,y);
      } else {
        g.display(map[x][y].building,x,y);
      }

    } else if(map[x][y].castle.square){
      g.display(map[map[x][y].castle.x][map[x][y].castle.y].building[map[x][y].castle.square],x,y);
      //set castle flag
      if(map[x][y].castle.square == "III"){
        g.display(interface.flag[map[map[x][y].castle.x][map[x][y].castle.y].team.text], x, y);
      }
    } else if(map[x][y].terrain) {
      g.display(map[x][y].terrain,x,y);
    }
  } else if(game.team.visible[x][y] == "mapped"){
    //display terrain
    g.display(map[x][y].terrain,x,y);

    //set castle
    if(map[x][y].castle.square){
      g.display(map[map[x][y].castle.x][map[x][y].castle.y].building[map[x][y].castle.square],x,y);
    }
    //set castle flag
    if(map[x][y].castle.square == "III"){
      g.display(interface.flag[map[map[x][y].castle.x][map[x][y].castle.y].team.text], x, y);
    }
  } else {
    //display last seen building
    if('red' in game.team.visible[x][y].building){
      g.display(game.team.visible[x][y].building[game.team.visible[x][y].team.text],x,y);
    } else {
      g.display(game.team.visible[x][y].building,x,y);
    }
  }
}

//display ground and borders
map.displayGround = function(x,y){
  //display tile
  g.display(map[x][y].ground,x,y);

  //check for water beside ground
  if(map[x][y].ground == ground.water && x != 0 && y != 0 && y < mapsize.y - 1 && x < mapsize.x -1){
    //sides
    if(map[x][y+1].ground != ground.water){
        g.display(border.sandS,x,y);
    } else if(map[x][y-1].ground != ground.water){
        g.display(border.sandN,x,y);
    } else if(map[x + 1][y].ground != ground.water){
        g.display(border.sandE,x,y);
    } else if(map[x - 1][y].ground != ground.water){
        g.display(border.sandW,x,y);
    }

    //corners
    if(map[x - 1][y - 1].ground != ground.water && map[x][y - 1].ground == ground.water && map[x - 1][y].ground == ground.water){
        g.display(border.sandSE,x,y);
    }

    if(map[x + 1][y + 1].ground != ground.water && map[x][y + 1].ground == ground.water && map[x + 1][y].ground == ground.water){
        g.display(border.sandNW,x,y);
    }

    if(map[x - 1][y + 1].ground != ground.water && map[x][y + 1].ground == ground.water && map[x - 1][y].ground == ground.water){
        g.display(border.sandNE,x,y);
    }

    if(map[x + 1][y - 1].ground != ground.water && map[x][y - 1].ground == ground.water && map[x + 1][y].ground == ground.water){
        g.display(border.sandSW,x,y);
    }

    if(map[x - 1][y].ground != ground.water && map[x][y - 1].ground != ground.water){
        g.display(border.sandCornerNW,x,y);
    } else if(map[x - 1][y].ground != ground.water && map[x][y + 1].ground != ground.water){
        g.display(border.sandCornerSW,x,y);
    } else if(map[x + 1][y].ground != ground.water && map[x][y + 1].ground != ground.water){
        g.display(border.sandCornerSE,x,y);
    } else if(map[x + 1][y].ground != ground.water && map[x][y - 1].ground != ground.water){
        g.display(border.sandCornerNE,x,y);
    }

    if(map[x - 1][y].ground != ground.water && map[x][y - 1].ground != ground.water && map[x][y - 1].ground != ground.water){
        g.display(border.sandCornerNW,x,y);
    } else if(map[x - 1][y].ground != ground.water && map[x][y + 1].ground != ground.water){
        g.display(border.sandCornerSW,x,y);
    } else if(map[x + 1][y].ground != ground.water && map[x][y + 1].ground != ground.water){
        g.display(border.sandCornerSE,x,y);
    } else if(map[x + 1][y].ground != ground.water && map[x][y - 1].ground != ground.water){
        g.display(border.sandCornerNE,x,y);
    }
  }
}
