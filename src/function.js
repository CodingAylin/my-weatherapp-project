let now = new Date();

let dateTime = document.querySelector("span.day-time");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

if (minutes < 10) {
  minutes = "0" + minutes;
}

dateTime.innerHTML = `${day}, ${hours}:${minutes}`;

// current location date ending

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let apiKey = "22fba54b54f68f4903et511c0f6b4dof";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let cityForm = document.querySelector("#search-city-form");
cityForm.addEventListener("submit", search);

// change city ending

function getDailyForecast (coordinates) {
  let apiKey = "22fba54b54f68f4903et511c0f6b4dof";
  let apiUrl= `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// forecast for next days ending

function showWeather(response) {
  let city = document.querySelector("#cityName");
  let descriptionElement = document.querySelector("#description");
  let currentTemp = document.querySelector("#current-temperature");
  let currentHumidity = document.querySelector("#humidity-element");
  let currentWindSpeed = document.querySelector("#wind-element");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;
  city.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  currentHumidity.innerHTML = Math.round(response.data.temperature.humidity);
  currentWindSpeed.innerHTML = Math.round(response.data.wind.speed);
  iconElement.src = response.data.condition.icon_url;
  currentTemp.innerHTML = Math.round(celsiusTemperature);
  
  getDailyForecast(response.data.coordinates);
}

function retrievePosition(coordinates) {
  let apiKey = "22fba54b54f68f4903et511c0f6b4dof";
  let lat = coordinates.coords.latitude;
  let lon = coordinates.coords.longitude;
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

function showCurrent() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector("#current-weather-button");
currentButton.addEventListener("click", showCurrent);

showCurrent();

// current weather end

let celcius = document.querySelector("#celcius");
let fahrenheit = document.querySelector("#fahrenheit");

let currentTemp = document.querySelector("#current-temperature");

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  currentTemp.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

fahrenheit.addEventListener("click", showFahrenheit);

celcius.addEventListener("click", displayCelsiusTemperature);

// unit conversion end

function displayForecast(response) {

  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <i class="fa-solid fa-sun"></i> 
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
console.log(response.data);
}
