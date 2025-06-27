const API_KEY = 'cffaaa1baamsh033bb4b0bb48f42p1a7363jsn410b8010f85c';
const API_HOST = 'weather-by-api-ninjas.p.rapidapi.com';
const API_URL = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=';

// DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const loadingContainer = document.getElementById('loading');
const errorDisplay = document.getElementById('error-display');
const weatherDisplay = document.getElementById('weather-display');

// Weather display elements
const cityName = document.getElementById('city-name');
const currentTemp = document.getElementById('current-temp');
const weatherDesc = document.getElementById('weather-desc');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const pressure = document.getElementById('pressure');

// Supported cities with their proper API formats
const supportedCities = {
    'kolkata': 'Kolkata',
    'delhi': 'Delhi',
    'london': 'London',
    'hyderabad': 'Hyderabad',
    'bangalore': 'Bangalore'
};

// Event listeners
searchBtn.addEventListener('click', fetchWeather);
locationBtn.addEventListener('click', getLocationWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchWeather();
});

function fetchWeather() {
    let city = cityInput.value.trim().toLowerCase();
    
    // Convert common names to supported formats
    if (supportedCities[city]) {
        city = supportedCities[city];
        cityInput.value = city;
    }
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    showLoading();
    hideError();
    hideWeather();

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function() {
        if (this.readyState === this.DONE) {
            hideLoading();
            
            if (this.status === 200) {
                try {
                    const data = JSON.parse(this.responseText);
                    displayWeather(data, city);
                } catch (error) {
                    showError('Failed to parse weather data');
                    console.error('Parse error:', error);
                }
            } else {
                showError(`City "${city}" not found. Try another name.`);
                console.error('API error:', this.status, this.responseText);
            }
        }
    });

    xhr.open('GET', API_URL + encodeURIComponent(city));
    xhr.setRequestHeader('x-rapidapi-key', API_KEY);
    xhr.setRequestHeader('x-rapidapi-host', API_HOST);
    xhr.send();
}

function getLocationWeather() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }

    showLoading();
    hideError();
    hideWeather();

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
                .then(response => response.json())
                .then(locationData => {
                    const city = locationData.city || locationData.locality;
                    cityInput.value = city;
                    fetchWeather();
                })
                .catch(error => {
                    showError('Could not determine your location');
                    hideLoading();
                });
        },
        (error) => {
            showError('Location access denied. Please enter a city manually.');
            hideLoading();
        }
    );
}

function displayWeather(data, city) {
    cityName.textContent = city;
    currentTemp.textContent = `${data.temp}°C`;
    
    // Generate description based on available data
    const condition = getWeatherCondition(data.cloud_pct);
    weatherDesc.textContent = condition.description;
    
    feelsLike.textContent = `${data.feels_like}°C`;
    humidity.textContent = `${data.humidity}%`;
    windSpeed.textContent = `${(data.wind_speed * 3.6).toFixed(1)} km/h`; // Convert m/s to km/h
    pressure.textContent = `${data.pressure_mb} hPa`;

    weatherDisplay.style.display = 'block';
}

function getWeatherCondition(cloudPct) {
    if (cloudPct < 20) return { description: "Clear sky" };
    if (cloudPct < 50) return { description: "Partly cloudy" };
    if (cloudPct < 80) return { description: "Cloudy" };
    return { description: "Overcast" };
}

function showLoading() {
    loadingContainer.style.display = 'block';
}

function hideLoading() {
    loadingContainer.style.display = 'none';
}

function showError(message) {
    errorDisplay.textContent = message;
    errorDisplay.style.display = 'block';
}

function hideError() {
    errorDisplay.style.display = 'none';
}

function hideWeather() {
    weatherDisplay.style.display = 'none';
}

// Initialize with default city
cityInput.value = 'Delhi';
fetchWeather();