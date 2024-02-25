<template>
    <div class="menu-container">

        <div class="menu-subContainer">

            <button @click="state.menuOpen = false" class="closeMenu"><i class="fa-solid fa-xmark fa-xl"></i></button>

            <div class="menu-title">
                <i class="fa-solid fa-cloud-sun-rain"></i>
                <h2>Weather App</h2>
            </div>

            <div class="search">
                <v-btn icon size="x-small" @click="location"><i class="fa-solid fa-location-dot fa-xl btn-text"></i></v-btn>
                <v-text-field class="text-field" v-model="city" variant="underlined" clear-icon="fas fa-xmark" clearable
                    append-inner-icon="fas fa-search" @click:append-inner="sendCity" @keyup.enter="sendCity"
                    :error-messages="state.errorMessage"></v-text-field>
            </div>
            <div class="lastCity-container">
                <h2>Last search cities</h2>
                <div v-for="(lastSearche, index) in state.lastSearches" :key="index" class="lastCity">
                    <h3 type="button" @click="updateCity(lastSearche)">{{ lastSearche }}</h3>
                </div>
            </div>
            <hr v-if="state.favoriteCities && state.favoriteCities.length > 0">
            <div v-if="state.favoriteCities && state.favoriteCities.length > 0" class="favCity-container">
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
                <v-switch hide-details="true" :model-value="theme === 'dark'" label="Change theme"
                    @change="toggleTheme"></v-switch>
                <v-switch hide-details="true" :model-value="style === 'color'" label="Change color"
                    @change="toggleStyle"></v-switch>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';

let theme = ref('light');
let style = ref('simple');
let city = ref('');
let storedTheme;
let storedStyle;

const props = defineProps({
    updateTheme: Function,
    updateCity: Function,
    getInformation: Function,
    removeFavoriteCity: Function,
    state: Object
});


onMounted(() => {
    storedTheme = localStorage.getItem('theme');
    storedStyle = localStorage.getItem('style');

    if (storedTheme && storedStyle) {
        theme.value = storedTheme;
        style.value = storedStyle;

        props.updateTheme(`${theme.value}-${style.value}`);
    }
});


const closeMenu = () => {
    props.state.menuOpen = false;
}

const location = () => {
    props.getInformation(true);
    closeMenu();
}

const updateCity = (city) => {
    props.updateCity(city);
    closeMenu();
}

const sendCity = async (event) => {
    if (city.value !== "") {
        event.target.blur();
        await props.updateCity(city.value);
        city.value = '';

        if (props.state.error) {
            setTimeout(() => {
                props.state.errorMessage = null;
                props.state.error = false;
            }, 3000);
        } else {
            if (window.innerWidth < 1400 && props.state.menuOpen) {
                closeMenu();
            }
        }
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

    localStorage.setItem('theme', theme.value);
    localStorage.setItem('style', style.value);
};

</script>
