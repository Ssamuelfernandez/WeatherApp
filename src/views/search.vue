<template>
    <div class="menu-container">

        <div class="menu-subContainer">

            <button id="closeBtn" class="closeMenu"><i class="fa-solid fa-xmark fa-xl"></i></button>

            <div class="menu-title">
                <h2>Weather App</h2>
            </div>


            <div class="search">
                <v-btn icon size="x-small" @click="location"><i class="fa-solid fa-location-dot fa-xl btn-text"></i></v-btn>
                <v-text-field class="text-field" v-model="city" variant="underlined" clear-icon="fas fa-xmark" clearable
                    append-inner-icon="fas fa-search" @onlick:append-inner="sendCity"
                    @keyup.enter="sendCity"></v-text-field>
            </div>


            <div class="lastCity-container">
                <h2>Last search cities</h2>
                <div v-for="(lastSearche, index) in state.lastSearches" :key="index" class="lastCity">
                    <h3 type="button" @click="updateCity(lastSearche)">{{ lastSearche }}</h3>
                </div>
            </div>
            <hr>
            <div class="favCity-container">
                <h2>Favorite cities</h2>
                <div v-for="(favoriteCity, index) in state.favoriteCities" :key="index" class="favCity">

                    <h3 type="button" @click="updateCity(favoriteCity)">- {{ favoriteCity }}</h3>

                    <div class="trashBtn">
                        <button @click="props.removeFavoriteCity(favoriteCity)"><i
                                class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
            </div>

            <div class="theme">
                <v-switch hide-details="true" :model-value="theme === 'dark'" label="Change theme" @change="toggleTheme"></v-switch>
                <v-switch hide-details="true" :model-value="style === 'color'" label="Change color" @change="toggleStyle"></v-switch>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

let theme = ref('light');
let style = ref('simple');
let city = ref('');

const props = defineProps({
    updateTheme: Function,
    updateCity: Function,
    getInformation: Function,
    removeFavoriteCity: Function,
    state: Object
});

const closeMenu = () => {
    const menuBtn = document.getElementById("menuBtn");
    if(menuBtn.offsetParent !== null){
       const closeBtn = document.getElementById('closeBtn');
    if (closeBtn) closeBtn.click(); 
    }
    
}

const location = () => {
    props.getInformation(true);
    closeMenu();
}

const updateCity = (city) => {
    props.updateCity(city);
    closeMenu();
}

const sendCity = () => {
    if (city.value !== "") {
        props.updateCity(city.value);
        city.value = '';
        closeMenu();
    }
};

const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    updateThemeStyle();
};

const toggleStyle = () => {
    style.value = style.value === 'simple' ? 'color' : 'simple';
    updateThemeStyle();
};

const updateThemeStyle = () => {
    props.updateTheme(`${theme.value}-${style.value}`);
};

</script>