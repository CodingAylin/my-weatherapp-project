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

// date ending

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let cityForm = document.querySelector("#search-city-form");
cityForm.addEventListener("submit", search);

// change city ending

function showWeather(response) {
  let city = document.querySelector("#cityName");
  let descriptionElement = document.querySelector("#description");
  let currentTemp = document.querySelector("#current-temperature");
  let currentHumidity = document.querySelector("#humidity-element");
  let currentWindSpeed = document.querySelector("#wind-element");
  let iconElement = document.querySelector("#icon");

  displayForecast();

  celsiusTemperature = response.data.main.temp;
  city.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = Math.round(response.data.main.humidity);
  currentWindSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  currentTemp.innerHTML = Math.round(celsiusTemperature);
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = `
        <div class="row">
          <div class="col-2">            
            <span class="weather-forecast-day">Mon</span> 
            <br />
            <i class="fa-solid fa-sun"></i> 
            <br />
            <span class="weather-forecast-temperature-max">26° | </span>
            <span class="weather-forecast-temperature-min">15°</span>
          </div>
        </div>
        `;
}
