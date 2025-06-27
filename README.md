# 🌤️ Weather Dashboard 

*A responsive weather application built with HTML, CSS, and JavaScript*

![Weather App Screenshot](./screenshot.png)

## ✨ Features

- **Real-time weather data** for any city worldwide
- **Geolocation support** for automatic local weather detection
- **Responsive design** that works on mobile and desktop
- **Detailed metrics**: Temperature, humidity, wind speed, pressure
- **Error handling** for invalid cities or API failures

## 🛠️ Technical Implementation

### API Integration
- Integrated **API-Ninjas Weather API** via RapidAPI
- Implemented proper authentication with `x-rapidapi-key` headers
- Optimized API calls with error handling and fallbacks

### Core Functionality
- Dynamic UI updates without page refresh
- Converted weather units (m/s → km/h)
- Smart city name formatting (e.g., "kolkata" → "Kolkata,IN")

### Technologies
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **APIs**: 
  - API-Ninjas Weather API
  - BigDataCloud (reverse geocoding)
- **Tools**: Git, VS Code, Chrome DevTools

## 🚀 Installation

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
open index.html
