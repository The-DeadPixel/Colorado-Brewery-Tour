function initMap() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    // var body = document.body, html = document.documentElement;
    var body = document.getElementById('wrapper'), html = document.documentElement;
    console.log(body);
    console.log(html);
    console.log(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) - Math.max(outerHeight.scrollHeight);
    document.getElementById('map').style.height = height + 'px';
    console.log(height);
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: 39.230682, lng: -105.482248} //derived center// old center: {lat: 39.242092, lng: -105.377079}
    });
    var outerLimitCoords = [
        {lat: 40.997594, lng: -109.050001}, // north west
        {lat: 36.999047, lng: -109.045222}, // south west
        {lat: 36.992376, lng: -102.042194}, // south east
        {lat: 40.998408, lng: -102.051328}  // north east
    ];
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));
    map.data.add({geometry: new google.maps.Data.Polygon([outerLimitCoords,])});
    document.getElementById('submit').addEventListener('click', function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    });
    map.data.setStyle({
        fillOpacity: 0.0,
        strokeWeight: 3,
        strokeColor: '#eab36c'
    });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var selectedMode = document.getElementById('mode').value;
    var waypts = [];
    var checkboxArray = document.getElementById('waypoints');
    for (var i = 0; i < checkboxArray.length; i++) {
        if (checkboxArray.options[i].selected) {
            waypts.push({
                location: checkboxArray[i].value,
                stopover: true
            });
        }
    }

    directionsService.route({
        origin: document.getElementById('start').value,
        destination: document.getElementById('end').value,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode[selectedMode]
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}