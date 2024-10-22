const apiKey = "0e2439860cb2257ed717522bce421b90";
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const forecast = document.getElementById("forecast");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value;
  if (city) {
    fetchWeather(city);
    fetchForecast(city);
  }
});

function fetchWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      cityName.textContent = data.name;
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      description.textContent = data.weather[0].description;
      sunrise.textContent = `Sunrise: ${formatTime(data.sys.sunrise)}`;
      sunset.textContent = `Sunset: ${formatTime(data.sys.sunset)}`;
    })
    .catch((error) => console.error("Error:", error));
}

function fetchForecast(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      forecast.innerHTML = "";
      for (let i = 0; i < data.list.length; i += 8) {
        const day = data.list[i];
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        const temp = Math.round(day.main.temp);
        const icon = day.weather[0].icon;

        forecast.innerHTML += `
                    <div class="forecast-day">
                        <p>${dayName}</p>
                        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">
                        <p>${temp}°C</p>
                    </div>
                `;
      }
    })
    .catch((error) => console.error("Error:", error));
}

function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
