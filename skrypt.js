var Opsm="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var map = new L.Map('map');
var osm = new L.TileLayer(Opsm, {minZoom: 1, maxZoom: 50, attribution: osmAttrib});
map.setView(new L.LatLng(51.11, 17.04),12);
map.addLayer(osm);