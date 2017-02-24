/*
    Date: 2016-01-01
*/
var app = {
    // Some scoped variables

    onDeviceReady : function () {
        //alert("device ready.");
        console.log("deviceready.");
        if (device.platform === "iOS") {
            // deals with post-iOS-7 change that covers the status bar
            // http://coenraets.org/blog/2013/09/phonegap-and-cordova-with-ios-7/
            document.body.style.marginTop = "20px";
        } else if (device.platform == 'Android') {
            // Get rid of 300ms delay 
            document.addEventListener('DOMContentLoaded', function() { FastClick.attach(document.body); }, false);
            alert("android bah");
        } else if (device.platform == 'browser') {
            console.log("You are using a brower.");
            //alert("browser bah");
            //navigator.splashscreen.show();
             //navigator.vibrate(500);
            
            setTimeout(function() {
        console.log("timeout fired.");
          navigator.splashscreen.hide();
    },
    5000);
            
            
            
        }

    }
};

// Wait for PhoneGap to load
document.addEventListener("deviceready", app.onDeviceReady, false);

// This JS object is create to support `app.onDeviceReady()`, and the timeout below.
// When `deviceready` fires, this variable is overwritten.
// The hope is that "Cordova/Phonegap" have completed before the timeout.
var device = {platform:'browser'};

// This timeout check to see if `cordova.js` has loaded the `device` plugin.
setTimeout(function() {
        console.log("timeout fired.");
        if (! ('cordova' in device) ) {
            app.onDeviceReady();
        }
    },
    2000);

// Note: this is created last with the hope that the entire DOM has loaded.
// If needed, we could wrap this with a function.
// The best time to load this binding is after the `deviceready` event has fired.
// 
var  isVisible = 0; // if element initially hidden, then this to zero (0), else one (1).

$('#toggle').on('click', function() {
    console.log("isVisible:" + isVisible );
    if (isVisible) {
        $('#togglePane').addClass('hide');
        isVisible = 0;
    } else {
        $('#togglePane').removeClass('hide');
        isVisible = 1;
    }
});

$('#vibrate').on('click', function() {
    console.log("isVisible:" + isVisible );
    navigator.vibrate(500);
    alert("vibrate");
});




document.getElementById("getPosition").addEventListener("click", getPosition);
document.getElementById("watchPosition").addEventListener("click", watchPosition);

function getPosition() {

   var options = {
      enableHighAccuracy: true,
      maximumAge: 3600000
   }
	
   var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

   function onSuccess(position) {

      alert('Latitude: '          + position.coords.latitude          + '\n' +
         'Longitude: '         + position.coords.longitude         + '\n' +
         'Altitude: '          + position.coords.altitude          + '\n' +
         'Accuracy: '          + position.coords.accuracy          + '\n' +
         'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
         'Heading: '           + position.coords.heading           + '\n' +
         'Speed: '             + position.coords.speed             + '\n' +
         'Timestamp: '         + position.timestamp                + '\n');
   };

   function onError(error) {
      alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
   }
}

function watchPosition() {

   var options = {
      maximumAge: 3600000,
      timeout: 3000,
      enableHighAccuracy: true,
   }

   var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

   function onSuccess(position) {

      alert('Latitude: '          + position.coords.latitude          + '\n' +
         'Longitude: '         + position.coords.longitude         + '\n' +
         'Altitude: '          + position.coords.altitude          + '\n' +
         'Accuracy: '          + position.coords.accuracy          + '\n' +
         'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
         'Heading: '           + position.coords.heading           + '\n' +
         'Speed: '             + position.coords.speed             + '\n' +
         'Timestamp: '         + position.timestamp                + '\n');
   };

   function onError(error) {
      alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
   }

}
    



var Latitude = undefined;
var Longitude = undefined;

// Get geo coordinates

function getMapLocation() {

    navigator.geolocation.getCurrentPosition
    (onMapSuccess, onMapError, { enableHighAccuracy: true });
}

// Success callback for get geo coordinates

var onMapSuccess = function (position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;

    getMap(Latitude, Longitude);

}

// Get map by using coordinates

function getMap(latitude, longitude) {

    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map
    (document.getElementById("map"), mapOptions);


    var latLong = new google.maps.LatLng(latitude, longitude);

    var marker = new google.maps.Marker({
        position: latLong
    });

    marker.setMap(map);
    map.setZoom(15);
    map.setCenter(marker.getPosition());
}

// Success callback for watching your changing position

var onMapWatchSuccess = function (position) {

    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;

    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

        Latitude = updatedLatitude;
        Longitude = updatedLongitude;

        getMap(updatedLatitude, updatedLongitude);
    }
}

// Error callback

function onMapError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

// Watch your changing position

function watchMapPosition() {

    return navigator.geolocation.watchPosition
    (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
}