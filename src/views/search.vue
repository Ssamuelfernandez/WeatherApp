<template>
    <div class="menu-container">
        <div class="menu-title">
            <h1>Weather App</h1>
        </div>
        <div class="search">
            <v-text-field label="City" prepend-icon="$vuetify" variant="underlined"></v-text-field>
            <!--boton de localizacion automatica-->

        </div>
        <p>Busquedas fijadas</p>
        <div class="theme">
            <v-switch color="#37474F" :model-value="theme === 'dark'" label="Change theme" @change="toggleTheme"></v-switch>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

let theme = ref('light');
const emit = defineEmits(['theme-changed']);

const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    emit('theme-changed', theme.value);
};

</script>