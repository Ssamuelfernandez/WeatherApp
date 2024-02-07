<template>
    <div class="main-container" :class="state.theme">

        <MenuContainer @theme-changed="updateTheme" />

        <div class="info-container">
            <div class="info-subcoontainer">
                <h1>{{ state.cityName }}</h1>
                <!-- Boton icono de una chincheta -->
                <div class="date">
                    <h3>{{ state.day }} {{ state.numDay }} </h3>
                    <h3>{{ state.time }}</h3>
                </div>

                <div>
                    <img :src="state.iconData" alt="Weather icon">
                </div>
                <h3>{{ state.weType }}</h3>
                <h1>{{ state.tem }} °C</h1>

                <div class="more-info-container">

                    <div class="more-info">
                        <i class="fa-regular fa-sun"></i>
                        <h3>{{ state.sunrise }}</h3>
                    </div>
                    <div class="more-info">
                        <i class="fa-regular fa-moon"></i>
                        <h3>{{ state.sunset }}</h3>
                    </div>
                    <div class="more-info">
                        <i class="fa-solid fa-hand-holding-droplet"></i>
                        <h3>{{ state.hum }}%</h3>
                    </div>
                    <div class="more-info">
                        <i class="fa-solid fa-wind"></i>
                        <h3>{{ state.wind }}m/s</h3>
                    </div>
                    <div class="more-info">
                        <i class="fa-solid fa-temperature-arrow-up"></i>
                        <h3>{{ state.maxTem }} °C</h3>
                    </div>
                    <div class="more-info">
                        <i class="fa-solid fa-temperature-arrow-down"></i>
                        <h3>{{ state.minTem }} °C</h3>
                    </div>

                </div>
            </div>

        </div>

        <div class="info-subcoontainer-week">
            <div v-for="(forecasts, dayName) in groupedByDay" :key="dayName">
                <h2>{{ dayName }} {{ getDateInfo(forecasts[0].dt).day }}</h2>
                <v-window v-model="activeWindow[dayName]" class="week-container">

                    <v-window-item v-for="(forecast, index) in forecasts" :key="forecast.dt" :value="index" class="week-items">

                            <h3>{{ getDateInfo(forecast.dt).time }}</h3>
                            <p>{{ forecast.main.temp }}°C</p>
                  
                    </v-window-item>

                </v-window>

                <v-btn @click="activeWindow[dayName] = (activeWindow[dayName] - 1 + forecasts.length) % forecasts.length"
                    class="carousel-arrow">Anterior</v-btn>
                <v-btn @click="activeWindow[dayName] = (activeWindow[dayName] + 1) % forecasts.length"
                    class="carousel-arrow">Siguiente</v-btn>
            </div>
        </div>


    </div>
</template>
  
<script setup>
import MenuContainer from '../views/search.vue'

import { reactive, ref } from 'vue';
import axios from 'axios';
import { getDateInfo } from '../composables/dateInfo'

const state = reactive({
    theme: '',
    inputName: 'malaga',
    iconData: '',
    cityName: '',
    day: '',
    numDay: '',
    time: '',
    weType: '',
    tem: '',
    hum: '',
    sunrise: '',
    sunset: '',
    wind: '',
    maxTem: '',
    minTem: '',
    groupedByDay: {},
})

// Método para actualizar el tema
const updateTheme = (newTheme) => {
    state.theme = newTheme;
};

let groupedByDay = {};
let activeWindow = reactive({});


const apiKey = '01408b16000e17a8e9420187ac1c7e5c';
const currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${state.inputName}&appid=${apiKey}&units=metric `;
const hourlyForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${state.inputName}&appid=${apiKey}&units=metric `;

const obtenerDatos = async () => {
    try {
        const responseHourlyForecast = await axios.get(hourlyForecast);
        const hourlyForecastData = responseHourlyForecast.data.list;
        state.hourlyForecastData = hourlyForecastData;
        console.log('Tiempo por dias:', hourlyForecastData);

        for (let i = 0; i < hourlyForecastData.length; i++) {
            let dayName = getDateInfo(hourlyForecastData[i].dt).dayName;
            if (!groupedByDay[dayName]) {
                groupedByDay[dayName] = [];
            }
            groupedByDay[dayName].push(hourlyForecastData[i]);
        }

        //Impresion por pantalla
        for (let i = 0; i < hourlyForecastData.length; i++) {
            console.log(getDateInfo(hourlyForecastData[i].dt).dayName);
        }

        const responseCurrentWeather = await axios.get(currentWeather);
        const currentWeatherData = responseCurrentWeather.data;
        console.log('Tiempo por horas:', currentWeatherData);

        state.cityName = currentWeatherData.name;
        state.weType = currentWeatherData.weather[0].description.charAt(0).toUpperCase() + currentWeatherData.weather[0].description.slice(1);
        state.tem = currentWeatherData.main.temp;
        state.hum = currentWeatherData.main.humidity;
        state.wind = currentWeatherData.wind.speed;
        state.maxTem = currentWeatherData.main.temp_max;
        state.minTem = currentWeatherData.main.temp_min;

        //Sunset hour 
        let unixSunset = currentWeatherData.sys.sunset;
        let sunsetInfo = getDateInfo(unixSunset);
        state.sunset = sunsetInfo.time;

        //Sunrise
        let unixSunrise = currentWeatherData.sys.sunrise;
        let sunriseInfo = getDateInfo(unixSunrise);
        state.sunrise = sunriseInfo.time;

        //Date
        let unixDate = currentWeatherData.dt;
        let dateInfo = getDateInfo(unixDate);
        state.day = dateInfo.dayName.charAt(0).toUpperCase() + dateInfo.dayName.slice(1);
        state.numDay = dateInfo.day;
        state.time = dateInfo.time;


        const icon = currentWeatherData.weather[0].icon;
        const weatherIcon = `https://openweathermap.org/img/wn/${icon}@4x.png`

        state.iconData = weatherIcon;

    } catch (error) {
        console.error('ERROR:' + error.response.data.message);
    }
};

obtenerDatos();


</script>
  