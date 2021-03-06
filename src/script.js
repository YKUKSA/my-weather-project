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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="col-2">
    <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
        <div class="forecast-emoji"><img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" width="42"/></div>
        <div class="forecast-temperature-max">${Math.round(
          forecastDay.temp.max
        )}°<span class="forecast-temperature-min"> ${Math.round(
          forecastDay.temp.min
        )}°</span></div>
    </div> `;
    }
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
  let apiKey = "c3a56d4fcded4e52316bb9963de765f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  showForecastTemp(response.data.coord);
}

function apiValue(city) {
  let apiKey = "c3a56d4fcded4e52316bb9963de765f8";
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
