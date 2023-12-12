document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '0b6b234f9817c079c45e7ba85a2b4a0f';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/';
    const searchForm = document.getElementById('search-form');
    const cityInput = document.getElementById('city');
    const currentWeather = document.getElementById('current-weather');
    const forecast = document.getElementById('forecast');
    const historyList = document.getElementById('history-list');

    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const city = cityInput.value.trim();
        getWeatherData(city);
    });

    function getWeatherData(city) {
        fetch(`${apiUrl}weather?q=${city}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                displayCurrentWeather(data);
                saveToHistory(city);
                return fetch(`${apiUrl}forecast?q=${city}&appid=${apiKey}`);
            })
            .then(response => response.json())
            .then(data => {
                displayForecast(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function displayCurrentWeather(data) {
        currentWeather.innerHTML = `
            <h2>${data.name} (${new Date().toLocaleDateString()})</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    }

    function displayForecast(data) {
        forecast.innerHTML = '<h2>5-Day Forecast</h2>';
        for (let i = 0; i < data.list.length; i += 8) {
            const forecastItem = data.list[i];
            const date = new Date(forecastItem.dt * 1000);
            forecast.innerHTML += `
                <div class="forecast-item">
                    <p>Date: ${date.toLocaleDateString()}</p>
                    <p>Temperature: ${forecastItem.main.temp}°C</p>
                    <p>Humidity: ${forecastItem.main.humidity}%</p>
                    <p>Wind Speed: ${forecastItem.wind.speed} m/s</p>
                </div>
            `;
        }
    }

    function saveToHistory(city) {
        const historyItem = document.createElement('li');
        historyItem.textContent = city;
        historyItem.addEventListener('click', function () {
            getWeatherData(city);
        });

        historyList.appendChild(historyItem);
    }
});
