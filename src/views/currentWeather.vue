<template>
    <div class="info-container">
        <div class="info-subcoontainer">
            <v-btn icon size="x-small" class="pin" variant="outlined"><i class="fa-solid fa-heart fa-xl"></i></v-btn>
            <h1>{{ state.cityName }}</h1>
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
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  state: Object
})

</script>