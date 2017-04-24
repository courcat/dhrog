/* file controls */
var file = {};

//compress map data
file.compress = function(data){
  data = data.replace(/null/gi,'%');
  data = data.replace(/terrain/gi,'#t');
  data = data.replace(/ground/gi,'#g');
  data = data.replace(/building/gi,'#b');
  data = data.replace(/team/gi,'#c');
  data = data.replace(/movement/gi,'#m');
  data = data.replace(/defense/gi,'#d');
  data = data.replace(/attack/gi,'#a');
  data = data.replace(/health/gi,'#h');
  data = data.replace(/water/gi,'#w');
  data = data.replace(/unit/gi,'#u');

  return data;
}

//decompress map data
file.decompress = function(data){
  data = data.replace(/#t/gi,'terrain');
  data = data.replace(/#g/gi,'ground');
  data = data.replace(/#b/gi,'building');
  data = data.replace(/#c/gi,'team');
  data = data.replace(/#m/gi,'movement');
  data = data.replace(/#d/gi,'defense');
  data = data.replace(/#a/gi,'attack');
  data = data.replace(/#h/gi,'health');
  data = data.replace(/#w/gi,'water');
  data = data.replace(/#u/gi,'unit');
  data = data.replace(/%/gi,null);

  //decode JSON

  return JSON.parse(data);
}

file.export = function(){
  download('dhrog.map',map.export());
}

file.import = function(e){
    e.preventDefault();

    var reader = new FileReader();
    reader.readAsText(e.dataTransfer.files[0]);

    reader.onload = function(event) {
        localStorage.setItem("map_" + map.slots, event.target.result);
        ui.window(mod.maps);
        $('body')[0].className = '';
    };

    return false;
}

//Download function
//http://stackoverflow.com/a/18197341/4314753
function download(e,t){var d=document.createElement("a");d.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(t)),d.setAttribute("download",e),d.style.display="none",document.body.appendChild(d),d.click(),document.body.removeChild(d)}
