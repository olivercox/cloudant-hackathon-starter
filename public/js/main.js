var geocoder;
$(document).ready(function() {
  geocoder = new google.maps.Geocoder();
  // Place JavaScript code here...
  if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(codeLatLng);
      } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
      }


});

function codeLatLng(position) {
  var lat = parseFloat(position.coords.latitude);
  var lng = parseFloat(position.coords.longitude);
  var latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        console.log(results);
        var addressLabel = document.getElementById("userAddress");
        addressLabel.innerText = results[0].formatted_address;
      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });
}
