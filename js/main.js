(function () {
    // var lists = $('ul li');
    var nameField = $('#name');
    var geoLocation = navigator.geolocation;

    // lists.click(function() {
    //     var that = $(this);
    //     lists.removeClass('active');
    //     that.addClass('active');
    // });

    if ( geoLocation ) {
        initialize();
        var startPos;
        navigator.geolocation.getCurrentPosition(function(position) {
            startPos = position;
            codeLatLng(startPos.coords.latitude + ',' + startPos.coords.longitude);
        });
    }

    var geocoder;
    function initialize() {
        geocoder = new google.maps.Geocoder();
    };

function codeLatLng(coords) {
    var latlngStr = coords.split(",",2);
    var lat = parseFloat(latlngStr[0]);
    var lng = parseFloat(latlngStr[1]);
    var latlng = new google.maps.LatLng(lat, lng);

    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        $('#zipCode').html('Your current zip code is ' + results[4].address_components[0].long_name);
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }


    nameField.on('blur', function () {
        var that = $(this);
        var thatValue = that.val();
        var referButton = $('.refer');

        if ( thatValue.indexOf(' ') > 0 ) {
            thatValue = thatValue.split(' ')[0];
        }

        referButton.html('Refer ' + thatValue);

    });

}());