<template>
    <div class="main-container" :class="state.theme">
        
        <button id="menuBtn" class="menu-btn"><i class="fa-solid fa-bars"></i></button>

        <div id="menu" class="menu">
            <SearchContainer :updateTheme="updateTheme" :updateCity="updateCity" :getInformation="getInformation"
                :state="state" :removeFavoriteCity="removeFavoriteCity" />
        </div>

        <CurrentWeatherContainer :state="state" :addFavoriteCity="addFavoriteCity" :removeFavoriteCity="removeFavoriteCity" />
        <ForecastContainer :state="state" />
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import SearchContainer from '../views/search.vue'
import CurrentWeatherContainer from '../views/currentWeather.vue'
import ForecastContainer from '../views/forecast.vue'
import useWeatherLogic from '../composables/weatherLogic'
import useMenuLogic from '../composables/menuLogic'

const { state, updateTheme, updateCity, getInformation, addFavoriteCity, removeFavoriteCity, } = useWeatherLogic();


onMounted(() => {
    getInformation();
    useMenuLogic();
});
</script>

  