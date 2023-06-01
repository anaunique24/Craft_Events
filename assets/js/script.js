var locationForm = document.querySelector('#location-form');
var locationInput = document.querySelector('#location.input');
var intrestInput = document.querySelectorAll('#intrests');
var lat;
var lon;
var seatGeekAPI;
var geoAPI;
var now=dayjs().format("YYYY-MM-DD")
console.log(now) 
var seatgeek = document.querySelector('.seatgeek');
var brew = document.querySelector('.brew');



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

//
function seatGeekRec(event){
 fetch(seatGeekAPI)
    .then(function(response) {
      return response.json();  
    })
    .then(function(data) {
      console.log(data);
      for (var i = 0; i < data.recommendations.length; i++){
        var title = data.recommendations[i].event.title;
        var date = data.recommendations[i].event.datetime_local;
        var seatGeekURL = data.recommendations[i].event.venue.url;
        var venueName = data.recommendations[i].event.venue.name;
      }
      })
    .catch(error => console.log(error));
  }

  function openBrewRec(){

    fetch(openBrewAPI)
    .then(function(response) {
      return response.json();  
    })
    .then(function(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++){
        var brewContainer = document.createElement('div');
        // var brewName= data[i].name
        var brewName = document.createElement('p');
        var brewAdd = document.createElement('h1');
        var brewCity = document.createElement('h1');
        var brewState = document.createElement('h1');
        var brewURL = document.createElement('a');
        brewName.textContent = data[i].name;
        brewAdd.textContent = data[i].address_1;
        brewCity.textContent = data[i].city;
        brewState.textContent = data[i].state;
        brewURL.textContent = data[i].websiteURL;
        brewContainer.appendChild(brewName);
        brewContainer.appendChild(brewAdd);
        brewContainer.appendChild(brewCity);
        brewContainer.appendChild(brewState);
        brewContainer.appendChild(brewURL);
        console.log(brewName);
        brew.appendChild(brewContainer);


        // var brewAdd = data[i].address_1
        // var brewAdd = document.createElement('h1');
        // brewAdd.textContent = data[i].address_1.city.state;
        // var brewFullAdd = data[i].address_;
        // console.log(brewFullAdd);
        // brewContainer.appendChild(brewAdd);
        // var brewCity = data[i].city;
        // var brewCity = document.createElement('p');
        // brewCity.textContent = data[0].city;
        // brewContainer.appendChild(brewCity);
        // var brewState = data[i].state
        // var brewState = document.createElement('p');
        // brewState.textContent = data[0].state;
        // brewContainer.appendChild(brewState)
        // brewContainer.appendChild(brewAdd, brewCity, brewState);
        
        // var brewURL = document.createElement('h1');
        // brewURL.textContent = data[i].website_url;
        // brewContainer.appendChild(brewURL);
        // console.log(brewAdd,brewCity,brewState)
        // console.log(brewURL)
        // console.log(brewAdd);
        
      }
      })
      // .catch(error => console.log(error));
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
