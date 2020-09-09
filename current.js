var container = document.getElementById("current")

function getData() {
  console.log(input.value);
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=69af108fec23899a47ce594059cf3b50`)
  .then(res => res.json())
  .then(data => {
    // temp = data.current.temp -273.15
    console.log(data)
    setTimeout(() => {
      document.getElementById("loader").style.display = "none"
    }, 1500);
    
    display = `
    <div class="first-details">
        <h2>${data.name}</h2>
        <h4 class="margin">${today}</h4>
        <p class="description">${data.weather.description}</p>
        <div style="display: flex; align-items: center;" >
          <img class="today-img" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
          <h1>${data.main.temp}<sup>o</sup>C</h1>
        </div>
      </div>
      <div class="details">
        <p>Feels Like <b>${data.main.feels_like}<sup>o</sup>C</b></p>
        <p>Wind Speed: <b>${data.wind.speed}mps</b></p>
        <p>Humidity: <b>${data.main.humidity}%</b></p>
        <p>Pressure: <b>${data.main.pressure}mb</b></p>
      </div>
      `
      container.innerHTML = display

  })
  .catch (err => {
    console.log(err)
  })
}
