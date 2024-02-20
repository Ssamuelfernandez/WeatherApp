<template>
    <div class="menu-container">

        <div class="menu-subContainer">

            <button id="closeBtn" class="closeMenu"><i class="fa-solid fa-xmark fa-xl"></i></button>

            <div class="menu-title">
                <h2>Weather App</h2>
            </div>


            <div class="search">
                <v-btn icon size="x-small" @click="getInformation(true)"><i
                        class="fa-solid fa-location-dot fa-xl btn-text"></i></v-btn>
                <v-text-field class="text-field" v-model="city" variant="underlined" clear-icon="fas fa-xmark" clearable
                    append-inner-icon="fas fa-search" @click:append-inner="sendCity" @keyup.enter="sendCity"></v-text-field>
            </div>


            <div class="lastCity-container">
                <h2>Last search cities</h2>
                <div v-for="(lastSearche, index) in state.lastSearches" :key="index" class="lastCity">
                    <h3 type="button" @click="props.updateCity(lastSearche)">{{ lastSearche }}</h3>
                </div>
            </div>




            <br>
            <hr>
            <br>

            <div class="favCity-container">
                <h2>Favorite cities</h2>
                <div v-for="(favoriteCity, index) in state.favoriteCities" :key="index" class="favCity">

                    <h3 type="button" @click="props.updateCity(favoriteCity)">- {{ favoriteCity }}</h3>

                    <div class="trashBtn">
                        <button @click="props.removeFavoriteCity(favoriteCity)"><i
                                class="fa-solid fa-trash-can"></i></button>
                    </div>


                </div>
            </div>



            <div class="theme">
                <v-switch :model-value="theme === 'dark'" label="Change theme" @change="toggleTheme"></v-switch>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

let theme = ref('light');
let city = ref('');

const props = defineProps({
    updateTheme: Function,
    updateCity: Function,
    getInformation: Function,
    removeFavoriteCity: Function,
    state: Object
});

const sendCity = () => {
    if (city.value !== "") {
        props.updateCity(city.value);
        city.value = '';
    }
};

const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    props.updateTheme(theme.value);
};

</script>