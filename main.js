const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const apiKEY = "a2219f3e2654edd8e4ba264cb5cf09f5";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKEY}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".fillInput").style.display = "none";

  } else if (city.trim() === "") {
    document.querySelector(".fillInput").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "none";


  } else {
    let data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML =
      Math.round(data.main.temp) + "&deg;C";
    document.querySelector(".humidity").innerHTML =
      data.main.humidity + "&#x25;";
    document.querySelector(".wind").innerHTML =
      Math.round(data.wind.speed) + "km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    document.querySelector(".fillInput").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
