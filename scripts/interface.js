//interface

//display unit
ui.displayUnit = function(x,y){
  if(map.tile.unit){
    if(game.unitStatus != map.tile.unit){
      //display
      $('.unitdetails').show();
      game.unitStatus = game.unitStatus != map.tile.unit;
      $('.unit_preview').css('background-position', "-" + map.tile.unit[map.tile.unitStatus.team.text].x * tilesize.original + "px -" + map.tile.unit[map.tile.unitStatus.team.text].y * tilesize.original + "px");
      $('.unit_health').html(map.tile.unitStatus.health + "%");
      var movement = 0;
      if(map.tile.unitStatus.movement > 0){
        movement = map.tile.unitStatus.movement;
      }
      $('.unit_points').html(movement);

      //builder build button
      if(map.tile.unit == unit.builder){
        $('.build_button').show();
      } else {
        $('.build_button').hide();
        $('.upgrade_button').hide();
      }

      //builder upgrade button check
      var upgrade = false;
      if(map.tile.building){
        if(map.tile.building.upgrade){
          upgrade = true;
        }
      }

      //builder upgrade button
      if(map.tile.unit == unit.builder && upgrade){
        $('.upgrade_button').show();
      } else {
        $('.upgrade_button').hide();
      }
    }
  } else {
    //hide unit window
    if(game.unitStatus){
      game.unitStatus = false;
      $('.unitdetails').hide();
    }
  }
}

ui.selectedTile = function(){
  //show clicked spots
  if(game.selected.x != null){
    if(map.tile.building){
      if(map.tile.building.flag){
        g.display(interface.flag[map.tile.team.text], game.selected.x, game.selected.y);
      } else {
        g.display(interface.blueBox, game.selected.x, game.selected.y);
      }
    } else {
      g.display(interface.blueBox, game.selected.x, game.selected.y);
    }
  }
}

//window UI
function ui(){
  this.color;
}

ui.eternal = false;

ui.hello = function(){
  document.body.style.setProperty('--color-light', game.team.color.light);
  document.body.style.setProperty('--color-med', game.team.color.medium);
  document.body.style.setProperty('--color-dark', game.team.color.dark);
}

ui.window = function(template){
  $('.ui_cover').remove();
  ui.eternal = true;

  var module = new template();

  $('body').append("<div class='ui_cover'><div class='ui ui_window'>" + module.html + "</div></div>");

  if(module.run){
    module.run();
  }

  ui.finish();
}

ui.back = function(){
  if(game.team.ai){
      ui.window(mod.menu);
  } else {
    $('.ui_cover').remove();
  }
}

ui.close = function(){
  $('.ui_cover').remove();
}

ui.alert = function(title, input){
  $('.ui_cover').remove();
  $('body').append("<div class='ui_cover'><div class='ui ui_alert'><span class='ui_title'>" + title + "</span><br>" + input + "</div></div>");
  ui.finish();
}

ui.finish = function(){
  if(!ui.eternal){
    $('.ui_cover')[0].onclick = function(){
      $('.ui_cover').remove();
    }
  }

  $('.build_button').hide();
  $('.upgrade_button').hide();

  ui.eternal = false;
}
