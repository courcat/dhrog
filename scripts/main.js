var pause = false;

window.onload = function() {
  //init
  g.hello();
  game.setTeams();

  $( "canvas" ).draggable();

  //set global colors to name of team
  var value = "";
  for(key in color){
    value += "." + key + "{background-color:" + color[key].light + "}";
  }
  $('head').append("<style>" + value + "</style>");

  //Once the GUI loads
  g.image.onload = function() {
    //setup empty inventory
    for(var key in team){
      team[key].inventory.hello();
    }

    //map data structure
    map.dullMap();

    //init UI
    ui.hello();

    //input Events
    input.events();
  };

  //Show menu
  ui.window(mod.menu);
};

//when the window resizes
window.onresize = function(){
  g.size();
}

//call after 20miliseconds to start a second thread
function async(action){
  setTimeout(action,20);
}

//fullscreen
var fullscreenActive = false;

function fullscreen() {
  var element = document.documentElement;

  if(!fullscreenActive){
    fullscreenActive = true;
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  } else {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    fullscreenActive = false;
  }
}
