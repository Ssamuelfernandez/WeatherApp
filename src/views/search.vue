<template>
    <div class="menu-container">
        <div class="menu-title">
            <h2>Weather App</h2>
        </div>
        <div class="search">
            <v-btn icon size="x-small" @click="getInformation(true)"><i class="fa-solid fa-location-dot fa-xl"></i></v-btn>
            <v-text-field v-model="city" variant="underlined" clear-icon="fas fa-xmark" clearable
                append-inner-icon="fas fa-search" @click:append-inner="sendCity" @keyup.enter="sendCity"></v-text-field>
        </div>
        <p>Ultimas busquedas</p>
        <p>Busquedas fijadas</p>
        <div class="theme">
            <v-switch :model-value="theme === 'dark'" label="Change theme" @change="toggleTheme"></v-switch>
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
    getInformation: Function
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