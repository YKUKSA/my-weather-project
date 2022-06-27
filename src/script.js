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

function dispayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class="row">`;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="col-2">
    <div class="forecast-day">${day}</div>
        <div class="forecast-date">16.05.22</div>
        <div class="forecast-emoji">⛅</div>
        <div class="forecast-temperature-max">10°<span class="forecast-temperature-min"> 8°</span></div>
    </div> `;
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

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

function showForecastTemp(coordinates) {
  let apiKey = "3295420a693443714c3efda131101743";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
}

function temperatureValue(response) {
  let city = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  let tempInput = document.querySelector("#temp");
  let description = document.querySelector("#description");
  let icon = document.querySelector("#weather-icon");
  city.innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  tempInput.innerHTML = temperature;
  description.innerHTML = response.data.weather[0].description;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  dispayForecast();
  showForecastTemp(response.data.coord);
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

function parisSearch(event) {
  event.preventDefault();
  apiValue("Paris");
}
let paris = document.querySelector("#city-paris");
paris.addEventListener("click", parisSearch);

function londonSearch(event) {
  event.preventDefault();
  apiValue("London");
}
let london = document.querySelector("#city-london");
london.addEventListener("click", londonSearch);

function berlinSearch(event) {
  event.preventDefault();
  apiValue("Berlin");
}
let berlin = document.querySelector("#city-berlin");
berlin.addEventListener("click", berlinSearch);

function torontoSearch(event) {
  event.preventDefault();
  apiValue("Toronto");
}
let toronto = document.querySelector("#city-toronto");
toronto.addEventListener("click", torontoSearch);

function kyivSearch(event) {
  event.preventDefault();
  apiValue("Kyiv");
}
let kyiv = document.querySelector("#city-kyiv");
kyiv.addEventListener("click", kyivSearch);

apiValue("Kyiv");
