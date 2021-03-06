function formatDate(timestamp){
let date = new Date(timestamp);
let hours = date.getHours();
let minutes = date.getMinutes();
if (minutes < 10) {
minutes = `0${minutes}`
};
if (hours < 10) {
hours = `0${hours}`
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
return `${day}, ${hours}:${minutes}`

}



function formatHours(timestamp){
 let date = new Date(timestamp);
let hours = date.getHours();
let minutes = date.getMinutes();
if (minutes < 10) {
minutes = `0${minutes}`
};
if (hours < 10) {
hours = `0${hours}`
}

 return `${hours}:${minutes}`;
}

function displayTemperature(response){
    celsiusTemperature = response.data.main.temp
let cityElement = document.querySelector("#city");
cityElement.innerHTML = response.data.name;
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(celsiusTemperature);
let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML = response.data.weather[0].description;
let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
let windElement = document.querySelector("#wind");
windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
let dateElement = document.querySelector("#time");
dateElement.innerHTML = formatDate(response.data.dt * 1000);
let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description)


}

function displayForecast(response){
let forecast =null
    let forecastElement=document.querySelector("#forecast");
    forecastElement.innerHTML = null;
   
   for (let index = 0; index < 6; index ++){
     forecast = response.data.list[index];
forecastElement.innerHTML += 
    `<div class="col-2">
    <h3>
    ${formatHours(forecast.dt * 1000)}
    </h3>
    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" />
    <div class="weather-forecast-temperature">
      <strong>${Math.round(forecast.main.temp_max)}° | </strong>${Math.round(forecast.main.temp_min)}°
    </div>
  </div>`;

   }
      
}

function search(city){
let apiKey = "4c3c671c267c67d5291f03e40c1f4165";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);

}

function handleSubmit(event){
event.preventDefault();
let cityInputElement = document.querySelector("#city-input");
search(cityInputElement.value)
}

function displayFahrenheit(event){
event.preventDefault();
let fahrenheitTemperature = (celsiusTemperature * 9/5) + 32;
fahrenheitLink.classList.add("active");
celsiusLink.classList.remove("active");
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(fahrenheitTemperature)
}

function displayCelsius(event){
event.preventDefault();
fahrenheitLink.classList.remove("active");
celsiusLink.classList.add("active");
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(celsiusTemperature)
}

let celsiusTemperature = null

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);