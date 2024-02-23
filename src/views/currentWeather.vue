<template>
    <div class="info-container">
        <div v-show="state.maxFav" class="banner-container">
            <v-banner class="banner" rounded="lg" max-width="90%" elevation="2" lines="one"
                text="Maximum favorite cities!" :stacked="false">
                <template v-slot:actions>
                    <v-btn @click="state.maxFav = false">Close</v-btn>
                </template>
            </v-banner>
        </div>

        <div class="info-subcoontainer">

            <div class="pin-container">
                <div class="currentPin">
                    <button
                        @click="isFavoriteCity(state.cityName) ? removeFavoriteCity(state.cityName) : addFavoriteCity(state.cityName)">
                        <i v-if="isFavoriteCity(state.cityName)" class="fa-solid fa-heart fa-xl"></i>
                        <i v-else class="fa-regular fa-heart fa-xl"></i>
                    </button>
                </div>
            </div>

            <div>
                <h1>{{ state.cityName }}</h1>
                <div class="date">
                    <h3>{{ state.day }} {{ state.numDay }} </h3>
                    <h3>{{ state.time }}</h3>
                </div>
            </div>


            <div class="currentIcon">
                <img :src="state.iconData" alt="Weather icon">
            </div>
            <div class="currentTem">
                <h1>{{ state.tem }}°C</h1>
                <h3>{{ state.weType }}</h3>
            </div>


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
                    <h3>{{ state.wind }} m/s</h3>
                </div>
                <div class="more-info">
                    <i class="fa-solid fa-temperature-arrow-up"></i>
                    <h3>{{ state.maxTem }}°C</h3>
                </div>
                <div class="more-info">
                    <i class="fa-solid fa-temperature-arrow-down"></i>
                    <h3>{{ state.minTem }}°C</h3>
                </div>

            </div>
        </div>
        <div class="arrow">
            <i class="fa-solid fa-angles-down"></i>
        </div>

    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    state: Object,
    addFavoriteCity: Function,
    removeFavoriteCity: Function,
})

const isFavoriteCity = (cityName) => {
    return props.state.favoriteCities.includes(cityName);
}

</script>

<style scoped>
.banner-container {
    display: flex;
    justify-content: center;
}

.banner {
    background: linear-gradient(145deg, var(--box-shadow), var(--box-light));
    color: var(--text-color);
}
</style>
