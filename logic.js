// set map
var myMap = L.map("map", {
    center: [37,-95],
    zoom: 3,
  });
  
    //tile layer
    L.tileLayer("https://api.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png?" +
    "access_token=pk.eyJ1Ijoic2tvcm5hamNpayIsImEiOiJjamhjOXRsc3UwMHowM2RvNzRpb2VhZWtuIn0.783rXY1TuRXIMy5cNyvxiA").addTo(myMap);
   
// geojson data from usgs.gov

  var queryUrl = new XMLHttpRequest(); 
  queryUrl.open("GET",'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson',false);
  queryUrl.send(null);
  queryUrl.responseText
  
  var obj = JSON.parse(queryUrl.responseText);
  
  // markersize
  function markerSize(num) {
    return num;
  }
  // marker color
   var colors = ['green','blue','yellow','orange','red','purple']
  
  // arkers for the earthquakes, 
  for (var i = 0; i < obj.features.length; i++) {
    var feature = obj.features[i];
    var loc = feature.geometry.coordinates;
    var magnitude = feature.properties.mag;
    var depth = feature.geometry.coordinates[2];
    if (magnitude < 1){
      col = colors[0]
    } else if (magnitude >= 1 && magnitude < 2){
      col = colors[1]
    } else if (magnitude >= 2 && magnitude < 3){
      col = colors[2]
    } else if (magnitude >= 3 && magnitude < 4){
      col = colors[3]
    } else if (magnitude >= 4 && magnitude < 5){
      col = colors[4]
    } else {
      col = colors[5]
    }
    L.circleMarker([loc[1], loc[0]], {
      fillOpacity: .6,
      color: "black",
      fillColor: col,
      weight: 1,
      radius: markerSize(magnitude)
    }).bindPopup("<h3>Magnitude : " + magnitude + "</h3>"+"<strong>Depth: </strong>" + depth + ' kilometers'+
        '<br>'+new Date(feature.properties.time) )
      .addTo(myMap);
  
  
 
  };
  