var Opsm="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var map = new L.Map('map');
var osm = new L.TileLayer(Opsm, {maxZoom: 50, attribution: osmAttrib});
var widok=new L.LatLng(51.11, 17.04);
var zum=12;
map.setView(widok,zum);
map.addLayer(osm);
$("#formularz").hide();
$("#form2").hide();
$("#tresc").hide();
$("#strzalka_przod").hide();
$("#strzalka_tyl").hide();
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
flagi[6]=true;
for(i=0;i<kontrola.length;i++){
console.log(kontrola[i]);
map.removeLayer(kontrola[i]);
war.removeLayer(kontrola[i]);}}
else if (wartosc==="Przywróć zasięg"){
flagi[7]=true;
map.setView(widok,zum);}
else if (wartosc==="Wirtualna wycieczka"){
flagi[8]=true;
$("#form2").toggle();
}
else if (wartosc==="Usuń wycieczkę"){
flagi[9]=true;
$("#tresc").hide();
$("#map").height("750px");
if(myLayer){map.removeLayer(myLayer);}
}
});
var mar_czer=L.icon({iconUrl:'obrazy/marker.png', iconSize:[24, 32], iconAnchor:[12, 32], popupAnchor: [0, -20]});
var zoo=L.icon({iconUrl:'obrazy/zoo.png', iconSize:[40, 32], iconAnchor:[20, 32], popupAnchor: [0, -20]});
var fontanna=L.icon({iconUrl:'obrazy/fontanna.jpg', iconSize:[40, 32], iconAnchor:[20, 32], popupAnchor: [0, -20]});
var japonski=L.icon({iconUrl:'obrazy/japonski.png', iconSize:[100, 32], iconAnchor:[50, 32], popupAnchor: [0, -20]});
var hala=L.icon({iconUrl:'obrazy/hala.png', iconSize:[100, 80], iconAnchor:[50, 80], popupAnchor: [0, -50]});
var botaniczny=L.icon({iconUrl:'obrazy/botaniczny.jpg', iconSize:[26, 36], iconAnchor:[13, 36], popupAnchor: [0, -16]});
var panorama=L.icon({iconUrl:'obrazy/panorama.jpg', iconSize:[40, 28], iconAnchor:[20, 28], popupAnchor: [0, -26]});
var ratusz=L.icon({iconUrl:'obrazy/ratusz.png', iconSize:[80, 70], iconAnchor:[40, 70], popupAnchor: [0, -46]});
var opera=L.icon({iconUrl:'obrazy/opera.jpg', iconSize:[40, 28], iconAnchor:[20, 28], popupAnchor: [0, -20]});
var dworzec=L.icon({iconUrl:'obrazy/dworzec.jpg', iconSize:[40, 28], iconAnchor:[20, 28], popupAnchor: [0, -20]});
var katedra=L.icon({iconUrl:'obrazy/katedra.gif', iconSize:[40, 80], iconAnchor:[20,80], popupAnchor: [0, -46]});
var time=0;
var obiekty={};
var tablica=[];
function onEachFeature(feature, layer) {
if (feature.properties && feature.properties.warstwa){
obiekty[feature.properties.warstwa]=feature.geometry.coordinates;
tablica.push([feature.properties.warstwa, feature.geometry.coordinates]);}
if (feature.properties && feature.properties.popupContent) {
layer.bindPopup(feature.properties.popupContent);
}
}
var ikona=mar_czer;
var okno="";
$("#czas").keypress(function(event){var keycode = (event.witch ? event.witch : event.which);
if(keycode == '13'){
if (wiadomosc($("#czas"))==true){time=$("#czas").val();}
if(time<30){
console.log("zle");
myLayer.addTo(map);
$("#map").height("500px");
$("#tresc").show();
$("#tresc").load("start.html");
$("#wycieczka").append("<div id='start'>Start</div>");

$("#start").click(function(){
console.log("klik");
$("#strzalka_przod").show();
okno="dworzec";
$('#tresc').attr('href', okno);
$("#tresc").load(okno+".html");
$("#start").remove();

console.log(obiekty[okno][0]);
map.setView(new L.LatLng(obiekty[okno][1],obiekty[okno][0]), 16);
}); 
}
else{console.log("ok");}
}});
var strony=["dworzec", "opera", "ratusz", "panorama", "katedra", "botaniczny", "hala", "fontanna", "japonski", "zoo"];
var biezace;
var next;
console.log(strony.length);

$("#strzalka_przod").click(function(){
biezace= jQuery.inArray($('#tresc').attr('href'), strony);
$("#strzalka_tyl").show();
if(biezace==strony.length-1)
{$("#strzalka_przod").hide();}else{$("#strzalka_przod").show();}
console.log(biezace);
next=biezace+1;
if(next==strony.length-1){$("#strzalka_przod").hide();}
okno=strony[next];
$("#tresc").load(okno+".html");
map.setView(new L.LatLng(obiekty[okno][1],obiekty[okno][0]), 16);
$('#tresc').attr('href', okno);
});


$("#strzalka_tyl").click(function(){
biezace= jQuery.inArray($('#tresc').attr('href'), strony);
if(biezace>0){$("#strzalka_tyl").show();}else{$("#strzalka_tyl").hide();}
if(biezace==strony.length-1)
$("#strzalka_przod").show();
console.log(biezace);
back=biezace-1;
if(back==0){$("#strzalka_tyl").hide();}
okno=strony[back];
$("#tresc").load(okno+".html");
map.setView(new L.LatLng(obiekty[okno][1],obiekty[okno][0]), 16);
$('#tresc').attr('href', okno);
});


function klik3(e){
$("#start").hide();
$("#strzalka_przod").show();
$("#strzalka_tyl").show();
var zasieg=this.getLatLng();
console.log(this.toGeoJSON());
var warto=this.toGeoJSON();
var oko=warto.properties.warstwa;
$('#tresc').attr('href', oko);
biezace= jQuery.inArray($('#tresc').attr('href'), strony);
if(biezace==0){$("#strzalka_tyl").hide();}
if(biezace==strony.length-1){$("#strzalka_przod").hide();}
console.log(oko);
$("#map").height("500px");
map.setView(zasieg,16);
$("#tresc").load(oko+".html");
}
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
var mojstyl = {
"color": "#CE1A05",
"weight": 4,
"opacity": 0.65
};
var element= {
"type": "FeatureCollection",
"features": [
{
"type": "Feature",
"properties": {"popupContent": "Hala Stulecia", "warstwa":"hala"},
"geometry": {
"type": "Point",
"coordinates": [
17.077313661575317,
51.10681611994552
]
}
},
{
"type": "Feature",
"properties": {"popupContent": "Rotunda - Panorama Racławicka", "warstwa":"panorama"},
"geometry": {
"type": "Point",
"coordinates": [
17.044392228126526,
51.11014374190917
]
}
},
{
"type": "Feature",
"properties": {"popupContent": "Ogród Botaniczny", "warstwa":"botaniczny"},
"geometry": {
"type": "Point",
"coordinates": [
17.04751968383789,
51.11609110092375
]
}
},
{
"type": "Feature",
"properties": {"popupContent": "Wrocławski Rynek", "warstwa":"ratusz"},
"geometry": {
"type": "Point",
"coordinates": [
17.032670974731445,
51.109665495195365
]
}
},
{
"type": "Feature",
"properties": {"popupContent": "Opera wrocławska", "warstwa":"opera"},
"geometry": {
"type": "Point",
"coordinates": [
17.03119844198227,
51.10556651581559
]
}
},
{
"type": "Feature",
"properties": {"popupContent": "Dworzec Kolejowy", "warstwa":"dworzec"},
"geometry": {
"type": "Point",
"coordinates": [
17.037241458892822,
51.098576867141155
]
}
},
{
"type": "Feature",
"properties": {"popupContent": "ZOO", "warstwa":"zoo"},
"geometry": {
"type": "Point",
"coordinates": [
17.07553267478943,
51.10491643885304
]
}
},
{
"type": "Feature",
"properties": {"popupContent": "Ostrów Tumski", "warstwa":"katedra"},
"geometry": {
"type": "Point",
"coordinates": [
17.046586275100708,
51.11418506581072
]
}
},
{
"type": "Feature",
"properties": {},
"geometry": {
"type": "LineString",
"coordinates": [
[
17.036705017089844,
51.09923713939487
],
[
17.036941051483154,
51.099789604851075
],
[
17.03408718109131,
51.100436385289186
],
[
17.03018188476562,
51.10121789957947
],
[
17.02951669692993,
51.10147391000868
],
[
17.031260132789612,
51.10557325231656
]
]
}
},
{
"type": "Feature",
"properties": {},
"geometry": {
"type": "LineString",
"coordinates": [
[
17.031260132789612,
51.10557325231656
],
[
17.03297138214111,
51.10905925985383
],
[
17.030632495880127,
51.10967896700152
],
[
17.0308256149292,
51.11020436437861
]
]
}
},
{
"type": "Feature",
"properties": {},
"geometry": {
"type": "LineString",
"coordinates": [
[
17.0308256149292,
51.11020436437861
],
[
17.031168937683105,
51.110837527640236
],
[
17.03346490859985,
51.11052768287264
],
[
17.035396099090576,
51.11012353440169
],
[
17.037155628204346,
51.10963855157128
],
[
17.038614749908447,
51.109328698765154
],
[
17.039054632186886,
51.10910641177672
],
[
17.040224075317383,
51.10908620381567
],
[
17.04108238220215,
51.10913335571106
],
[
17.041414976119995,
51.10916703560686
],
[
17.04182267189026,
51.10971264649976
],
[
17.041908502578735,
51.11026498676854
],
[
17.041876316070557,
51.110642190963524
],
[
17.044225931167603,
51.11066913400249
],
[
17.044397592544552,
51.11035928810591
]
]
}
},
{
"type": "Feature",
"properties": {},
"geometry": {
"type": "LineString",
"coordinates": [
[
17.044397592544552,
51.11035928810591
],
[
17.044891119003292,
51.110702812779124
],
[
17.04632878303528,
51.11072975578278
],
[
17.04803466796875,
51.1103121374613
],
[
17.049880027770996,
51.113006382847445
],
[
17.050116062164307,
51.113841567022774
],
[
17.04902172088623,
51.113949331623274
],
[
17.04902172088623,
51.11450162125639
],
[
17.047023475170135,
51.11451172405404
]
]
}
},
{
"type": "Feature",
"properties": {},
"geometry": {
"type": "LineString",
"coordinates": [
[
17.047023475170135,
51.11451172405404
],
[
17.046237587928772,
51.11440901217489
],
[
17.04628050327301,
51.11467673610319
],
[
17.046403884887695,
51.11525595740702
],
[
17.04657554626465,
51.11610120337388
]
]
}
},
{
"type": "Feature",
"properties": {},
"geometry": {
"type": "LineString",
"coordinates": [
[
17.04657554626465,
51.11610288711536
],
[
17.046782076358795,
51.1169902103363
],
[
17.050931453704834,
51.1166298951819
],
[
17.053720951080322,
51.11638743854324
],
[
17.05803394317627,
51.11602375119971
],
[
17.06073760986328,
51.1158082314231
],
[
17.0603084564209,
51.113679919650764
],
[
17.06052303314209,
51.11199605923512
]
]
}
},
{
"type": "Feature",
"properties": {},
"geometry": {
"type": "LineString",
"coordinates": [
[
17.06054449081421,
51.11196911696976
],
[
17.06105947494507,
51.112076885936986
],
[
17.06148862838745,
51.111605394849896
],
[
17.06202507019043,
51.11082405617178
],
[
17.064170837402344,
51.11012353440169
],
[
17.06878423690796,
51.10861468221599
],
[
17.06923484802246,
51.10837218352012
],
[
17.07047939300537,
51.10808926676681
],
[
17.072882652282715,
51.10729439614443
],
[
17.075371742248535,
51.10643214814799
],
[
17.077152729034424,
51.10834523914203
],
[
17.078086137771606,
51.109160299629664
],
[
17.079405784606934,
51.109493729322644
]
]
}
},
{
"type": "Feature",
"properties": {"popupContent": "Wrocławska Fontanna Multimedialna", "warstwa":"fontanna"},
"geometry": {
"type": "Point",
"coordinates": [
17.079041004180908,
51.10862815432847
]
}
},
{
"type": "Feature",
"properties": {"popupContent": "Ogród Japoński","warstwa":"japonski" },
"geometry": {
"type": "Point",
"coordinates": [
17.080349922180176,
51.10997534574347
]
}
},
{
"type": "Feature",
"properties": {},
"geometry": {
"type": "LineString",
"coordinates": [
[
17.079395055770874,
51.10949036135798
],
[
17.079730331897736,
51.109515621087006
],
[
17.08000659942627,
51.1093421706695
],
[
17.080146074295044,
51.10939269027577
],
[
17.080057561397552,
51.10952235701242
],
[
17.08034187555313,
51.10958634825488
],
[
17.080229222774506,
51.10966044326704
],
[
17.08010584115982,
51.10976148172857
],
[
17.08001732826233,
51.10979347719531
],
[
17.079665958881378,
51.10991303900664
],
[
17.07938700914383,
51.11009490708429
],
[
17.07927703857422,
51.11019257668245
],
[
17.079405784606934,
51.11035928810591
],
[
17.07962304353714,
51.1104485374087
],
[
17.079813480377197,
51.110462008986616
],
[
17.079861760139465,
51.11046369293356
],
[
17.08010047674179,
51.110478848453454
],
[
17.080266773700714,
51.11049063607662
],
[
17.080339193344116,
51.11043506582689
],
[
17.08041161298752,
51.110379495510315
],
[
17.080481350421906,
51.110335712789606
],
[
17.0805162191391,
51.11025488304242
],
[
17.080591320991516,
51.11027509049245
],
[
17.080787122249603,
51.10996524195402
],
[
17.080897092819214,
51.10968570290312
],
[
17.080572545528412,
51.109593084169994
],
[
17.08022654056549,
51.10936406250566
]
]
}
},
{
"type": "Feature",
"properties": {},
"geometry": {
"type": "LineString",
"coordinates": [
[
17.08022654056549,
51.10936406250566
],
[
17.080355286598206,
51.10923439532488
],
[
17.08075225353241,
51.10919397950585
],
[
17.080923914909363,
51.10902221188069
],
[
17.081159949302673,
51.108772979289434
],
[
17.081353068351746,
51.10850016910149
],
[
17.081422805786133,
51.10809600290011
],
[
17.080897092819214,
51.107031681661894
],
[
17.079588174819943,
51.10615595593529
],
[
17.078837156295776,
51.105536201549064
],
[
17.07847774028778,
51.10538799818205
],
[
17.0782470703125,
51.10548399359897
],
[
17.077616751194,
51.10572819156797
],
[
17.077547013759613,
51.105660826739864
],
[
17.077434360980988,
51.10553451742256
],
[
17.076474130153656,
51.1058730256159
],
[
17.076407074928284,
51.105798924531804
]
]
}
}
]
};
var myLayer = L.geoJson(element, {style:mojstyl, onEachFeature: onEachFeature, pointToLayer: function (feature, latlng) {
switch(feature.properties.warstwa){
case "zoo": return L.marker(latlng, {icon:zoo}).on('click', klik3);
case "fontanna": return L.marker(latlng, {icon:fontanna}).on('click', klik3);
case "japonski": return L.marker(latlng, {icon:japonski}).on('click', klik3);
case "hala": return L.marker(latlng, {icon:hala}).on('click', klik3);
case "botaniczny": return L.marker(latlng, {icon:botaniczny}).on('click', klik3);
case "katedra":return L.marker(latlng, {icon:katedra}).on('click', klik3);
case "panorama":return L.marker(latlng, {icon:panorama}).on('click', klik3);
case "ratusz":return L.marker(latlng, {icon:ratusz}).on('click', klik3);
case "opera":return L.marker(latlng, {icon:opera}).on('click', klik3);
case "dworzec":return L.marker(latlng, {icon:dworzec}).on('click', klik3);
default: return L.marker(latlng, {icon:mar_czer}).on('click', klik3);
}
}});