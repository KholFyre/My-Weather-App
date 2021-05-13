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

//SEARCH ENGINE AND BUTTONS//

function searchTemperature (response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement= document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let location = response.data.name;
  let locationElement= document.querySelector("#city");
  locationElement.innerHTML = `${location}`;
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



//   //
