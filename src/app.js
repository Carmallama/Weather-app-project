//change date and time
let now = new Date();
let currentDate = document.querySelector("#currentDate");
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

//show temperature

function displayTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#currentTemperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#currentWeatherDescription");
  temperatureElement.innerHTML = `${temperature}`;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
}

let apiKey = "b6c769756646411c438f6a04abe73a94";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=reading&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

//change city from search

//get current position

//change units of temperature

//update weather overview data

//change weather icon
