if (Meteor.isClient) {

  Template.mapPost.rendered = function() {
//
//         map = new google.maps.Map(document.getElementById("map-canvas"), watchId);
    if (navigator.geolocation) { //Checks if browser supports geolocation
//
//       var watchId = navigator.geolocation.watchPosition(success, error, options);
//
//       var options = {
//             enableHighAccuracy: true,
//             timeout: 60000,
//             maximumAge: 1000
//        };
////Error
//        function error() {
//        alert("Sorry, no position available.");
//        };
////Watcher
//        function success(location) {
//            console.log("changing");
//            var myLatlng = new google.maps.LatLng(location.coords.latitude,location.coords.longitude);
//                map.setCenter(myLatlng);
//                map.setZoom(15);
//    //show current location on map
//                marker = new google.maps.Marker({
//                position: myLatlng,
//                map: map,
//                icon: im
//         });
//
//         var im = "http://www.robotwoods.com/dev/misc/bluecircle.png"
//         var sunCircle = {
//            strokeColor: "#19A3D1",
//            strokeOpacity: 0.8,
//            strokeWeight: 2,
//            fillColor: "#19A3D1",
//            fillOpacity: 0.35,
//            map: map,
//            center: new google.maps.LatLng(location.coords.latitude,location.coords.longitude),
//            radius: 804.672 // in meters
//        };
//        cityCircle = new google.maps.Circle(sunCircle)
//        cityCircle.bindTo('center', marker, 'position');
// 
//        navigator.geolocation.clearWatch(watchId);
//        setInterval(function () {
//        success(location);
//        }, 5000);
//
//     }
//
//
//        }
//     }
//   }; 
// ***************************************


      var map,
                currentPositionMarker,
                mapCenter = new google.maps.LatLng(40.700683, -73.925972),
                map;

            function initializeMap()
            {
                map = new google.maps.Map(document.getElementById('map-canvas'), {
                   zoom: 15,
                   center: mapCenter,
                   mapTypeId: google.maps.MapTypeId.ROADMAP
                 });
            }

            function locError(error) {
                // the current position could not be located
                alert("The current position could not be found!");
            }

            function setCurrentPosition(pos) {
              var im = "http://www.robotwoods.com/dev/misc/bluecircle.png"

                currentPositionMarker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(
                        pos.coords.latitude,
                        pos.coords.longitude
                    ),
                    title: "You are here",
                });
                map.panTo(new google.maps.LatLng(
                        pos.coords.latitude,
                        pos.coords.longitude
                    ));
              var sunCircle = {
                  strokeColor: "#19A3D1",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#19A3D1",
                  fillOpacity: 0.35,
                  map: map,
                  center: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude ),
                  radius: 804.672 // in meters
             };
                  cityCircle = new google.maps.Circle(sunCircle)
                 cityCircle.bindTo('center', currentPositionMarker, 'position');

            }

            function displayAndWatch(position) {
                // set current position
                setCurrentPosition(position);
                // watch position
                watchCurrentPosition();
            }

            function watchCurrentPosition() {
                var positionTimer = navigator.geolocation.watchPosition(
                    function (position) {
                        setMarkerPosition(
                            currentPositionMarker,
                            position
                        );
                    console.log("changed position");
                    });
            }

            function setMarkerPosition(marker, position) {
                marker.setPosition(
                    new google.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude)
                );
            }

            function initLocationProcedure() {
                 var options = {
                   enableHighAccuracy: true,
                   timeout: 60000,
                   maximumAge: 1000
                }
                initializeMap();
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(displayAndWatch, locError, options);
                } else {
                    alert("Your browser does not support the Geolocation API");
                }
            }

            $(document).ready(function() {
                initLocationProcedure();
            });

}
}
}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
