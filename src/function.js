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
  let currentTemp = document.querySelector("#current-temperature");
  city.innerHTML = response.data.name;
  currentTemp.innerHTML = Math.round(response.data.main.temp);
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

// let celcius = document.querySelector("#celcius");
// let fahrenheit = document.querySelector("#fahrenheit");

// let currentTemp = document.querySelector("#current-temperature");

// function showCelcius(event) {
//  event.preventDefault();
//  currentTemp.innerHTML = 19;
// }

// celcius.addEventListener("click", showCelcius);

// function showFahrenheit (event) {
//  event.preventDefault();
//  currentTemp.innerHTML = 66;
// }

// fahrenheit.addEventListener("click", showFahrenheit);

// celcius/fahrenheit end
