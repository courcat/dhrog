/* multiplayer */
var multiplayer = {};

//id
multiplayer.identity = localStorage.getItem("xpat") || (function(){var char = Math.random().toString(36).substring(2); localStorage.setItem("xpat",char); return char; })();

//send turn (called upon a next turn when the player isn't the local player)
multiplayer.push = function(){

  //once loaded
  setTimeout(function(){
    ui.window(mod.onlineSuccess);
    map.dullMap();
  },1000);
}

//download (server only returns JSON if it's the players turn)
multiplayer.pull = function(){

}

//list of all servers user is apart of (returns list of worlds)
multiplayer.list = function(){
  return map.listSlots();
}

//connect to a world for the first time
multiplayer.join = function(gameID){
  alert(gameID);

  $('.ui_cover').remove();
}

//quit a world
multiplayer.quit = function(gameID){
  alert(gameID);

  $('.ui_cover').remove();
}
