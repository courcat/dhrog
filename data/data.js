//Config
  //map size
  var mapsize = {
    x: 50,
    y: 40
  };

  //tilessize
  var tilesize = {
    original: 64,
    display: 64
  }

  //colors
  var color = {
    yellow: {light:"#F3AA20", medium: "#A58134", dark: "#593726"},
    green: {light: "#4EAE43", medium: "#327754", dark: "#1E3A1E"},
    blue: {light: "#5673AD", medium: "#465565", dark: "#282735"},
    red: {light: "#C71E14", medium: "#7A1E19", dark: "#2A1213"},
    default: {light: "#AA986D", medium: "#968660", dark: "#5e533a"}
  }

  //Teams
  var teams = {
    red: {color:color.red,ai:true},
    blue: {color:color.blue,ai:true},
    green: {color:color.green,ai:true},
    yellow: {color:color.yellow,ai:true},
    grey: {color:color.default,ai:true}
  }

//Default Constructor
  var constructorPrototype = function(text, prop){
      this[text] = {};

      //bring in any new data from the constructor
      var list = Object.keys(this.null);
      for(var i = 0; i < list.length; i++){
        this[text][list[i]] = this.null[list[i]];
        if(prop[list[i]] != undefined){
          this[text][list[i]] = prop[list[i]];
        }
      }
      //finish up final variable
      this[text].text = text;
    }

//Data
  //Ground
    function ground(){}

    //constructor
    ground.create = constructorPrototype;

    //default
    ground.null = {
      text: null,
      x: 0, y: 20,
      walk: false
    }

    //toJSON
    ground.null.toJSON = function() {
      return this.text;
    }

    ground.create("land", {x: 1, y: 0, walk:true });

    ground.create("water", {x: 0, y: 24, walk:false });

  //Terrain
    function terrain(){}

    //constructor
    terrain.create = constructorPrototype;

    //default
    terrain.null = {
      text: null,
      x: 0, y: 20,
      movementcost: 2,
      ontop: null,
      travel: false
    }

    //toJSON
    terrain.null.toJSON = function() {
      return this.text;
    }

    terrain.create("default", { x: 0, y: 20 });

    /* land terrain */

    terrain.create("grass", { x: 0, y: 0, movementcost: 2, ontop: ground.land, travel: true});

    terrain.create("forest", { x: 4, y: 0, movementcost: 5, ontop: ground.land, travel: true});

    terrain.create("forest1", { x: 5, y: 0, movementcost: 5, ontop: ground.land, travel: true});

    terrain.create("forest2", { x: 6, y: 0, movementcost: 5, ontop: ground.land, travel: true});

    terrain.create("hill", { x: 6, y: 1, movementcost: 10, ontop: ground.land, travel: true});

    terrain.create("hillsmall", { x: 6, y: 3, movementcost: 8, ontop: ground.land, travel: true});

    terrain.create("pond", { x: 6, y: 2, movementcost: 10, ontop: ground.land, travel: true});

    terrain.create("mountainS", { x: 4, y: 1, movementcost: 100, ontop: ground.land, travel: false});

    terrain.create("mountainM", { x: 3, y: 1, movementcost: 100, ontop: ground.land, travel: false});

    terrain.create("mountainL", { x: 5, y: 1, movementcost: 100, ontop: ground.land, travel: false});

    terrain.create("farmland", { x: 2, y: 0, movementcost: 2, ontop: ground.land, travel: true});

    terrain.create("hills", { x: 6, y: 3, movementcost: 8, ontop: ground.land, travel: true});

    terrain.create("rocks", { x: 6, y: 28, movementcost: 10, ontop: ground.land, travel: true});

    terrain.create("gold", { x: 6, y: 29, movementcost: 10, ontop: ground.land, travel: true});

    /* water terrains */

    terrain.create("fish", { x: 6, y: 34, movementcost: 5, ontop: ground.water, travel: true});

    terrain.create("shoal1", { x: 0, y: 34, movementcost: 100, ontop: ground.water, travel: false});

    terrain.create("shoal2", { x: 1, y: 34, movementcost: 100, ontop: ground.water, travel: false});

    terrain.create("seaweed", { x: 6, y: 30, movementcost: 20, ontop: ground.water, travel: true});
    

  //Borders
    function border(){}

    border.sandN = { text: "sandN", x: 1, y: 25 }
    border.sandS = { text: "sandS", x: 1, y: 27 }
    border.sandE = { text: "sandE", x: 2, y: 26 }
    border.sandW = { text: "sandW", x: 0, y: 26 }

    border.sandNW = { text: "sandNW", x: 0, y: 28 }
    border.sandNE = { text: "sandNE", x: 2, y: 28 }
    border.sandSW = { text: "sandSW", x: 0, y: 30 }
    border.sandSE = { text: "sandSE", x: 2, y: 30 }

    border.sandCornerNW = { text: "sandCornerNW", x: 0, y: 25 }
    border.sandCornerNE = { text: "sandCornerNE", x: 2, y: 25 }
    border.sandCornerSW = { text: "sandCornerSW", x: 0, y: 27 }
    border.sandCornerSE = { text: "sandCornerSE", x: 2, y: 27 }

  //inventory
    function item(){}

    //constructor
    item.create = constructorPrototype;

    //default
    item.null = {
      text: null,
      x: null,
      y: null,
      default: 0,
      color: 'black'
    }

    //toJSON
    item.null.toJSON = function() {
      return this.text;
    }

    item.create("gold", {x: 3, y: 22, color:"#b5a017"});
    item.create("iron", {x: 4, y: 22, color:"#afafaf"});
    item.create("stone", {x: 5, y: 22, color:"#7c7c7c"});
    item.create("wood", {x: 6, y: 22, color:"#816951"});
    item.create("food", {x: 6, y: 21, color:"#1f930c"});
    item.create("horse", {x: 3, y: 15, color:"#811111"});
    item.create("research", {x: 3, y: 21, color:"#0e6979"});

    item.list = [item.gold,item.iron,item.stone,item.wood,item.food,item.horse,item.research];

  //Buildings
    var building = {};

    //constructor
    building.create = constructorPrototype;

    //building defaults
    building.null = {
    	text: null,
      x: 0,
      y: 20,
      buildable:false,
      cost:false,
      produces:false,
      count: 0,
      reqWorker: false,
      upgrade: false,
      flag:false,
      buildbeside: false,
      buildon: false,
      water: false,
      castle: false,
      visibility: 2,
      health: 250,
      defensive: false
    }

    //toJSON
    building.null.toJSON = function() {
      return this.text;
    }

    /* Legend
    Resources:
    g = Gold
    f = Food
    h = Horses
    s = Stone
    i = Iron
    r = Research
    v = Visibility
    Extras:
    W = Requires worker
    NB = Not buildable (most likely means that this is an upgrade)
    I = Inactive/not yet implemented
    */
    
    // Gold producers
    //capital - 7g (NB)
      building.create("capital", { x: 6, y: 4, cost:{gold:75,iron:50,stone:100,wood:90,food:65}, produces:item.gold, count:7, flag:true});
    //metropolis - 6g (NB)
      building.create("metropolis", { x: 1, y: 4, cost:{gold:50,iron:40,stone:80,wood:75,food:50}, produces:item.gold, count:6, upgrade:building.capital, flag:true});
    //city - 5g (NB)
      building.create("city", { x: 1, y: 2, cost:{gold:40,iron:20,stone:60,wood:50,food:30}, produces:item.gold, count:5, upgrade:building.metropolis, flag:true});
    //town - 4g (NB)
      building.create("town", { x: 0, y: 3, cost:{gold:30,iron:10,stone:50,wood:40,food:20}, produces:item.gold, count:4, upgrade:building.city, flag:true});
    //house - 3g (NB)
      building.create("house", { x: 2, y: 1, cost:{gold:20,stone:20,wood:20,food:10}, produces:item.gold, count:3, upgrade:building.town, flag:true});
    //cottage - 2g (NB)
      building.create("cottage", { x: 1, y: 1, cost:{gold:10,stone:10,wood:20,food:10}, produces:item.gold, count:2, upgrade:building.house, flag:true});
    //shack - 1g
      building.create("shack", { x: 0, y: 1, buildable:true, cost:{gold:5,wood:10,food:10}, produces:item.gold, count:1, upgrade:building.cottage, flag:true});


    // Food producers
    //farm - 5f (W,NB)
      building.create("farm", { x: 6, y: 9, cost:{iron:10,stone:20,wood:50,food:40}, produces:item.food, count:5, reqWorker: true, flag:true});
    //field - 4f (W,NB)
      building.create("field", { x: 6, y: 6, cost:{stone:10,wood:40,food:30}, produces:item.food, count:4, reqWorker: true, upgrade:building.farm, flag:true});
    //patch - 3f (W,NB)
      building.create("patch", { x: 6, y: 7, cost:{wood:30,food:20}, produces:item.food, reqWorker: true, count:3, upgrade:building.field, flag:true});
    //garden - 2f (W,NB)
      building.create("garden", { x: 6, y: 8, cost:{wood:20,food:15}, produces:item.food, count:2, reqWorker: true, upgrade:building.patch, flag:true});
    //windmill - 1f (W)
      building.create("windmill", {x: 3, y: 24, buildable:true, cost:{wood:10,food:10}, produces:item.food, count:1, reqWorker: true, upgrade:building.garden, flag:true});

      
    // Horse producers
    //ranch - 2h (W,NB)
      building.create("ranch", { x: 2, y: 2, cost:{stone:50,wood:50,food:50,gold:25}, produces:item.horse, count:2, reqWorker: true, flag:true});
    //stables - 1h (W)
      building.create("stables", { x: 2, y: 2, buildable:true, cost:{stone:25,wood:25,food:25}, produces:item.horse, count:1, reqWorker: true, upgrade:building.ranch, flag:true});

    
    // Stone production
    //quarry - 2s (W,NB)
      building.create("quarry", { x: 0, y: 5, cost:{stone:20,wood:20,food:20}, produces:item.stone, count:2, reqWorker: true, flag:true, buildbeside:terrain.hill});
    //digsite - 1s (W)
      building.create("digsite", { x: 0, y: 5, cost:{stone:10,wood:10,food:10}, produces:item.stone, count:1, reqWorker: true, upgrade:building.quarry, flag:true, buildbeside:terrain.hill});

    
    // Iron production
    //mineshaft - 2i (W,NB)
      building.create("mineshaft", { x: 0, y: 5, cost:{iron:10,stone:10,wood:10,food:10}, produces:item.iron, count:2, reqWorker: true, flag:true, buildbeside:terrain.rock});
    //mine - 1i (W)
      building.create("mine", { x: 0, y: 5, cost:{stone:10,wood:10,food:10}, produces:item.iron, count:1, reqWorker: true, upgrade:building.mineshaft, flag:true, buildbeside:terrain.rock});


    // Wood production
    //sawmill - 2w (W,NB)
      building.create("sawmill", { x: 0, y: 2, cost:{iron:10,stone:10,wood:10,food:10}, produces:item.wood, count:2, reqWorker: true, buildbeside: terrain.forest2});
    //mill - 1w (W)
      building.create("mill", { x: 0, y: 2, buildable:true, cost:{stone:1,wood:10,food:10}, produces:item.wood, count:1, reqWorker: true, upgrade:building.sawmill, buildbeside: terrain.forest2});

    
    // Research production
    //researchCenter - 1r (W)
      building.create("researchCenter", { x: 6, y: 4, buildable:true, cost:{stone:10,wood:100,food:100,gold:100}, produces:item.research, count:1, reqWorker: true});

    
    // Defensive buildings
    //castle3 - 6v (D,NB)
      building.create("castle3", { x: 4, y: 7, cost:{stone:10,wood:10,food:10}, upgrade:false, castle:true, visibility: 6, health:1000, defensive:true });
        building.castle3.I = { x: 4, y: 7, color:"I" }
        building.castle3.II = { x: 5, y: 7, color:"II" }
        building.castle3.III = { x: 4, y: 8, color:"III" }
        building.castle3.IV = { x: 5, y: 8, color:"IV" }
    //castle2 - 5v (D,NB)
      building.create("castle2", { x: 0, y: 7, cost:{stone:10,wood:10,food:10}, upgrade:building.castle3, castle:true, visibility: 5, health:750, defensive:true });
        building.castle2.I = { x: 0, y: 7, color:"I" }
        building.castle2.II = { x: 1, y: 7, color:"II" }
        building.castle2.III = { x: 0, y: 8, color:"III" }
        building.castle2.IV = { x: 1, y: 8, color:"IV" }
    //castle - 4v (D,NB)
      building.create("castle", { x: 2, y: 7, cost:{stone:10,wood:10,food:10}, upgrade:building.castle2, castle: true, visibility: 4, health:500, defensive:true });
        building.castle.I = { x: 2, y: 7, color:"I" }
        building.castle.II = { x: 3, y: 7, color:"II" }
        building.castle.III = { x: 2, y: 8, color:"III" }
        building.castle.IV = { x: 3, y: 8, color:"IV" }
    //fort - 8v (D,NB)
      building.create("fort", {x: 1, y: 4, cost:{stone:15,wood:15,food:15,gold:10,iron:10}, visibility: 8 ,health:750, defensive:true });
        building.fort.red = { x: 2, y: 4, color:"red" }
        building.fort.green = { x: 3, y: 4, color:"green" }
        building.fort.blue = { x: 4, y: 4, color:"blue" }
        building.fort.yellow = { x: 5, y: 4, color:"yellow" }
    //tower - 6v (D)
      building.create("tower", {x: 1, y: 3, buildable:true, cost:{stone:1,wood:10,food:10}, visibility: 6 , upgrade:building.fort, health:500, defensive:true });
        building.tower.red = { x: 2, y: 3, color:"red" }
        building.tower.green = { x: 3, y: 3, color:"green" }
        building.tower.blue = { x: 4, y: 3, color:"blue" }
        building.tower.yellow = { x: 5, y: 3, color:"yellow" }

        
    // Other buildings
    //dock
      building.create("dock", {x: 6, y: 26, cost:{stone:20,wood:50,food:10,gold:100}, buildbeside: ground.water});
    //ruins
    building.create("ruins", { x: 0, y: 4 } );
    building.create("sword", { x: 1, y: 5 });
    building.create("shield", { x: 6, y: 25 });

  //Units
    function unit(){};

    //constructor
    unit.create = constructorPrototype;

    //building defaults
    unit.null = {
      text: null,
      x: 0,
      y: 20,
      hire:false,
      cost:false,
      health: 100,
      defense: 0, //0 - 100
      attack: 30, //30 - 70
      movement: 10,
      visibility: 2,
      range: 1
    }

    //toJSON
    unit.null.toJSON = function() {
      return this.text;
    }

    //worker
      unit.create("worker", { x: 5, y: 36, hire:true, cost:{gold:10,food:5} });
        unit.worker.blue = { x: 2, y: 35, color:"blue" }
        unit.worker.red = { x: 2, y: 36, color:"red" }
        unit.worker.yellow = { x: 2, y: 37, color:"yellow" }
        unit.worker.green = { x: 4, y: 37, color:"green" }

    //builder
      unit.create("builder", { x: 6, y: 35, hire:true, cost:{gold:10,food:5} });
        unit.builder.blue = { x: 0, y: 35, color:"blue" }
        unit.builder.red = { x: 0, y: 36, color:"red" }
        unit.builder.yellow = { x: 0, y: 37, color:"yellow" }
        unit.builder.green = { x: 4, y: 35, color:"green" }
        
    //scout
      unit.create("scout", { x: 6, y: 35, hire:true, cost:{gold:40,food:10,iron:5}, visibility:5, health:50, movement: 15});
        unit.scout.blue = { x: 0, y: 35, color:"blue" }
        unit.scout.red = { x: 0, y: 36, color:"red" }
        unit.scout.yellow = { x: 0, y: 37, color:"yellow" }
        unit.scout.green = { x: 4, y: 35, color:"green" }

    //spearman
      unit.create("spearman", { x: 6, y: 15, hire:true, cost:{gold:10,food:5,wood:2,iron:1}, attack: 67, defense: 50 });
        unit.spearman.blue = { x: 1, y: 16, color:"blue" }
        unit.spearman.red = { x: 1, y: 17, color:"red" }
        unit.spearman.yellow = { x: 1, y: 18, color:"yellow" }
        unit.spearman.green = { x: 1, y: 19, color:"green" }

    //spearman
      unit.create("swordsman", { x: 6, y: 16, hire:true, cost:{gold:10,food:5,wood:2,iron:2}, attack: 68, defense: 70 });
        unit.swordsman.blue = { x: 2, y: 16, color:"blue" }
        unit.swordsman.red = { x: 2, y: 17, color:"red" }
        unit.swordsman.yellow = { x: 2, y: 18, color:"yellow" }
        unit.swordsman.green = { x: 2, y: 19, color:"green" }

    //knight
      unit.create("knight", { x: 6, y: 16, hire:true, cost:{gold:10,food:5,wood:2,iron:10,horse:5}, attack: 100, defense: 30, movement:15 });
        unit.knight.blue = { x: 3, y: 16, color:"blue" }
        unit.knight.red = { x: 3, y: 17, color:"red" }
        unit.knight.yellow = { x: 3, y: 18, color:"yellow" }
        unit.knight.green = { x: 3, y: 19, color:"green" }

    //archer
      unit.create("archer", { x: 0, y: 16, hire:true, cost:{gold:10,food:5,wood:10,stone:20}, range: 4, attack: 80, defense: 20 });
        unit.archer.blue = { x: 0, y: 16, color:"blue" }
        unit.archer.red = { x: 0, y: 17, color:"red" }
        unit.archer.yellow = { x: 0, y: 18, color:"yellow" }
        unit.archer.green = { x: 0, y: 19, color:"green" }

    //catapult
      unit.create("catapult", { x: 4, y: 16, hire:true, cost:{gold:100,food:5,wood:50,stone:50}, range: 4, attack: 50, defense: 50 });
        unit.catapult.blue = { x: 4, y: 16, color:"blue" }
        unit.catapult.red = { x: 4, y: 17, color:"red" }
        unit.catapult.yellow = { x: 4, y: 18, color:"yellow" }
        unit.catapult.green = { x: 4, y: 19, color:"green" }

    //ram
      unit.create("ram", { x: 5, y: 16, hire:true, cost:{gold:100,food:50,wood:50,iron:50}, attack: 10, defense: 90, movement: 1});
        unit.ram.blue = { x: 5, y: 16, color:"blue" }
        unit.ram.red = { x: 5, y: 17, color:"red" }
        unit.ram.yellow = { x: 5, y: 18, color:"yellow" }
        unit.ram.green = { x: 5, y: 19, color:"green" }

  //interface
      var interface = {};

    //box
      interface.redBox = { text: "redBox", x: 3, y: 42 }

      interface.blueBox = { text: "redBox", x: 4, y: 42 }

      interface.greenBox = { text: "greenBox", x: 5, y: 42 }

      interface.yellowBox = { text: "yellowBox", x: 6, y: 42 }

      interface.clearBox = { text: "clearBox", x: 5, y: 26 }

      interface.cloud = { text: "cloud", x: 5, y: 25 }

      interface.fogBox = { text: "fogBox", x: 4, y: 25 }

    //other
      interface.goldstar = { text: "goldstar", x: 3, y: 20 }

      interface.bluestar = { text: "bluestar", x: 3, y: 21 }

    //flag
      interface.flag = {};

      interface.flag.red = { text: "redflag", x: 4, y: 21 }

      interface.flag.blue = { text: "blueflag", x: 5, y: 21 }

      interface.flag.yellow = { text: "yellowflag", x: 5, y: 20 }

      interface.flag.green = { text: "greenflag", x: 6, y: 20 }

    //arrows
      interface.dot = {};

      interface.dot.green = { x: 5, y: 25 }

      interface.dot.yellow = { x: 5, y: 27 }

      interface.dot.red = { x: 5, y: 28 }

      interface.dot.blue = { x: 5, y: 30 }

//Events
  function event(){};

  //constructor
  event.create = constructorPrototype;

  //event defaults
  event.null = {
    duration: 4,
    type: 'turn',
    x: 0,
    y: 0
  }

  event.create("attack", {x:4,y:24,duration: 30,type:'flash'});

  event.create("death", {x:0,y:43,type:'turn'});

  event.create("destroy", {x:0,y:33,type:'turn'});

  event.create("burn", {x:0,y:33,type:'turn', duration: 1000});
