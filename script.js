const apiKey = "1248cd6765f7ac565234fdc71cafe194"; // Ersetzen Sie durch Ihren neuen API-Schlüssel
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const currentWeather = document.getElementById("currentWeather");
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
      currentWeather.textContent = `${
        data.weather[0].description
      } | ${Math.round(data.main.temp)}°C`;
      sunrise.textContent = `sunrise ${formatTime(data.sys.sunrise)}`;
      sunset.textContent = `sunset ${formatTime(data.sys.sunset)}`;
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
          <div class="day">
            <p>${dayName}</p>
            <img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">
            <span>${temp}°</span>
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
