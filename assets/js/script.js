console.log("test");
var locationForm = document.querySelector('#location-form');
var locationInput = document.querySelector('#location.input');
var intrestInput = document.querySelectorAll('#intrests');
var lat;
var lon;
var seatGeekAPI;
var geoAPI;
var now=dayjs().format("YYYY-MM-DD")
console.log(now) 
var seatGeekContainer = document.querySelector('#seatgeek');
var breweriesContainer = document.querySelector('#breweries');



function gatherAPI(event){
  event.preventDefault();
  // console.log("running");
  var location= locationInput.value.trim();
  geoAPI= 'https://api.openweathermap.org/geo/1.0/direct?q=' + location +',840&limit=1&appid=e7ef61c6ce67516bc22001eacd3518fd'
  fetch(geoAPI)
  .then(function(response) {
      
      return response.json();
  })
  .then(function(data) {
    for (var i = 0; i < data.length; i++) {
    lat = data[i].lat;
    lon = data[i].lon;
    console.log(lat,lon)
    seatGeekAPI = "https://api.seatgeek.com/2/recommendations?client_id=MjUxNTU1NTR8MTY4NTQ3MTQ0OC4wNTE2MTE3&lat="+lat+"&lon="+lon+"&datetime_utc.gt="+now+"&events.id=1162104"
    openBrewAPI = "https://api.openbrewerydb.org/v1/breweries?by_dist="+lat+","+lon+"&per_page=5"
    }
   console.log(seatGeekAPI)
   console.log(openBrewAPI)
    seatGeekRec(seatGeekAPI)
    openBrewRec(openBrewAPI)
  })
    .catch(error => console.log(error));
    
}


function seatGeekRec(event){
console.log(seatGeekAPI, lat, lon);
console.log()
 fetch(seatGeekAPI)
    .then(function(response) {
      return response.json();  
    })
    .then(function(data) {
      console.log(data);
      for (var i = 0; i < data.recommendations.length; i++){
        // var title = recommendations.events.title
        // console.log(i)
        // console.log(title)
      }
    
      }
    );
  }

  function openBrewRec(){
    console.log(openBrewAPI)

    fetch(openBrewAPI)
    .then(function(response) {
      return response.json();  
    })
    .then(function(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++){
        console.log(i)
        var brewName= data[i].name
        brewName = document.createElement("h3");
        brewName.textContent = data[i].name
        // breweriesContainer.append(brewName)


        // console.log(brewName)
        var brewAdd = data[i].address_1
        var brewCity = data[i].city
        var brewState = data[i].state
        var brewURL = data[i].website_url
        console.log(brewAdd,brewCity,brewState)
        console.log(brewURL);
      }
      }
    );
    }
    
    
    dayjs().format()
    locationForm.addEventListener('submit', gatherAPI)

// fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey=owAxRtDuPwIoxlebtT48GgfdkDkJBIlI")
//     .then(function(response) {
//       return response.json();  
//     })
//     .then(function(data) {
//       console.log(data);
    
//       }
//     );

// fetch("https://api.openbrewerydb.org/v1/breweries?by_dist=42.324,-88.9541&per_page=3")
//     .then(function(response) {
//       return response.json();  
//     })
//     .then(function(data) {
//       console.log(data);
    
//       }
//     );
