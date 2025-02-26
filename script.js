document.getElementById('searchBtn').addEventListener('click', fetchWeather);
document.getElementById('cityInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});

function fetchWeather() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const apiKey = '3ec8faaea289e8806e410505ae78f3d8';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const weatherInfo = document.getElementById('weatherInfo');
    const loading = document.getElementById('loading');
    
    weatherInfo.classList.remove('show');
    weatherInfo.style.display = 'none';
    loading.style.display = 'block';
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                weatherInfo.innerHTML = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Condition: ${data.weather[0].description}</p>
                `;
                weatherInfo.classList.add('show');
                weatherInfo.style.display = 'block';
            } else {
                weatherInfo.innerHTML = `<p>City not found!</p>`;
                weatherInfo.classList.add('show');
                weatherInfo.style.display = 'block';
            }
        })
        .catch(() => {
            weatherInfo.innerHTML = `<p>Failed to fetch data. Check your connection.</p>`;
            weatherInfo.classList.add('show');
            weatherInfo.style.display = 'block';
        })
        .finally(() => {
            loading.style.display = 'none';
        });
}
