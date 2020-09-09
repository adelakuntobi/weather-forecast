// Get location
var x = document.getElementById("demo"),
  input = document.getElementById('inputTag')
container = document.getElementById("current")
otherdays = document.getElementById("otherdays")

var today = new Date();

var weekday = new Array();
weekday[0]=weekday[7]=weekday[14]=weekday[21]=weekday[28] = "Sunday";
weekday[1]=weekday[8]=weekday[15]=weekday[22]=weekday[29] = "Monday";
weekday[2]=weekday[9]=weekday[16]=weekday[23]=weekday[30] = "Tuesday";
weekday[3]=weekday[10]=weekday[17]=weekday[24]=weekday[31] = "Wednesday";
weekday[4]=weekday[11]=weekday[18]=weekday[25]= "Thursday";
weekday[5]=weekday[12]=weekday[19]=weekday[26]= "Friday";
weekday[6]=weekday[13]=weekday[20]=weekday[27]= "Saturday";
// weekday[7]=weekday[8]=weekday[15]=weekday[21]=weekday[28] = "Sunday";
// weekday[0=7=14=21=28] = "Monday";
// weekday[1,8,15,22,29] = "Monday";
// weekday[2,9,16,23,30] = "Tuesday";
// weekday[3,10,17,24,31] = "Wednesday";
// weekday[4,11,18,25] = "Thursday";
// weekday[5,12,19,26] = "Friday";
// weekday[6,13,20,27] = "Saturday";

var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

const nth = function (dd) {
  if (dd > 3 && dd < 21) return dd + 'th';
  switch (dd % 10) {
    case 1: return dd + "st";
    case 2: return dd + "nd";
    case 3: return dd + "rd";
    default: return dd + "th";
  }
}

var ddName = weekday[today.getDay()];
var ordDay = today.getDay()
var dd = nth(today.getDate())
var mm = month[today.getMonth()];
var yyyy = today.getFullYear();

today = ddName + ', ' + dd + ' ' + mm;
// Array for days of the week


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
  
}

function showPosition(position) {
  // x.innerHTML = "Latitude: " + position.coords.latitude +
  //   "<br>Longitude: " + position.coords.longitude;
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  console.log(weekday[21])
  setTimeout(() => {
    document.getElementById("loader").style.display = "none"
  }, 7500);
  
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude={part}&appid=69af108fec23899a47ce594059cf3b50`)
  .then(res => res.json())
  .then(data => {
    // temp = data.current.temp -273.15
    console.log(data)
    display = `
    <div class="first-details">
        <h2>${data.timezone}</h2>
        <h4 class="margin">${today}</h4>
        <p class="description">${data.current.weather[0].description}</p>
        <div style="display: flex; align-items: center;" >
          <img class="today-img" src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" />
          <h1>${data.current.temp}<sup>o</sup>C</h1>
        </div>
      </div>
      <div class="details">
        <p>Feels Like <b>${data.current.feels_like}<sup>o</sup>C</b></p>
        <p>Wind Speed: <b>${data.current.wind_speed}mps</b></p>
        <p>Humidity: <b>${data.current.humidity}%</b></p>
        <p>Pressure: <b>${data.current.pressure}mb</b></p>
      </div>
      `
      container.innerHTML = display

      data.daily.shift();
      data.daily.forEach((day,index) => {
        // console.log(day.shift())
        otherdetails = `
        <div class="details">
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" />
        <h3>${weekday[(index + ordDay + 1)]}</h3>
        <p>${day.temp.max}<sup>o</sup>C</p>
        <p class="description">${day.weather[0].description}</p>
      </div>
        `
        otherdays.innerHTML += otherdetails
      });
    })
    .catch(err => {
      console.log(err)
    })
}


if("serviceWorker" in navigator){
  navigator.serviceWorker.register('/serviceworker.js')
  .then((reg) => console.log('Service dey registered',reg))
  .catch((err) => console.log('E no dey work oga',err))
}