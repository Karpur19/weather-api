const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());

// Your OpenWeatherMap API Key
const WEATHER_API_KEY = 'c49499c7b583aa0bae53f99f5a48558c';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Weather API! Use /weather?city=YourCity to get weather information.');
});


// API Endpoint to get weather information
app.get('/weather', async (req, res) => {
    const city = req.query.city; // City name from query parameter
    if (!city) {
        return res.status(400).json({ error: 'Please provide a city name' });
    }

    try {
        // Fetch weather data from OpenWeatherMap
        const response = await axios.get(WEATHER_API_URL, {
            params: {
                q: city,
                appid: WEATHER_API_KEY,
                units: 'metric' // For temperature in Celsius
            }
        });

        const weatherData = response.data;

        // Return simplified weather data
        res.json({
            city: weatherData.name,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            humidity: weatherData.main.humidity,
            wind_speed: weatherData.wind.speed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not fetch weather data' });
    }
});

// Start the server
// Start the server
const PORT = process.env.PORT || 3000; // Render will use process.env.PORT, fallback to 3000 if not available

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

