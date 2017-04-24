function ai(){}

//Run when the game is created
ai.hello = function(){

}

//Run when it's the AI's turn
ai.turn = function(){
  /*
    terrain
      map[x][y].terrain

    ground type
      map[x][y].ground
  */

  //next player
  game.turn();
}
