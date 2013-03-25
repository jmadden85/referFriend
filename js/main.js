(function () {
    var nameField = $('#name');
    var geoLocation = navigator.geolocation;
    var fbSignIn = $('.fbSignIn');
    var regSignIn = $('.signIn');
    var passwordQuestion = $('#passwordQuestion');
    var userNameQuestion = $('#userNameQuestion');
    var sendUserInfo = $('.sendUserInfo');
    var sendPassInfo = $('.sendPasswordInfo');
    var forgotName = $('.forgotName');
    var forgotPassword = $('.forgotName');
    var signedIn = $('.signedIn');
    var notSignedIn = $('.notSignedIn');
    var showHide = $('.showHide');
    var touchStarted = false; // detect if a touch event is sarted
    var currX = 0;
    var currY = 0;
    var cachedX = 0;
    var cachedY = 0;


    /***********************************************************
        Touchy business
    ***********************************************************/
    // Hammer(showHide).on('tap', function() {
    //     var that = $(this);
    //     var nextWindow = $('.' + that.attr('data-nextWindow'));
    //     var thisContainer = that.parents('section');
    //     console.log(this);
    // });

    showHide.on('touchstart', function (ev) {
        var that = $(this);
        ev.preventDefault;
        return false;
    });

    showHide.on('touchend', function (ev) {
        var that = $(this);
        ev.preventDefault;
        return false;
    });

    showHide.on('touchstart mousedown',function (e){
        var that = $(this);
        var thatContainer = that.parents('.shown');
        var nextContainer = $('.' + that.attr('data-nextWindow'));
        e.preventDefault();
        // caching the current x
        cachedX = e.pageX;
        // caching the current y
        cachedY = e.pageY;
        // a touch event is detected
        touchStarted = true;
        // detecting if after 200ms the finger is still in the same position
        setTimeout(function (){
            currX = e.pageX;
            currY = e.pageY;
            if ((cachedX === currX) && !touchStarted && (cachedY === currY)) {
                thatContainer.removeClass('shown')
                    .addClass('hidden');
                nextContainer.removeClass('hidden')
                    .addClass('shown');
            }
        },200);
    });

    showHide.on('touchend mouseup touchcancel',function (e){
        e.preventDefault();
        // here we can consider finished the touch event
        touchStarted = false;
    });

    showHide.on('touchmove mousemove',function (e){
        e.preventDefault();
        if(touchStarted) {
             // here you are swiping
        }
    });



    /***********************************************************
        GeoLocation
    ***********************************************************/

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
            if (status === google.maps.GeocoderStatus.OK) {
                $('#zipCode').html('Your current zip code is ' + results[4].address_components[0].long_name);
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });
    };


    /***********************************************************
        Refer button update on blur of name field
    ***********************************************************/
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