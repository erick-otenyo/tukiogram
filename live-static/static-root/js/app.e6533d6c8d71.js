// Geo-explorer
if (typeof console !== 'undefined' && typeof console.log === 'function' && !window.test) {
    console.log('\r\n%c                     *      .--.\r\n%c                           \/ \/  `\r\n%c          +               | |\r\n%c                 \'         \\ \\__,\r\n%c             *          +   \'--\'  *\r\n%c                 +   \/\\\r\n%c    +              .\'  \'.   *\r\n%c           *      \/======\\      +\r\n%c                 ;:.  _   ;\r\n%c                 |:. (_)  |\r\n%c                 |:.  _   |\r\n%c       +         |:. (_)  |          *\r\n%c                 ;:.      ;\r\n%c               .\' \\:.    \/ `.\r\n%c              \/ .-\'\':._.\'`-. \\\r\n%c              |\/    \/||\\    \\|\r\n%c            _..--\"\"\"````\"\"\"--.._\r\n%c      _.-\'``                    ``\'-._\r\n%c    -\'         %cHello, explorer%c        \'-\r\n%c' +
        '\n       Curious about maps? Visit us at axisspatial.co.ke',
        'color:#D0E3F1', 'color:#D0E3F1', 'color:#C0DAEC', 'color:#C0DAEC', 'color:#B0D1E8', 'color:#B0D1E8', 'color:#A1C7E3', 'color:#A1C7E3', 'color:#91BEDE', 'color:#91BEDE', 'color:#81B5D9', 'color:#81B5D9', 'color:#72ABD5', 'color:#72ABD5', 'color:#62A2D0', 'color:#62A2D0', 'color:#5299CB', 'color:#5299CB', 'color:#4390C7', 'color:#4390C7', 'color:#4390C7', 'color: #000000');
}


//initialize tukio-homemap
var map = L.map('tukio-homemap', {
    center: [-1.09713135, 37.014170107681],
    zoom: 16,
    closePopupOnClick: false
});
map.zoomControl.setPosition('bottomright');
var user_interaction = '<br><button type="button" title="Confirm" class="btn btn-default btn-xs" aria-label="Left Align"> <span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span><span class="badge">4</span></button>    <button type="button" title="Deny" class="btn btn-default btn-xs" aria-label="Left Align"> <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span> <span class="badge"></span> </button>';

//add  a spinner until all tukios are loaded
map.spin(true);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZXJpY2tvdGVueW8iLCJhIjoiY2owYXlsb2kxMDAwcjJxcDk3a2Q0MmdpZSJ9.GJQzHfNMElZ7OhW_HbnaXw', {
    maxZoom: 18,
    attribution: ' Tiles &copy; <a href="http://www.mapbox.com">MapBox</a>'
}).addTo(map);

//function to return an icon based on the tukio category--- an alert is red, --- an event is blue
function getIcon(category, latlng) {
    if (category == 'event') {
        return L.marker(latlng, {
            icon: L.icon.pulse({
                iconSize: [25, 25],
                color: '#00BCD9',
                animate: false,
                heartbeat: '0.5'
            })
        });
    } else {
        return L.marker(latlng, {
            icon: L.icon.pulse({iconSize: [25, 25], color: 'red'})
        });
    }
}

$.ajax({
    methods: "GET",
    url: '/api/tukios',//our api endpoint
    success: function (data) {

        // initialize a layer that takes the returned GeoJSON data
        tukio_layer = new L.GeoJSON(data, {

            pointToLayer: function (feature, latlng) {

                //determine the category of a tukio then add a popup with a class for styling it uniquely
                if (feature.properties.category == 'alert') {
                    pop_ = L.popup({className: 'popup-alert'})
                        .setLatLng(latlng)
                        .setContent(feature.properties.desc + user_interaction);
                } else {
                    pop_ = L.popup({})
                        .setLatLng(latlng)
                        .setContent(feature.properties.desc + user_interaction);
                }

                //return a marker and attach a popup with style information
                return getIcon(feature.properties.category, latlng).bindPopup(pop_);
            }
            // removed code for alert pops
        });

        //add the tukio_layer now to the map

        map.addLayer(tukio_layer);

        // remove spinner after tukios are added to map
        map.spin(false);

        // fit the map to the extent/bounds of the tukio layer
        map.fitBounds(tukio_layer.getBounds());
    }
});

//Geo-location
L.control.locate({
    position: 'bottomright',
    icon: 'glyphicon glyphicon-screenshot',
    iconLoading: "glyphicon gly phicon-refresh glyphicon-spin",
    markerStyle: {
        stroke: true,
        color: '#2C2D29',
        weight: 2
    },
    keepCurrentZoomLevel: true,
    returnToPrevBounds: true,
    cacheLocation: true,
    drawCircle: false,
    showPopup: true,
    strings: {
        title: "My Location",
        popup: 'me'
    }

}).addTo(map);


// Enable picking of location when user clicks on the add tukio button

$(".add-button").on('click', function () {
    $("#add-help").show();
    enableAddTukio();
});

// The location-pick enabling function
function enableAddTukio() {
    map.on('click', addTukio)
}

//Show new tukio entry form modal, pick location of clicked area,set it in the form and disable further map location picks
function addTukio(e) {
    $('#postModal').modal('show');
    var lat = e.latlng.lat.toString();
    var lng = e.latlng.lng.toString();
    $('#location_geom').val("POINT (" + lng + " " + lat + ")");
    map.off('click', addTukio);
    $("#add-help").hide();

}

// Handle a cancelled tukio-form
$(".tukio-cancel-form").click(function (e) {
    e.preventDefault();
    $(".tukio-form").trigger('reset');
    $('#postModal').modal('hide');
});

//Ajax --- Handle a  valid tukio submission to server, hide form modal if ajax successful, add the new tukio to map, reset tukio form,
$(".tukio-form").submit(function (e) {
    e.preventDefault();

    var addTukioAPIEndpoint = 'api/tukios/add/';
    $.ajax({
        method: "POST",
        data: $(this).serialize(),
        url: addTukioAPIEndpoint,
        success: function (data) {
            $('#postModal').modal('hide');
            tukio_layer.addData(data);
            $(".tukio-form").trigger('reset');
        },
        error: function (error) {
            console.log(error)
        }
    })
});