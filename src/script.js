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

//Format Icons//
function getIcon(icon){
  let iconElement = "";
  if(icon === "angry_clouds") {
    iconElement = "images/angry_clouds.png";
  } else if (icon === "cloudy") {
    iconElement = "images/cloudy.png";
  } else if (icon ==="day_clear") {
    iconElement = "images/day_clear.png";
  } else if (icon === "day_partial_cloudy") {
    iconElement = "images/day_partial_cloudy.png"; 
  } else if (icon === "day_rain_thunder") {
    iconElement = "images/day_rain_thunder.png"; 
  } else if (icon === "day_rain") {
    iconElement = "images/day_rain.png"; 
  } else if (icon === "day_sleet") {
    iconElement = "images/day_sleet.png"; 
  } else if (icon === "day_snow_thunder") {
    iconElement = "images/day_snow_thunder.png"; 
  } else if (icon === "day_snow") {
    iconElement = "images/day_snow.png"; 
  } else if (icon === "fog") {
    iconElement = "images/fog.png"; 
  } else if (icon === "mist") {
    iconElement = "images/mist.png"; 
  } else if (icon === "night_full_moon_clear") {
    iconElement = "images/night_full_moon_clear.png"; 
  } else if (icon === "night_full_moon_partial_cloud") {
    iconElement = "images/night_full_moon_partial_cloud.png"; 
  } else if (icon === "night_full_moon_rain_thunder") {
    iconElement = "images/night_full_moon_rain_thunder.png"; 
  } else if (icon === " night_full_moon_rain") {
    iconElement = "images/night_full_moon_rain.png"; 
  } else if (icon === "night_full_moon_sleet") {
    iconElement = "images/night_full_moon_sleet.png"; 
  } else if (icon === "night_full_moon_snow_thunder") {
    iconElement = "images/night_full_moon_snow_thunder.png"; 
  } else if (icon === "night_full_moon_snow") {
    iconElement = "images/night_full_moon_snow.png"; 
  } else if (icon === "night_half_moon_clear") {
    iconElement = "images/night_half_moon_clear.png"; 
  } else if (icon === "night_half_moon_partial_cloud") {
    iconElement = "images/night_half_moon_partial_cloud.png"; 
  } else if (icon === "night_half_moon_rain_thunder") {
    iconElement = "images/night_half_moon_rain_thunder.png"; 
  } else if (icon === "night_half_moon_rain") {
    iconElement = "images/night_half_moon_rain.png"; 
  } else if (icon === "night_half_moon_sleet") {
    iconElement = "images/night_half_moon_sleet.png"; 
  } else if (icon === "night_half_moon_snow_thunder") {
    iconElement = "images/night_half_moon_snow_thunder.png"; 
  } else if (icon === "night_half_moon_snow") {
    iconElement = "images/night_half_moon_snow.png"; 
  } else if (icon === "overcast") {
    iconElement = "images/overcast.png"; 
  } else if (icon === "rain_thunder") {
    iconElement = "images/rain_thunder.png"; 
  } else if (icon === "rain") {
    iconElement = "images/rain.png"; 
  } else if (icon === "sleet") {
    iconElement = "images/sleet.png"; 
  } else if (icon === "snow_thunder") {
    iconElement = "images/snow_thunder.png"; 
  } else if (icon === "snow") {
    iconElement = "images/snow.png"; 
  } else if (icon === "thunder") {
    iconElement = "images/thunder.png"; 
  } else if (icon === "tornado") {
    iconElement = "images/tornado.png"; 
  } else if (icon === "wind") {
    iconElement = "images/wind.png"; 
  }

return iconElement;   
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
}

function searchLocation(event){
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiKey = "5834061fecd9e62b1d62955b902b96f1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(searchTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchLocation);

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", searchLocation);

formatDateAndTime(currentDateAndTime);




//let cityInput = document.querySelector("#city-input");
//let apiKey = "5834061fecd9e62b1d62955b902b96f1";
//let apiUrlFuture = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&appid=${apiKey}`



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

let geolocationBtn = document.querySelector("#geolocation-button");
geolocationBtn.addEventListener("click", navigator.geolocation.getCurrentPosition (handlePosition));




//convert between F and C//

function convertToFahrenheit (event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature"); 
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature - 32) * 5 / 9);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);   

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);




  // Current weather icon, description and current temperature (including maximum and minimum temperatures)
