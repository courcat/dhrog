//Modules/windows to be opened in game
//Each function is called by ui.window(mod.[mod chosen]);

/* mod API
	this.html
		This is the html appeneded into the window

	this.run
		Is the function called after the html is loaded
*/

var mod = function(){}

//Team Selection
mod.teamSelect = function(){
	//html
	this.html = `
		<span class='ui_title'>Team Options</span><br>
		<div onclick='game.startTeam(team.red)' class='team team_red'>AI</div><!--Dymar-->
		<div onclick='game.startTeam(team.blue)' class='team team_blue'>AI</div><!--Syngo-->
		<div onclick='game.startTeam(team.green)'  class='team team_green'>AI</div><!--Gyang-->
		<div onclick='game.startTeam(team.yellow)' class='team team_yellow'>AI</div><!--Syrpo-->

		<span class="button button_main ui_title" style="clear:left;background-color:var(--color-light);" onclick="game.startGame(); $('.ui_cover').remove();">Start</span>
	`;

	//onload
	this.run = function(){
		var win_setTeamColors = function(team){
			$('.team_' + team['text'])[0].style.backgroundColor = team.color['light'];
		}

		win_setTeamColors(team.red);
		win_setTeamColors(team.blue);
		win_setTeamColors(team.green);
		win_setTeamColors(team.yellow);
	}
}

//build menu
mod.build = function(){
	//html
	this.html = `
		<span class='ui_title'>Build</span><br>
		<div onclick='game.build(building.shack); ui.close();' class='button_lg shack'>Shack</div>
		<div onclick='game.build(building.garden); ui.close();' class='button_lg garden'>Garden</div>
		<div onclick='game.build(building.tower); ui.close();' class='button_lg tower'>Tower</div>
		<div onclick='game.build(building.mill); ui.close();' class='button_lg mill'>Lumber Mill</div>
		<div onclick='game.build(building.quarry); ui.close();' class='button_lg quarry'>Quarry</div>
		<div onclick='game.build(building.mine); ui.close();' class='button_lg quarry'>Mine</div>
		<div onclick='game.build(building.researchCenter); ui.close();' class='button_lg researchCenter'>ResearchCenter</div>
		<div onclick='ui.close();' class='button_lg'>Cancel</div>

		<style>

			.buildingSupplies {
				font-size: 75%;
				text-align: left;
				display: block;
			}

		</style>
	`;

	//onload
	this.run = function(){
		//get supplies for each building type
		var win_getSupplies = function(building){
			var result = "";

			result = engine.listInventoryFor(building);

			if(building.produces){
				result = result + "<br>produces: " + building.produces.text;
			}

			$('.' + building.text).append("<br><span class='buildingSupplies'>" + result + "</span>");
		}

		//call for each buildable building
		win_getSupplies(building.shack);
		win_getSupplies(building.garden);
		win_getSupplies(building.tower);
		win_getSupplies(building.mill);
		win_getSupplies(building.researchCenter);
		win_getSupplies(building.quarry);
		win_getSupplies(building.mine);
	}
}

//Hire menu
mod.train = function(){
	this.html = `
		<span class='ui_title'>Train</span><br>
		<div onclick='game.train(unit.worker); ui.close();' class='button_lg worker'>Worker</div>
		<div onclick='game.train(unit.spearman); ui.close();' class='button_lg spearman'>Spearman</div>
		<div onclick='game.train(unit.builder); ui.close();' class='button_lg builder'>Builder</div>
		<div onclick='game.train(unit.archer); ui.close();' class='button_lg archer'>Archer</div>
		<div onclick='game.train(unit.knight); ui.close();' class='button_lg knight'>Knight</div>
		<div onclick='game.train(unit.swordsman); ui.close();' class='button_lg swordsman'>Swordsman</div>
		<div onclick='game.train(unit.catapult); ui.close();' class='button_lg catapult'>Catapult</div>
		<div onclick='game.train(unit.ram); ui.close();' class='button_lg catapult'>Ram</div>
		<div onclick='ui.close();' class='button_lg'>Cancel</div>

		<style>

		  .unitSupplies {
		    font-size: 75%;
		    text-align: left;
		    display: block;
		  }

		</style>

		<script>
		  win_getSupplies(unit.worker);
		  win_getSupplies(unit.spearman);
			win_getSupplies(unit.builder);
			win_getSupplies(unit.archer);
			win_getSupplies(unit.knight);
			win_getSupplies(unit.swordsman);
			win_getSupplies(unit.catapult);
			win_getSupplies(unit.ram);

		  function win_getSupplies(unit){
		    var result = "";

		    result = engine.listInventoryFor(unit);

		    $('.' + unit.text).append("<br><span class='unitSupplies'>" + result + "</span>");
		  }
		</script>
	`;
}

//Research menu
mod.research = function(){
	this.html = `
		<span class='ui_title'>Research</span><br>
		Google it.<br>
		<span class="button button_main" onclick="$('.ui_cover').remove();">Fine.</span>
	`;
}

//Politics menu
mod.politics = function(){
	this.html = `
		<span class='ui_title'>Politics</span><br>
		Vote me for President.<br>
		<span class="button button_main" onclick="$('.ui_cover').remove();">No, you Racist.</span>
	`;
}

//pause
mod.pause = function(){
	this.html = `
		<span class='ui_title'>Pause</span><br>
	  <ul class="win_menu">
			<li onclick="ui.close()" class="title button">Resume</li>
	    <li onclick="async(function(){ui.window(mod.menu);});" class="title button">Main Menu</li>
	    <li onclick="map.save(); ui.close();" class="title button">Save</li>
	  </ul>

	  <style>
	  .win_menu {
	    width: 50%;
	    margin: auto;
	    margin-top: 5px;
	  }

	  .ui_title {
	    font-size: 200%;
	  }

		.title {
			padding: 10px;
		}
	  </style>
	`;
}

//mobileMenu
mod.mobileMenu = function(){
	this.html = `
	  <ul class="win_menu">
			<li onclick="ui.window(mod.build);" class="build_button title button">Build</li>
			<li onclick="ui.window(mod.upgrade);" class="upgrade_button title button">Upgrade</li>
			<li><hr></li>
			<li onclick="ui.window(mod.train);" class="title button">Train</li>
			<li onclick="ui.window(mod.research);" class="title button">Research</li>
			<li onclick="ui.window(mod.politics);" class="title button">Politics</li>
			<li><hr></li>
			<li onclick="ui.close();" class="title button">cancel</li>
	  </ul>

	  <style>
	  .win_menu {
	    width: 50%;
	    margin: auto;
	    margin-top: 5px;
	  }

	  .ui_title {
	    font-size: 200%;
	  }

		.title {
			padding: 10px;
		}
	  </style>
	`;
}

//menu
mod.menu = function(){
	this.html = `
	  <ul class="win_menu">
			<li><img id="logo" src="data/banner.png" alt="Legend of Dhorg"></li>
			<li onclick="ui.window(mod.maps)" class="title button"> Play </li>
			<li onclick="ui.window(mod.online)" class="title button"> Play Online </li>
	    <li onclick="$('.ui_cover').remove(); async(function(){ui.window(mod.help)});" class="title button">Help</li>
	    <li onclick="$('.ui_cover').remove(); async(function(){ui.window(mod.credits)});" class="title button">Credits</li>
	  </ul>

	  <style>

	  #logo {
	    width: 120%;
			position: relative;
			left: -10%;
			margin-bottom: 5%;
			display: block;
	  }

		.title {
			padding: 15px;
		}
	  </style>

		<script>
		pause = true;
		game.team = team.grey;
		ui.hello();
		game.setTeams();
		</script>
	`;
}

//online menu
mod.online = function(){
	//html
	this.html = `
	  <ul class="win_menu">
			<li><img id="logo" src="data/banner.png" alt="Legend of Dhorg"></li>
			<input placeholder="enter game code"></input>
	  </ul>
	`;

	//onload
	this.run = function(){

	}
}

//select map
mod.maps = function(){
	this.html = `
	  <ul class="win_menu">
			<li><img id="logo" src="data/banner.png" alt="Legend of Dhorg"></li>
	  </ul>

		<div class="maplist">loading...</div>

		<script>
		var value = map.listSlots();

		value += "<div class='mapslot mapslot_import'><p class='map_details'>Drag here to import</p></div>";

	  value += "<style>.mapslot_import:hover { top: 0px; } .mapslot_import {text-align: center;} .mapslot_new {text-align: center;}</style>";

	  value += "<div class='mapslot mapslot_new' onclick='map.newSlot()'><p class='map_details'>New Game</p></div>";

	  $('.maplist').html(value);
		</script>
	`;
}

//credits
mod.credits = function(){
	this.html = `
		<div class="ui_left">
			<span class='ui_title'>Credit Due</span><br>
			  The game was created based off of a free pixel sprite I found on itch.io by
			  <a href="https://toen.itch.io/toens-medieval-strategy" target="_blank">Toen</a>. It served as
			  the inspiration and a huge majority of the graphics for the game. Without him,
			  this game wasn't possible.<br>
			  <br><span class="title">Team:</span>
			  <ul>
			    <li><a href="https://dotjersh.github.io" target="_blank">Josh G</a> - Producer, Developer, Project Lead, Me</li>
			    <li>Philip G - Game Mechanics, Developer</li>
					<li>Andrew J - Audio Engine, Game Mechanics</li>
					<li>Lote P - Backup Art</li>
					<li><a href="https://courcat.itch.io/" target="_blank">Courcat</a> and team  - Publishing, Press, support, and resources</li>
					<li>Faith G - Love and Press</li>
					<li>Riley N - Press</li>
			  <ul>

			  <br><span class="title">Special Thank:</span>
			  <ul>
					<li>Lote P - Game critiquing, realist, and support</li>
			    <li>My Dad - For getting me into coding and teaching me JS</li>
			    <li>Zach C - Support</li>
			    <li><a href="https://managore.itch.io/m3x6" target="_blank">Daniel Linssen</a> - Font</li>
			    <li>stackoverflow.com - my fam <3</li>
			  </ul>
			  <br>
			  &copy; Copyright 2017 <a href="https://courcat.itch.io/" target="_blank">Courcat</a><br><br>

				<span class="button button_main" onclick="ui.back();">Cool</span>
		</div>
	`;
}

//help
mod.help = function(){
	this.html = `
		<div class="ui_left">
			<span class='ui_title'>Help</span><br>
			  I love you tons. I really do. And sometimes the best thing to do for someone is to let them figure it out themselves. I hear it builds character.<br><br>
				<span class='ui_title'>Controls</span><br>
				<code>Enter</code> for next turn<br>
				<code>Esc</code> to exit fullscreen, or to pause<br>
				<code>WASD</code> or <code>Right Click</code> to select tile<br>
				<code>Left Click</code> or <code>M</code> then <code>WSAD</code> to move selected unit<br>
				<code>?</code> to open this menu<br>
				<br>
				<code>b</code> to build<br>
				<code>t</code> to train<br>
				<code>r</code> to research<br>
				<code>p</code> to open politics<br><br>

				<span class="button button_main" onclick="ui.back();">Cool</span>
		</div>
	`;
}

//next
mod.next = function(){
	this.html = `
		<style>.ui_cover { font-size: 150%; }</style>
		<span class='ui_title'>Next Player</span><br>
		Please pass the device to the next player if applicable.<br><br>
		<span class="button button_main" onclick="ui.back();">I am the new Heir to this Magical Box</span>
	`;
}

//upgrade
mod.upgrade = function(){
	this.html = `
		<span class='ui_title'>Upgrade</span><br>

		<div class='button_lg upgrade1'></div>
		<div class='button_lg arrow'>-></div>
		<div class='button_lg upgrade2' style="float: right;"></div>

		<div class="win_clear">
			<span class="button button_main" onclick="ui.back();">Naw</span>
			<span class="button button_main" onclick="game.upgrade(); ui.close();">Upgrade</span>
		</div>

		<style>

			.win_clear {
				clear: both;
				width: 100%;
				padding-top: 20px;
			}

			.buildingSupplies {
				font-size: 75%;
				text-align: left;
				display: block;
			}

		</style>

		<script>
			$('.upgrade1').html(map.tile.building.text + "<br><span class='buildingSupplies'>" + engine.listInventoryFor(map.tile.building) + "</span>");
			$('.upgrade2').html(map.tile.building.upgrade.text + "<br><span class='buildingSupplies'>" + engine.listInventoryFor(map.tile.building.upgrade) + "</span>");
		</script>
	`;
}
