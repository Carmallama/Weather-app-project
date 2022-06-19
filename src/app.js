//change date and time

let now = new Date();
let currentDate = document.querySelector("#currentDate");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
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
  "December",
];
let month = months[now.getMonth()];
currentDate.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}
//display forecast

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img src="https://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" 
      alt="" 
      width="60"
      />
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-min">${Math.round(
            forecastDay.temp.min
          )}°</span> |
          <span class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temp.max
          )}°</span>
        </div>
    </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//show temperature

function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = "b6c769756646411c438f6a04abe73a94";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#currentTemperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#currentWeatherDescription");
  let feelsLikeElement = document.querySelector("#feelsLikeTemp");
  let humidityElement = document.querySelector("#humidityValue");
  let windElement = document.querySelector("#windSpeedValue");
  let maximumElement = document.querySelector("#maximum");
  let minimumElement = document.querySelector("#minimum");
  let iconElement = document.querySelector("#icon");
  //change weather icon
  temperatureElement.innerHTML = `${temperature}`;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  maximumElement.innerHTML = Math.round(response.data.main.temp_max);
  minimumElement.innerHTML = Math.round(response.data.main.temp_min);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "b6c769756646411c438f6a04abe73a94";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

//change city from search
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityInput");
  console.log(cityInputElement.value);
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Reading");
//get current position
function searchLocation(position) {
  let apiKey = "b6c769756646411c438f6a04abe73a94";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let showCurrentLocation = document.querySelector("#currentLocationButton");
showCurrentLocation.addEventListener("click", getCurrentLocation);
//change units of temperature
