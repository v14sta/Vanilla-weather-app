//-----------------get city description---------//
function weatherDescription(response) {
  let cityValue = document.querySelector("#cityName");
  cityValue.innerHTML = response.data.name;

  celtemp = response.data.main.temp;
  let temperature = document.querySelector("#cityLink");
  let tempValue = Math.round(response.data.main.temp);
  temperature.innerHTML = ` ${tempValue}°`;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  let humidValue = response.data.main.humidity;
  humidity.innerHTML = ` ${humidValue} %`;

  let wind = document.querySelector("#Wind");
  let windValue = Math.round(response.data.wind.speed);
  wind.innerHTML = ` ${windValue} km/h`;

  let iconElement = document.querySelector("#icon");
  let iconValue = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  iconElement.setAttribute("src", iconValue);
}
//-------------------search city value----------------//
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  let apiKey = "6f578b96aa9505bcce148ac22cb85794";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(weatherDescription);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

//------------get date & Time----------------//
function formatDate(dates) {
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
  let currentHoure = date.getHours();
  if (currentHoure < 10) {
    currentHoure = `0${currentHoure}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let todaysDate = ` ${currentDay} ${currentHoure}:${currentMinutes}`;
  return todaysDate;
}
let weekdate = document.querySelector("#week");
weekdate.innerHTML = formatDate();

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
