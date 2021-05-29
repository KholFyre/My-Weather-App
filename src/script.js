//Format Date and Time
function formatDateAndTime() {
  let now = new Date();
  let date = now.getDate();
  let year = now.getFullYear();

  let monthsIndex = now.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[monthsIndex];

  let dayIndex = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  let hours= now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes< 10) {
    minutes = `0${minutes}`;
  }

  let current = `${day}, ${month} ${date}, ${year} ${hours}:${minutes} `;

  let dateTime = document.querySelector("#currentDateAndTime");
  dateTime.innerHTML = current;

}

function formatDay(timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

return days[day];
}


//SEARCH ENGINE AND BUTTONS//

function searchTemperature (response) {

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement= document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${temperature}`;

  let location = response.data.name;
  let locationElement= document.querySelector("#city");
  locationElement.innerHTML = `${location}`;

  let descriptionElement = document.querySelector("#weatherDescription");
  descriptionElement.innerHTML = response.data.weather[0].description;
  
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  
  let windSpeedElement = document.querySelector("#windSpeed");
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);



  let currentWeatherIconElement=document.querySelector("#currentWeatherIcon");
  currentWeatherIconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);

}

function getForecast (coordinates){

let apiKey = "5834061fecd9e62b1d62955b902b96f1";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayDailyForecast);
}


function search(city){
let apiKey = "5834061fecd9e62b1d62955b902b96f1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(searchTemperature);
}

function searchLocation(event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("New York");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchLocation);

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", searchLocation);

formatDateAndTime(currentDateAndTime);



//CURRENT GEOLOCATION //
function showCurrentTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement= document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${temperature}`;

  let location = response.data.name;
  let locationElement= document.querySelector("#city");
  locationElement.innerHTML = `${location}`;
}

function handlePosition(position){
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5834061fecd9e62b1d62955b902b96f1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showCurrentTemperature);
}




//Display 5 Day Outlook
  function displayDailyForecast(response){
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = "";

    forecast.forEach(function(forecastDay, index){
      if (index < 6){
      
      forecastHTML = forecastHTML + `
        <div class="row align-items-start">
          <div class="col-5" id="day-of-week">${formatDay(forecastDay.dt)}</div>
          <div class="col-4 daily-weather-icon" id="daily-weather-icon">
            <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="30" height="30" />
          </div>
          <div class="col-1" id="daily-high">${Math.round(forecastDay.temp.max)}°</div>
          <div class="col-1" id="daily-low">${Math.round(forecastDay.temp.min)}°</div>
        </div>
        `;
      }
    });

        forecastElement.innerHTML = forecastHTML;
  }

