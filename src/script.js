let currentDate = new Date();
let currentHour = currentDate.getHours();
let currentMinutes = currentDate.getMinutes();
let currentDay = currentDate.getDate();
let currentWeekDay = currentDate.getDay();
let currentMonth = currentDate.getMonth() + 1;
let currentYear = currentDate.getFullYear();
let h3 = document.querySelector("h3");
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
if (currentDay < 10) {
  currentDay = `0${currentDay}`;
}
h3.innerHTML = `${currentDay}.0${currentMonth}.${currentYear} ${currentHour}:${currentMinutes}`;
let h2 = document.querySelector("h2");
h2.innerHTML = weekDays[currentWeekDay];

function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-form");
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = cityInput.value;
}
let form = document.querySelector("#submit-button");
form.addEventListener("click", enterCity);

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-form");
  apiValue(cityInput.value);
}
let formNew = document.querySelector("#submit-button");
formNew.addEventListener("click", citySearch);

function temperatureValue(response) {
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  celsiusTemperature = response.data.main.temp;
  let tempInput = document.querySelector("#temp");
  tempInput.innerHTML = temperature;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let icon = document.querySelector("#weather-icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function apiValue(city) {
  let apiKey = "3295420a693443714c3efda131101743";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;
  axios
    .get(`${apiUrl}${city}&appid=${apiKey}&units=metric`)
    .then(temperatureValue);
  axios
    .get(`${apiUrl}${city}&appid=${apiKey}&units=metric`)
    .then(weatherDescription);
}
function weatherDescription(response) {
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  let wind = document.querySelector("#wind");
  let mathWind = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${mathWind} km/h`;
}

document.querySelector("#current-place").addEventListener("click", () => {
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "3295420a693443714c3efda131101743";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      )
      .then(temperatureValue);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
});
function convertFahrenheit(event) {
  event.preventDefault();
  let displayFahrenheit = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(displayFahrenheit);
}
let fahrenheitTemp = document.querySelector("#fahrenheit-degrees");
fahrenheitTemp.addEventListener("click", convertFahrenheit);

function convertCelsius(event) {
  event.preventDefault();
  let displayCelsius = document.querySelector("#temp");
  displayCelsius.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemp = document.querySelector("#celsius-degrees");
celsiusTemp.addEventListener("click", convertCelsius);

let celsiusTemperature = null;
