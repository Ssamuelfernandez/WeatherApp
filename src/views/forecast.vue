<template>
    <div class="info-subcoontainer-week">
        <div v-for="(forecasts, dayName) in state.groupedByDay" :key="dayName">
            <h3>{{ dayName }} {{ getDateInfo(forecasts[0].dt).day }}</h3>
            <div class="window-container">
                <button :style="{ opacity: state.activeWindow[dayName] > 0 ? 1 : 0.2 }"
                    :disabled="state.activeWindow[dayName] === 0"
                    @click="state.activeWindow[dayName] = (state.activeWindow[dayName] - 1 + forecasts.length) % forecasts.length"
                    class="carousel-arrow"><i class="fa-solid fa-chevron-left"></i></button>
                <v-window v-model="state.activeWindow[dayName]" class="week-container">
                    <v-window-item v-for="(forecast, index) in forecasts" :key="forecast.dt" :value="index"
                        class="week-items">


                        <div class="forecastCurrentIcon">
                            <img :src="forecast.iconData" alt="Weather icon">
                        </div>
                        <div class="forecastHours">
                            <h2>{{ getDateInfo(forecast.dt).time }}</h2>

                            <div class="more-info-forecast">
                                <i class="fa-solid fa-temperature-quarter"></i>
                                <p>{{ forecast.main.temp }}°C</p>
                            </div>
                            <div class="more-info-forecast">
                                <i class="fa-solid fa-hand-holding-droplet"></i>
                                <p>{{ forecast.main.humidity }}%</p>
                            </div>



                        </div>


                    </v-window-item>
                </v-window>
                <button :style="{ opacity: state.activeWindow[dayName] < forecasts.length - 1 ? 1 : 0.2 }"
                    :disabled="state.activeWindow[dayName] === forecasts.length - 1"
                    @click="state.activeWindow[dayName] = (state.activeWindow[dayName] + 1) % forecasts.length"
                    class="carousel-arrow"><i class="fa-solid fa-chevron-right"></i></button>
            </div>

        </div>

    </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { getDateInfo } from '../composables/dateInfo'

const props = defineProps({
    state: Object
})

</script>