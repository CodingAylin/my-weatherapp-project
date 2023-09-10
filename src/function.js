function showCurrentTime (showTime) {

let dateTime = document.querySelector("span.day-time");

// let date = showTime.getDate();
let hours = showTime.getHours();
let minutes = showTime.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[showTime.getDay()];

if (minutes < 10) {
  minutes = "0" + minutes;
}

if (hours < 10) {
  hours = "0" + hours;
}

dateTime.innerHTML = `${day} ${hours}:${minutes}`;

}

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

  let showTime = new Date (response.data.time * 1000);
  showCurrentTime(showTime);
  
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


// current weather end

//let celcius = document.querySelector("#celcius");
// let fahrenheit = document.querySelector("#fahrenheit");

// let currentTemp = document.querySelector("#current-temperature");

// function showFahrenheit(event) {
 // event.preventDefault();
  //let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  //currentTemp.innerHTML = Math.round(fahrenheitTemperature);
// }

// function displayCelsiusTemperature(event) {
//  event.preventDefault();
 // currentTemp.innerHTML = Math.round(celsiusTemperature);
// }

// let celsiusTemperature = null;

// fahrenheit.addEventListener("click", showFahrenheit);

//celcius.addEventListener("click", displayCelsiusTemperature);

// unit conversion for current weather end

function formatForecastDay (timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days =
  [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  return days[day];
}

function displayForecast(response) {

  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6){
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${formatForecastDay(forecastDay.time)}</div>
        <img 
        src=${forecastDay.condition.icon_url}
        alt =""
        width=""
        >
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temperature.maximum)}°</span>
          <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temperature.minimum)}°</span>
        </div>
      </div>
  `;
}
});

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;

}

// forecast for next days end

showCurrent();
showDate();