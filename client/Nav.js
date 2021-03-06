if (Meteor.isClient) {

    var getDistanceBetween = function(lat1, lon1, lat2, lon2) {
        var R = 6371; //Radius of earth in km
        var dLat = deg2rad(lat2-lat1); 
        var dLon = deg2rad(lon2-lon1);
        var a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
             return d;
    };
    
    var deg2rad = function(deg) {
        return deg * (Math.PI/180);
    };

    
  alertSubmit = function() {
    var UsersInR = [];
    var distance = 0.402336; //.25 miles in KM
    var des = $('#alertDescription').val();
// finding user profile and getting the longitude latitude of the user
    var usr = Profile.findOne({id: Meteor.userId()});
    var centerlng = usr.coords.k;
    var centerlat = usr.coords.A;
// finding ALL users and putting them into an array using fetch
    var profile = Profile.find();
    var fetch = profile.fetch();
// Looping through all profiles
    for(var i=0; i < fetch.length; i++) {
        if(usr.id === fetch[i].id) {
        } else {
         var lng = fetch[i].coords.k;
         var lat = fetch[i].coords.A;
         var between = getDistanceBetween(centerlat, centerlng, lat, lng);
// Checks if distance between is less then .25 mile radius
              if(between <= distance) {
                  UsersInR.push(fetch[i].id); }
        }; 
    }
    for(var i=0; i < UsersInR.length; i++) {
        console.log('users in range');
       var a =  Alerts.insert({id: UsersInR[i], description: des, userId: Meteor.userId(), info: usr.info, picture: usr.picture})
    
    }
    
        
             
    };

   Template.menu.events({
    
    'click .menu-toggle' : function() {
        $(".navBarContainer").toggleClass('shift');
        $("#alertFormContainer").toggleClass('toggle_profile', true);
        $('#profile-page').toggleClass('toggle_profile', true);
    },

    'click #profile' : function() {
        $(".navBarContainer").toggleClass('shift', true);
        $('#alertFormContainer').toggleClass('toggle_profile', true);
        $('#profile-page').toggleClass('toggle_profile');
    
        
    },
    
    'click #alert' : function() {
        $(".navBarContainer").toggleClass('shift', true);
        $('#profile-page').toggleClass('toggle_profile', true);
        $('#alertFormContainer').toggleClass('toggle_profile');
    

    }, 

    'click #log-out' : function() {
        Meteor.logout(function(err) {
         if (err) {
            //show error message
         } else {
            $('#profile-page').toggleClass('toggle_profile', true);
            $('#alertFormContainer').toggleClass('toggle_profile', true);
            //show alert that says logged out
         }
       }); 
    },

    'click #contact' : function() {
    },
    

/*    'click #alert' : function() {
        if (document.getElementById('alert-form')) {
            $('#alert-form').remove();
        }
        else {
            $('body').prepend(Template.alertTemplate);
             $('#alertSubmit').click(function(e) {
                    e.preventDefault();
                         alertSubmit();
            $('#alert-form').remove();
    });
 
        }
     }
*/

  });
    
   

};


