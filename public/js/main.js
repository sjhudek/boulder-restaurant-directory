var map;
var infowindow;

// $("#displayListing").toggle();

function initMap (){

  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 40.0149856,
      lng: -105.2705456
    },
    zoom: 15,
    mapTypeId: 'roadmap',
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.LEFT_TOP
    }
  }, {

    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    },
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
    },
    fullscreenControl: true
  });
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: {
     lat: 40.0149856,
     lng: -105.2705456
   },
   radius: 500,
   type: ['store']
 }, callback);
};

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createListItem(place) {
  console.log(place);
  var stars = '';
  for (let i = 0; i < Math.round(place.rating); i ++) {
    stars += '&star;'
  }
  var content = `
  <div class="col-xs-4 pa-3 ma-3" style="height:150px; padding: 5px;"> 
  <hr>
    <p>${place.name}</p>
    <p>${place.googleAddress}</p>
    <p>Rating: ${place.rating} ${stars}</p>
  </div>  
  `

  $('#resultList').append(content);
}

function createMarker(place) {
  // console.log(place)
    // build html string for content of infoWindow
    var stars = '';
    for (let i = 0; i < Math.round(place.rating); i ++) {
      stars += '&star;'
    }
    var content = `
    <div> 
    <p>${place.name}</p>
    <p>${place.googleAddress}</p>
    <p>Rating: ${place.rating} ${stars}</p>
    </div>
    `;


    var placeLoc = place.location;
    var marker = new google.maps.Marker({
      map: map,
      maxWidth: 300,
      draggable: false,
      animation: google.maps.Animation.DROP,
      position: place.location,
    });
    marker.addListener('click', toggleBounce);

    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(content);
      infowindow.open(map, this);
    });

    function showInfoWindow() {
     var marker = this;
     places.getDetails({
       placeId: marker.placeResult.place_id
     },
     function(place, status) {
       if (status !== google.maps.places.PlacesServiceStatus.OK) {
         return;
       }
       infoWindow.open(map, marker);
       buildIWContent(place);
     });
   }
 };

 $('#searchBtn').on('click', function (event) {
  event.preventDefault();

  var searchWhatToDo = $('#whatToDo').val();
  var searchPlaceToGo = $('#place').val();

  var searchTerm = {
    searchWhat: searchWhatToDo,
    searchPlace: searchPlaceToGo
  }


  var resultsArr = [];
  $.post('/search', searchTerm, (dataFromServer) => {
    console.log(dataFromServer)
    dataFromServer.forEach(function(element){
      createMarker(element);
      createListItem(element);
    })
  });
});


 $("#displayListing").toggle();

 $(document).ready(function() {
  var inpPlace = document.getElementById('place')

  var autocomplete = new google.maps.places.Autocomplete(inpPlace);
  autocomplete.bindTo('bounds', map);
})