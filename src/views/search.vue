<template>
    <div class="menu-container">
        <div class="menu-title">
            <h2>Weather App</h2>
        </div>
        <div class="search">
            <v-btn icon size="x-small"><i class="fa-solid fa-location-dot fa-xl"></i></v-btn>

            <v-text-field v-model="city" variant="underlined" clear-icon="fas fa-xmark" clearable append-inner-icon="fas fa-search" @click:append-inner="sendCity"></v-text-field>

        </div>
        <p>Busquedas fijadas</p>
        <div class="theme">
            <v-switch :model-value="theme === 'dark'" label="Change theme" @change="toggleTheme"></v-switch>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

let theme = ref('light');
let city = ref('');
const emit = defineEmits(['theme-changed', 'search-city']);


const sendCity = () => {
    if(!city.value == ""){
        emit('search-city', city.value);
        city.value = '';
    }
};

const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    emit('theme-changed', theme.value);
};

</script>