console.log("test");
var locationForm = document.querySelector('#location-form');
var locationInput = document.querySelector('#location');
var intrestInput = document.querySelectorAll('#intrests');


var gatherAPI = function(event){
  event.preventDefault();
  console.log("running")

}

fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey=owAxRtDuPwIoxlebtT48GgfdkDkJBIlI")
    .then(function(response) {
      return response.json();  
    })
    .then(function(data) {
      console.log(data);
    
      }
    );

 fetch("https://api.seatgeek.com/2/events?client_id=MjUxNTU1NTR8MTY4NTQ3MTQ0OC4wNTE2MTE3&geoip=98.213.245.205&range=12mi")
    .then(function(response) {
      return response.json();  
    })
    .then(function(data) {
      console.log(data);
    
      }
    );

fetch("https://api.openbrewerydb.org/v1/breweries?by_dist=42.324,-88.9541&per_page=3")
    .then(function(response) {
      return response.json();  
    })
    .then(function(data) {
      console.log(data);
    
      }
    );


    locationForm.addEventListener('submit', gatherAPI);