<template>
    <div class="main-container" :class="state.theme">

        <SearchContainer :updateTheme="updateTheme" :updateCity="updateCity" :getInformation="getInformation"/>

        <CurrentWeatherContainer :state="state"/>

        <ForecastContainer :state="state"/>

    </div>
</template>
  
<script setup>
import { onMounted } from 'vue';
import SearchContainer from '../views/search.vue'
import CurrentWeatherContainer from '../views/currentWeather.vue'
import ForecastContainer from '../views/forecast.vue'
import useWeatherLogic from '../composables/weatherLogic'

const { state, updateTheme, updateCity, getInformation } = useWeatherLogic();

onMounted(() => {
    getInformation();
});


</script>

  