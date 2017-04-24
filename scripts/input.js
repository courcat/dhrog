var input = {};

input.altClick = false;

input.events = function(){
  //when mouse moves set the new location
  g.element.onmousemove = function(e){
    if(g.mouseDown.time == 0){
      g.hoverEvent(e);
    } else {
      g.drag(e);
    }
  }

  //drag n drop worlds
  $('body')[0].ondrop = function(e) { return file.import(e); };
  $('body')[0].ondragover = function() { this.className = 'hover'; return false; };
  $('body')[0].onmouseleave = function() { this.className = ''; return false; };

  //button pushing
  $(document).keyup(function(e){ input.key(e.which) });

  //when you open the right click menu
  document.addEventListener('contextmenu', event => event.preventDefault());

  //when clicked
  g.element.onmousedown = function(e){
    input.click(e);
  }

  //when mouse leaves
  g.element.onmouseleave = function(e){
    g.mouseDown.time = 0;
  }

  //when mouse is picked up
  g.element.onmouseup = function(e){
    g.mouseDown.time = 0;
  }
}

//input loop (approx 60/sec)
input.loop = function(){

}

//click
input.click = function(e){
  g.click.x = Math.floor(e.x/tilesize.display - parseInt(g.element.style.left)/tilesize.display);
  g.click.y = Math.floor(e.y/tilesize.display - parseInt(g.element.style.top)/tilesize.display);
}

//key pressed
input.key = function(key){
  switch(key){
    case 38 : //up
      g.moveScreen('up');
      break;
    case 40 : //down
      g.moveScreen('down');
      break;
    case 37 : //left
      g.moveScreen('left');
      break;
    case 39 : //right
      g.moveScreen('right');
      break;
    case 27 : //esc
      ui.window(mod.pause);
      break;
    case 77 : //m
      game.moving = true;
      break;
    case 191 : //?
      ui.window(mod.help);
      break;
    case 66 : //b
      ui.window(mod.build);
      break;
    case 84 : //t
      ui.window(mod.train);
      break;
    case 82 : //r
      ui.window(mod.research);
      break;
    case 80 : //p
      ui.window(mod.politics);
      break;
    case 13 : //enter
      input.enter();
      break;
    case 32 : //space
      break;
    case 87 : //w
      input.arrow('up');
      break;
    case 83 : //s
      input.arrow('down');
      break;
    case 65 : //a
      input.arrow('left');
      break;
    case 68 : //d
      input.arrow('right');
      break;
  }
}

//arrow key
input.arrow = function(direction){
  if(direction=='up'){
    if(game.moving){
      game.movement(game.selected.x,(game.selected.y - 1));
    }
    game.click(game.selected.x,(game.selected.y - 1));
  } else if(direction=='left'){
    if(game.moving){
      game.movement(game.selected.x - 1,game.selected.y);
    }
    game.click(game.selected.x - 1,game.selected.y);
  } else if(direction=='right'){
    if(game.moving){
      game.movement(game.selected.x+1,game.selected.y);
    }
    game.click(game.selected.x+1,game.selected.y);
  } else if(direction=='down'){
    if(game.moving){
      game.movement(game.selected.x,(game.selected.y + 1));
    }
    game.click(game.selected.x,(game.selected.y + 1));
  }
}

//enter key
input.enter = function(){
  if($('.ui')[0]){
    ui.close();
  } else {
    game.turn();
  }
}

//on events
input.on = {};

input.on.key = function(key,action){
  //nothing
}

//onclick
input.on.click = function(action){
  //click?
  if(g.click.x != 0){
    action();

    //reset click
    g.click.x = 0;
    g.click.y = 0;
  }
}
