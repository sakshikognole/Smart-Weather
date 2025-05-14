const apiKey = '5a167ea9cb0a438d892154547251205';

document.addEventListener("DOMContentLoaded", () => {

  // Dark mode toggle
  const toggle = document.getElementById('darkModeToggle');
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
});

function getWeather() {
  const city = document.getElementById('cityInput').value;
  if (city) fetchWeather(city);
}

async function fetchWeather(city) {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=4&aqi=no`;
  const res = await fetch(url);
  const data = await res.json();
  displayWeather(data);
}

async function fetchWeatherByCoords(lat, lon) {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=4&aqi=no`;
  const res = await fetch(url);
  const data = await res.json();
  displayWeather(data);
}

function displayWeather(data) {
  const result = document.getElementById('weatherResult');
  if (data.error) {
    result.innerHTML = `<p>${data.error.message}</p>`;
    return;
  }

  const current = data.current;
  const location = data.location;
  const forecastDays = data.forecast.forecastday.slice(1); // skip today

  let html = `
    <h2>${location.name}, ${location.country}</h2>
    <p><strong>Now:</strong> ${current.temp_c}°C, ${current.condition.text}</p>
    <img src="https:${current.condition.icon}" alt="weather icon" />
    <p>Humidity: ${current.humidity}% | Wind: ${current.wind_kph} kph</p>
    <h3>Next 3 Days Forecast:</h3>
    <div class="forecast">
  `;

  forecastDays.forEach(day => {
    html += `
      <div class="forecast-day">
        <p><strong>${day.date}</strong></p>
        <img src="https:${day.day.condition.icon}" alt="icon" />
        <p>${day.day.avgtemp_c}°C</p>
        <p>${day.day.condition.text}</p>
      </div>
    `;
  });

  html += '</div>';
  result.innerHTML = html;
}
