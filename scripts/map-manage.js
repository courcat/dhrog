//companion to map.js
//map save and load functions

//data
map.slot = 0;
map.slots = 0;

//map slot management
map.selectSlot = function(slot){
  map.slot = slot;
  $('.ui_cover').remove();
  pause = false;
  game.start();
}

//list slots
map.listSlots = function(){
  var i = 0;
  var value = "";
  while(localStorage.getItem("map_" + i)){
    if(localStorage.getItem("map_" + i) != "empty"){
      value += "<div class='mapslot mapslot_a'><p class='map_details' onclick='map.selectSlot(" + i + ");'>Saved Game " + i + "<span class='small small_turn'>Turn 5</span><span class='small date'>15th Feb, 2016</span></p><p class='mapcontrols'><span onclick='map.selectSlot(" + i + ");' class='green'>play</span><span class='blue' onclick='map.download(" + i + ");'>share</span><span class='red' onclick='map.delete(" + i + ");'>delete</span></p></div>";
    }
    i++;
    map.slots = i;
  }

  return value;
}

//delete map
map.delete = function(id){
  map.slot = id;
  localStorage.setItem("map_" + map.slot, "empty");
  ui.window(mod.maps);
}

//download map
map.download = function(id){
  map.slot = id;
  map.load(map.slot);
  file.export();
  game.team = team.grey;
	ui.hello();
}

//new map
map.newSlot = function(){
  map.slot = map.slots;
  $('.ui_cover').remove();

  game.selectTeam();
}

//map is a new game
map.new = function(){
  game.selectTeam();
}

//import map
map.import = function(value){
  //uncompress
  var obj = file.decompress(value);

  //map size
  mapsize = obj['mapsize'];

  //create dull map
  map.dullMap();

  //team data
  if(obj.player){
    for(var key in team){
      team[key].visible = obj.player[key].map;
      team[key].inventory.update(obj.player[key].inventory);

      if (obj.player[key].identity === "null"){
        team[key].identity = null;
      } else {
        team[key].identity = obj.player[key].identity;
      }

      if(obj.player[key].ai){
          team[key].ai = (obj.player[key].ai == "true");
      }

      //fix visable range
      for(var x = 0;x < mapsize.x; x++){
        for(var y = 0;y < mapsize.y; y++){
          if(team[key].visible[x][y] && team[key].visible[x][y] != true){
            team[key].visible[x][y].building = building[team[key].visible[x][y].building];
            team[key].visible[x][y].team = team[team[key].visible[x][y].team];
          }
        }
      }
    }
  }

  //map import
  try {
    //loop for map
    for(var x = 0;x < mapsize.x; x++){
      for(var y = 0;y < mapsize.y; y++){
        map[x][y].create(obj['map'][x][y]);
        if(map[x][y].building){
          if(map[x][y].building.castle){
            //set player home
            team[map[x][y].team.text].home = {x:x, y:y}
          }
        }
      }
    }
  } catch(e) {
    ui.alert('Map Import Error',e);
    pause = true;
  }

  //turn
  if(obj['turn'] != null){
    game.setTeam(team[obj['turn']]);
  } else {
    map.new();
  }
}

//export to text
map.export = function(){
  var value = '{';

  //time
  value += '"time":"' + new Date().getTime() + '",';

  //turn
  value += '"turn":"' + game.team.text + '",';

  //map size
  value += '"mapsize":{"x":"' + mapsize.x + '","y":"' + mapsize.y + '"},';

  //user data
  value += '"player":{';

  var firstGo = true;

  for(var key in team){
    if(!firstGo){
      value += ",";
    }

    firstGo = false;

    value += '"' + key + '":{"inventory":' + JSON.stringify(team[key].inventory.vault) + ',"ai":"' + team[key].ai + '","identity":"' + team[key].identity + '","map":' + JSON.stringify(team[key].visible) + '}';
  }

  value += '},';

  //map
  value += '"map":' + JSON.stringify(map);

  //final tag
  value += '}';

  //compress and encrypt
  value = file.compress(value);

  return value;
}

//save to local storage
map.save = function(){
  // Store
  localStorage.setItem("map_" + map.slot, map.export());
}

//load from local storage
map.load = function(){
  if(localStorage.getItem("map_" + map.slot)){
    map.import(localStorage.getItem("map_" + map.slot));
  } else {
    map.import(defaultMap);
  }
}

//reset to default
map.reset = function(){
  localStorage.removeItem("map_" + map.slot);
}
