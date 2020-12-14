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




function displayTemperature(response){
let cityElement = document.querySelector("#city");
cityElement.innerHTML = response.data.name;
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(response.data.main.temp)
let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML = response.data.weather[0].description;
let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
let windElement = document.querySelector("#wind");
windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
let dateElement = document.querySelector("#time");
dateElement.innerHTML = formatDate(response.data.dt * 1000);
}


let apiKey = "4c3c671c267c67d5291f03e40c1f4165";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);