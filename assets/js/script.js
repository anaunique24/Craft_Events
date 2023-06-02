var locationForm = document.querySelector('#location-form');
var locationInput = document.querySelector('#location.input');
var intrestInput = document.querySelectorAll('#intrests');
var seatGeekBox = document.querySelector('#seatgeek-box');
var savedBox = document.querySelector('#saved-brews')
var lat;
var lon;
var seatGeekAPI;
var geoAPI;
var now=dayjs().format("YYYY-MM-DD")
var seatgeek = document.querySelector('.seatgeek');
var brew = document.querySelector('.brew');
var brewListFav = JSON.parse(localStorage.getItem("brewList")) || []
var eventListFav = JSON.parse(localStorage.getItem("eventList")) || []

//Runs when loading the page
startup = function(){
   displaySaved()
}

//displays the local storage in the Saved Breweries box
function displaySaved(){
  savedBox.innerHTML=""
  for (var i=0; i < brewListFav.length; i++) {
    
    var savedBrewName = brewListFav[i].name
    var savedBrewURL = brewListFav[i].url;
    var savedBrewTotal = savedBrewName +" "+savedBrewURL

    var savedList = document.createElement('h2')
    savedList.textContent = savedBrewTotal
    savedBox.appendChild(savedList)
  }
}

//an event listener for the like button the breweries
brew.addEventListener("click",function(e){
  if(e.target.matches(".fa-heart")){
    e.target.setAttribute("style","background-color:red")
    var brewInfo = {
      name:e.target.dataset.name,
      url:e.target.dataset.url
    }
    var ifMatched = false;
    if (brewListFav.length>0) {
      
    
    for (let i = 0; i < brewListFav.length; i++) {
      if(brewInfo.name !=  brewListFav[i].name){
        ifMatched = !(!ifMatched)
      } else {
        ifMatched = !ifMatched
      }
    }
    if(ifMatched === false){
      
      brewListFav.push (brewInfo)
      localStorage.setItem("brewList", JSON.stringify(brewListFav))
    }
  } else {
      brewListFav.push (brewInfo)
      localStorage.setItem("brewList", JSON.stringify(brewListFav))
    }
    displaySaved()
  }
});



//gets location data and creates the API links
function gatherAPI(event){
  
  event.preventDefault();
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
    seatGeekAPI = "https://api.seatgeek.com/2/recommendations?client_id=MjUxNTU1NTR8MTY4NTQ3MTQ0OC4wNTE2MTE3&lat="+lat+"&lon="+lon+"&datetime_utc.gt="+now+"&events.id=1162104"
    openBrewAPI = "https://api.openbrewerydb.org/v1/breweries?by_dist="+lat+","+lon+"&per_page=5"
    }
    seatGeekRec(seatGeekAPI)
    openBrewRec(openBrewAPI)

    localStorage.setItem('locationInput', location);
  })
    .catch(error => console.log(error));
    
}

//displays events
function seatGeekRec(event){
 fetch(seatGeekAPI)
    .then(function(response) {
      return response.json();  
    })
    .then(function(data) {
      seatgeek.innerHTML="";
      for (var i = 0; i < 5; i++){
        var title = data.recommendations[i].event.title;
        var date = data.recommendations[i].event.datetime_local;
        var seatGeekURL = data.recommendations[i].event.venue.url;
        var venueName = data.recommendations[i].event.venue.name;
        var bandImage = data.recommendations[i].event.performers[0].image;
        var geekEl = document.createElement('div');
        var geekBody = document.createElement('div');
        var geekList = document.createElement('div');
        var geekTitle = document.createElement('h2');
        var geekDate = document.createElement('p');
        var geekVenue = document.createElement('p');
        var geekURL = document.createElement('a');
        var favHeartBtn = document.createElement('i');
        var figureEl = document.createElement('figure');
        var imageEl= document.createElement('img');

        favHeartBtn.setAttribute("class","fa-regular fa-heart")
        favHeartBtn.setAttribute("id","heart")
        favHeartBtn.setAttribute("style","color: #000000;")
        favHeartBtn.setAttribute("data-name",title)
        favHeartBtn.setAttribute("data-url",seatGeekURL)
        
        seatgeek.textContent = "Events"
        imageEl.setAttribute("src", bandImage)
        figureEl.setAttribute('class', 'image is-128x128')
        geekEl.classname ="card main-geek-div"
        geekURL.setAttribute('href', seatGeekURL);
        geekURL.setAttribute('target', '_blank');
        geekList.setAttribute('class', 'box pb-5')
        geekTitle.textContent = title
        geekTitle.setAttribute('style', 'font-weight: bold; font-size: 20px')
        geekDate.textContent = dayjs(date).format("MMM-DD-YYYY")
        geekVenue.textContent = venueName
        geekURL.textContent = "Get Tickets"
        
        
        seatGeekBox.appendChild(geekEl);
        seatGeekBox.appendChild(favHeartBtn);
        figureEl.appendChild(imageEl);
        geekEl.appendChild(geekList);
        geekList.appendChild(figureEl)
        geekList.appendChild(geekTitle); 
        geekList.appendChild(geekDate); 
        geekList.appendChild(geekVenue); 
        geekList.appendChild(geekURL);
        geekList.appendChild(favHeartBtn);
      }
      })
    .catch(error => console.log(error));
  }

//An event listener for the like button on the events. Feature not implimented yet
  seatGeekBox.addEventListener("click",function(e){
    if(e.target.matches(".fa-heart")){
      var eventInfo = {
        title:e.target.dataset.name,
        seatGeekURL:e.target.dataset.url
      }
      eventListFav.push(eventInfo);
      localStorage.setItem("geekList", JSON.stringify(eventListFav))
    }
  })

//functions that recommends breweries from the city search
  function openBrewRec(){

    fetch(openBrewAPI)
    .then(function(response) {
      return response.json();  
    })
    .then(function(data) {
      brew.innerHTML=""
      brew.textContent="Breweries"
      brew.className = "brew pb-5"
      for (var i = 0; i < data.length; i++){
        var brewContainer = document.createElement('div');
        var brewName = document.createElement('p');
        var brewAdd = document.createElement('h1');
        var brewURL = document.createElement('a');
        var favHeartBtn = document.createElement('i');
        favHeartBtn.setAttribute("class","fa-regular fa-heart")
        favHeartBtn.setAttribute("id","heart")
        favHeartBtn.setAttribute("style","color: #000000;")
        favHeartBtn.setAttribute("data-name",data[i].name)
        favHeartBtn.setAttribute("data-url",data[i].website_url)

        // brew.textContent = "Breweries"
        brewName.textContent = data[i].name;
        brewAdd.textContent = data[i].address_1 + ", " + data[i].city + ", " + data[i].state;
        brewURL.textContent = data[i].website_url;
        brewContainer.appendChild(brewName);
        brewContainer.appendChild(brewAdd);
        brewContainer.appendChild(brewURL);
        brewContainer.setAttribute('class', 'pb-5')
        brewURL.setAttribute('href', data[i].website_url);
        brewURL.setAttribute('target', '_blank');
        brewContainer.appendChild(favHeartBtn);
        brew.appendChild(brewContainer);

        
      }
      })
      .catch(error => console.log(error));
    }

//start up function    
startup()

//dayJS function
dayjs().format()

//Event listener for the submit button
locationForm.addEventListener('submit', gatherAPI)