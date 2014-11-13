var Opsm="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var map = new L.Map('map');
var osm = new L.TileLayer(Opsm, {maxZoom: 50, attribution: osmAttrib});
var widok=new L.LatLng(51.11, 17.04);
var zum=12;
map.setView(widok,zum);
map.addLayer(osm);
$("form").hide();

var flagi=[];
for(i=0;i<$('.przycisk').size();i++ ){
	flagi.push(false);}
	
var dlugosc=flagi.length;
function reset(){
	for(var i=0; i<dlugosc; i++){
			flagi[i]=false;
			}}

$(".przycisk").click(function(){
reset();		
	var wartosc=$(this).html();
	console.log(wartosc);
	if (wartosc==="Dodaj marker"){
	function reset(){
	for(var i=0; i<dlugosc; i++){
			console.log(flagi[i]);}
			}
		flagi[0]=true;
	}
	else if (wartosc==="Usuń markery"){
		console.log("usun");
		flagi[1]=true;
	 	marki.clearLayers();
	}
	else if (wartosc==="Dodaj adnotację"){
		flagi[2]=true;
	}
	else if (wartosc==="Dodaj adnotację do elementu"){
		flagi[3]=true;
	}
	else if (wartosc==="Usuń adnotacje"){
		flagi[4]=true;
		adno.clearLayers();
	}
		else if (wartosc==="Dodaj WMS"){
		flagi[5]=true;
		$("form").toggle();
		
	}
		else if (wartosc==="Przywróć zasięg"){
		flagi[7]=true;
		map.setView(widok,zum);
	}
});
$("#wms").keypress(function(event){var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		var adres=$(this).val();	
	}});
$("#warstwy").keypress(function(event){var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		var warstwy=$(this).val();	
	}}
	
	);	


function klik2(e){
	this.getLatLng();
	if(flagi[3]===true){
	 	var tekst=prompt("Podaj tekst adnotacji");
	 	var to=this.bindPopup(tekst).openPopup();
		adno.addLayer(to);
	 	flagi[3]=false;
	 	}	
}

var marki=L.layerGroup();
var adno=L.layerGroup();
var baseMaps = {
    "OpenStreetMap":osm};
var overlayMaps = {};
L.control.layers(baseMaps, overlayMaps).addTo(map);

function klikniecie(e){
	 //alert("You clicked the map at " + e.latlng);
	 if(flagi[0]===true){
	 	marki.addLayer(L.marker(e.latlng).on('click', klik2));
	 	marki.addTo(map);
	 	}
	 	
	 if(flagi[2]===true){
	 	var tekst=prompt("Podaj tekst adnotacji");
	 	var pop=L.marker(e.latlng).bindPopup(tekst);
	 	adno.addLayer(pop);
	 	adno.addTo(map);
	 	pop.openPopup();
	 	}	
	 }
	 
map.on('click', klikniecie);


	

