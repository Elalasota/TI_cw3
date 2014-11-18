var Opsm="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var map = new L.Map('map');
var osm = new L.TileLayer(Opsm, {maxZoom: 50, attribution: osmAttrib});
var widok=new L.LatLng(51.11, 17.04);
var zum=12;
map.setView(widok,zum);
map.addLayer(osm);
$("#formularz").hide();
var kontrola=[];
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
	 	adno.clearLayers();
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
		$("#formularz").toggle();
		
	}
	else if (wartosc==="Usuń warstwy WMS"){
		//console.log(kontrola[0]);
		flagi[6]=true;
		for(i=0;i<kontrola.length;i++){
			console.log(kontrola[i]);
			map.removeLayer(kontrola[i]);
			war.removeLayer(kontrola[i]);}
	}
		else if (wartosc==="Przywróć zasięg"){
		flagi[7]=true;
		map.setView(widok,zum);}});
	
var przezroczystosc=false;
var forma='image/jpeg';
var wart="";
var style="";
var wersja='1.1.1';
var ukl=null;
function wysylanie(){
	if($( "input[type='radio']:checked" )){wart=$( "input[type='radio']:checked" ).val();}
	if (wart=="tak"){
		console.log("Tak");
		przezroczytosc=true;}
	else{przezroczytosc=false; console.log("Nie");}
	if (wiadomosc2($("#style"))==true){style=$("#style").val();}
	if (wiadomosc2($("#format"))==true){forma=$("#format").val();}
	if (wiadomosc2($("#wersja"))==true){wersja=$("#wersja").val();}
	if (wiadomosc2($("#crs"))==true){ukl=$("#crs").val();}
	var spr=wiadomosc($("#wms"));
	var spr1=wiadomosc($("#warstwy"));
	if (spr==true&&spr1==true){
			var adres=$("#wms").val();
			var warstwy=$("#warstwy").val();
			var nexrad=L.tileLayer.wms(adres, {layers: warstwy, format: forma, transparent:przezroczytosc, styles:style, version:wersja, crs:ukl});
			nexrad.addTo(map);
			war.addOverlay(nexrad, 'wms');
			kontrola.push(nexrad);
			}}	

$("#wyslij").click(function(){
	wysylanie();
	});

$("#warstwy").keypress(function(event){var keycode = (event.witch ? event.witch : event.which);
	if(keycode == '13'){
		wysylanie();
		}});
		
function klik2(e){
	this.getLatLng();
	if(flagi[3]===true){
	 	var tekst=prompt("Podaj tekst adnotacji");
	 	var to=this.bindPopup(tekst).openPopup();
		adno.addLayer(to);
	 	flagi[3]=false;
	 	}}

function wiadomosc(typ){
	var wyn=true;
	console.log(typ.length);
	$.each(typ, function(key, object){
		console.log($(this).val());
        if ($(this).val()==false ){
        	$(this).addClass("error");
            wyn=false;}
        else{$(this).removeClass("error");};
		});
	return wyn;}

function wiadomosc2(typ){
	var wyn=true;
	console.log(typ.length);
	$.each(typ, function(key, object){
		console.log($(this).val());
        if ($(this).val()==false ){
            wyn=false;}
		});
	return wyn;}



var marki=L.layerGroup();
var adno=L.layerGroup();
var baseMaps = {"OpenStreetMap":osm};
var overlayMaps = {};
var war=L.control.layers(baseMaps, overlayMaps).addTo(map);

function klikniecie(e){
	 //alert("You clicked the map at " + e.latlng);
	 if(flagi[0]===true){
	 	marki.addLayer(L.marker(e.latlng).on('click', klik2));
	 	marki.addTo(map);}
	 	
	 if(flagi[2]===true){
	 	var tekst=prompt("Podaj tekst adnotacji");
	 	var pop=L.marker(e.latlng).bindPopup(tekst);
	 	adno.addLayer(pop);
	 	adno.addTo(map);
	 	pop.openPopup();}}
	 	 
map.on('click', klikniecie);

