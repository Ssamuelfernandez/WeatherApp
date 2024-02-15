import axios from 'axios';
const apiKey = '01408b16000e17a8e9420187ac1c7e5c';

// Función para obtener las coordenadas
const getCoordinates = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                resolve({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            }, function (error) {
                reject("Error: " + error.message);
            }, {
                enableHighAccuracy: true
            });
        } else {
            reject("Geolocalización no es soportada por este navegador.");
        }
    });
};

// Función para obtener el clima actual por nombre de ciudad
const getCurrentWeatherByCity = async (city) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric `;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('ERROR:' + error);
    }
};

// Función para obtener el clima actual por coordenadas
const getCurrentWeatherByCoordinates = async (lat, lon) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric `;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('ERROR:' + error);
    }
};

// Función para obtener el pronóstico por horas por nombre de ciudad
const getHourlyForecastByCity = async (city) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric `;
        const response = await axios.get(url);
        return response.data.list;
    } catch (error) {
        console.error('ERROR:' + error);
    }
};

// Función para obtener el pronóstico por horas por coordenadas
const getHourlyForecastByCoordinates = async (lat, lon) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric `;
        const response = await axios.get(url);
        return response.data.list;
    } catch (error) {
        console.error('ERROR:' + error);
    }
};


export { getCoordinates, getCurrentWeatherByCity, getCurrentWeatherByCoordinates, getHourlyForecastByCity, getHourlyForecastByCoordinates };