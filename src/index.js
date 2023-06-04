//-----------------get city description---------//
function weatherDescription(response) {
  let cityValue = document.querySelector("#cityName");
  cityValue.innerHTML = response.data.name;

  celtemp = response.data.main.temp;
  let temperature = document.querySelector("#cityLink");
  let tempValue = Math.round(celtemp);
  temperature.innerHTML = ` ${tempValue}°`;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  let humidValue = response.data.main.humidity;
  humidity.innerHTML = ` ${humidValue} %`;

  let wind = document.querySelector("#Wind");
  let windValue = Math.round(response.data.wind.speed);
  wind.innerHTML = ` ${windValue} km/h`;

  let weekdate = document.querySelector("#week");
  weekdate.innerHTML = formatDate();

  let iconElement = document.querySelector("#icon");
  let iconValue = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  iconElement.setAttribute("src", iconValue);
}

//------------get date & Time----------------//
function formatDate(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date();
  let currentDay = days[date.getDay()];
  return `${currentDay} ${formatHours(timestamp)}`;
}
function formatHours(timestamp) {
  let date = new Date();
  let currentHoure = date.getHours();
  if (currentHoure < 10) {
    currentHoure = `0${currentHoure}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let todaysDate = ` ${currentHoure}:${currentMinutes}`;
  return todaysDate;
}

//-------------------convert temp to F and C--------------//
function celsious(event) {
  event.preventDefault();
  let tempCel = document.querySelector("#cityLink");
  tempCel.innerHTML = ` °${Math.round(celtemp)}`;
}

function Fahrenheit(event) {
  event.preventDefault();
  let tempFar = document.querySelector("#cityLink");
  let farElement = (celtemp * 9) / 5 + 32;
  tempFar.innerHTML = ` °${Math.round(farElement)}`;
}
let celtemp = null;
let fahr = document.querySelector("#Fahrenheit");
fahr.addEventListener("click", Fahrenheit);

let cels = document.querySelector("#celsious");
cels.addEventListener("click", celsious);

//----------------------City weather and description---------------//
//get weather description for
function locPosition(response) {
  let city = document.querySelector("#search-city").value;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(weatherDescription);

  //get coordinates for current location
  let lat = response.data.coords.latitude;
  let long = response.data.coords.longitude;
  let apiK = "96ad27349a64ea1dcdfbe6f4d458c085";
  let apiU = `https://api.shecodes.io/weather/v1/forecast?lon=${long}&lat=${lat}&appid=${apiK}&units=metric`;
  axios.get(`${apiU}&appid=${apiK}`).then(currentDescription);
}

//get searchbox value from user
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  locPosition(city);
}
//call the searchcity func when submiting the search //
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

//------------------current location button display----------------//
function currentDescription(response) {
  let weekdate = document.querySelector("#week");
  weekdate.innerHTML = formatDate();
  let cityLoc = document.querySelector("#cityName");
  cityLoc.innerHTML = response.data.name;
  let tempLoc = document.querySelector("#cityLink");
  let tempNum = Math.round(response.data.main.temp);
  tempLoc.innerHTML = tempNum;
  let desLoc = document.querySelector("#description");
  desLoc.innerHTML = response.data.weather[0].description;
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locPosition);
}

let currentButton = document.querySelector("#currentLoc");
currentButton.addEventListener("click", currentLocation);

//----------------5days forast button----------//
function dispalyForecast(response) {
  let forecastElement = document.querySelector("#forcast-weather");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML =
      forecastElement.innerHTML +
      `
    <div class="col-3">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"/>
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong> |
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}
function search(city) {
  let apiKey = "41f2d006b8af42b250317a5fbdd3fe72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherDescription);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-city");
  search(cityInputElement.value);
}

let forcastButton = document.querySelector("#forcast-button");
forcastButton.addEventListener("click", handleSubmit);
