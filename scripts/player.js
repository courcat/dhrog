/* teams */
  var team = {};

/* Player constructor */
  function player(team,data){
    this.text = team;
    this.color = data.color;
    this.ai = true;
    this.home = {x: 0, y:0 }
    this.identity = null;

    /* visibility Array
     * can be :
     * null - cannot see
     * building OR "mapped" - fog of war
     * true - can be seen */
    this.visible = new Array();

    //player inventory
    this.inventory = {};
    this.inventory.vault = {};

    //add inventory
    this.inventory.add = function(num, object){
      this.vault[object.text] += num;
      return this.vault[object.text];
    }

    //subtract inventory
    this.inventory.sub = function(num, object){
      this.vault[object.text] -= num;
      return this.vault[object.text];
    }

    //get Inventory
    this.inventory.get = function(object){
      return this.vault[object.text];
    }

    //update Inventory
    this.inventory.update = function(object){
      for(var key in object){
        //put value in vault
        this.vault[key] = object[key];
      }
    }

    this.inventory.hello = function(){
      for(var i = 0; i < item.list.length; i++){
        this.vault[item.list[i].text] = item[item.list[i].text].default;
      }
    }

    //bring in any new data from the constructor
    var list = Object.keys(this);
    for(var i = 0; i < list.length; i++){
      //fill in the blanks
      if(data[list[i]] != undefined){
        this[list[i]] = data[list[i]];
      }
    }

    //upon export what it sent
    this.toJSON = function(){
      return this.text;
    }

    this.newWorld = function(){
      //set null visibility
      for(var x = 0;x < mapsize.x;x++){
        this.visible[x] = new Array();
        for(var y = 0;y < mapsize.y;y++){
          this.visible[x][y] = null;
        }
      }
    }

    this.obliterate = function(){
      //clear inventory
      for(var i = 0; i < item.list.length; i++){
        this.inventory.sub(this.inventory.get([item.list[i].text]),item[item.list[i].text]);
      }

      //clear map of this team
      for(var x = 0;x < mapsize.x;x++){
        for(var y = 0;y < mapsize.y;y++){
          //unit
          if(map[x][y].unitStatus.team == this){
            map[x][y].kill();
          }

          //building
          if(map[x][y].team == this && !map[x][y].castle.x){
            map[x][y].createEvent(event.destroy);
            map[x][y].build(building.ruins,team.gray);
          }
        }
      }
    }

    this.seeWorld = function(){
      //set null visibility
      for(var x = 0;x < mapsize.x;x++){
        for(var y = 0;y < mapsize.y;y++){
          if(!this.visible[x][y]){
            this.visible[x][y] = null;
          } else {
            if(map[x][y].building && this.visible[x][y] == true){
              this.visible[x][y] = {building: map[x][y].building, team:map[x][y].team}
            } else if(!map[x][y].building) {
              this.visible[x][y] = "mapped";
            }
          }
        }
      }
    }
  }
