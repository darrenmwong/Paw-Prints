if (Meteor.isClient) {

  Template.mapPost.rendered = function() {
    if (navigator.geolocation) { //Checks if browser supports geolocation
       // navigator.geolocation.watchPosition(function (position) {                                                              
       // var latitude = position.coords.latitude;                    
       // var longitude = position.coords.longitude;                 
       // var coords = new google.maps.LatLng(latitude, longitude); 
       // var mapOptions = //Sets map options
       //      {
       //          zoom: 15,  //Sets zoom level (0-21)
       //          center: coords, //zoom in on users location
       //          mapTypeControl: true, //allows you to select map type eg. map or satellite
       //          navigationControlOptions:
       //          {
       //          style: google.maps.NavigationControlStyle.SMALL //sets map controls size eg. zoom
        //         },
        //         mapTypeId: google.maps.MapTypeId.ROADMAP
        //     };
//Launch Map 
       var options = {
             enableHighAccuracy: true,
             timeout: 60000,
             maximumAge: 5000
        };
         map = new google.maps.Map(document.getElementById("map-canvas"), watchId);
         var watchId = navigator.geolocation.watchPosition(centerMap, error, options);
//Error
        function error() {
        };
//Watcher
        function centerMap(location) {
            var myLatlng = new google.maps.LatLng(location.coords.latitude,location.coords.longitude);
                map.setCenter(myLatlng);
                map.setZoom(15);
                $("#lat").text("Latitude : " + location.coords.latitude);
                $("#lon").text("Longitude : " + location.coords.longitude);
    //show current location on map
                marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                icon: im
         });

        navigator.geolocation.clearWatch(watchId);

        }
//Sets Marker
        var im = "http://www.robotwoods.com/dev/misc/bluecircle.png"
    //    var marker = new google.maps.Marker({
    //          position: coords,
    //          title: 'Your Location',
    //          map: map,
    //          icon: im
    //     });
//Geolocation Marker

//Radius around current location

        var sunCircle = {
        strokeColor: "#19A3D1",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#19A3D1",
        fillOpacity: 0.35,
        map: map,
        center: coords,
        radius: 804.672 // in meters
         };
        cityCircle = new google.maps.Circle(sunCircle)
        cityCircle.bindTo('center', marker, 'position');
 
     //  });
     }
   }; 


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
