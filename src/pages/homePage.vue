<template>
    <div class="main-container" :class="state.theme">

        <button v-show="!state.menuOpen" @click="state.menuOpen = !state.menuOpen" class="menu-btn"><i class="fa-solid fa-bars"></i></button>
        
        <div v-bind:class="{ 'menu-open': state.menuOpen }" class="menu">
            <SearchContainer :updateTheme="updateTheme" :updateCity="updateCity" :getInformation="getInformation"
                :state="state" :removeFavoriteCity="removeFavoriteCity" />
        </div>
        <CurrentWeatherContainer v-if="!state.loading" :state="state" :addFavoriteCity="addFavoriteCity"
            :removeFavoriteCity="removeFavoriteCity" />
        <ForecastContainer v-if="!state.loading" :state="state" />
        <div v-else class="loading">
            <v-progress-circular indeterminate :size="80" :width="7"></v-progress-circular>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import SearchContainer from '../views/search.vue'
import CurrentWeatherContainer from '../views/currentWeather.vue'
import ForecastContainer from '../views/forecast.vue'
import useWeatherLogic from '../composables/weatherLogic'

const { state, updateTheme, updateCity, getInformation, addFavoriteCity, removeFavoriteCity, } = useWeatherLogic();

let intervalId;

onMounted(() => {
    getInformation();
    intervalId = setInterval(getInformation, 300 * 1000);
});

onUnmounted(() => {
    clearInterval(intervalId);
});

</script>


  