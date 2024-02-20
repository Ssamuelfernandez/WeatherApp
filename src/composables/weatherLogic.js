import { reactive } from 'vue';
import { getDateInfo } from '../composables/dateInfo'
import { getCoordinates, getCurrentWeatherByCity, getCurrentWeatherByCoordinates, getHourlyForecastByCity, getHourlyForecastByCoordinates } from '../composables/apiCall'

export default function useWeatherLogic() {

    const state = reactive({
        theme: 'light',
        inputName: 'Madrid',
        activeWindow: {},
        lastSearches: JSON.parse(localStorage.getItem('lastSearches')) || [],
        favoriteCities: JSON.parse(localStorage.getItem('favoriteCities')) || [],

    })

    // Método para actualizar el tema
    const updateTheme = (newTheme) => {
        state.theme = newTheme;
    };

    //Metodo para actualizar ciudad
    const updateCity = async (newCity) => {
        state.inputName = newCity;
        await getInformation();
        
    };

    // Método para agregar ciudad a favoritos
    const addFavoriteCity = (city) => {
        if (!state.favoriteCities.includes(city) && state.favoriteCities.length < 6) {
            state.favoriteCities.push(city);
            localStorage.setItem('favoriteCities', JSON.stringify(state.favoriteCities));
        }
    };

    // Método para eliminar ciudad de favoritos
    const removeFavoriteCity = (city) => {
        const index = state.favoriteCities.indexOf(city);
        if (index > -1) {
            state.favoriteCities.splice(index, 1);
            localStorage.setItem('favoriteCities', JSON.stringify(state.favoriteCities));
        }
    };

    // Función para obtener la información
    const getInformation = async (useCoordinates = false) => {
        try {
            const coordinates = useCoordinates ? await getCoordinates() : null;
            const currentWeatherData = useCoordinates ? await getCurrentWeatherByCoordinates(coordinates.lat, coordinates.lon) : await getCurrentWeatherByCity(state.inputName);
            const hourlyForecastData = useCoordinates ? await getHourlyForecastByCoordinates(coordinates.lat, coordinates.lon) : await getHourlyForecastByCity(state.inputName);

            assignData(currentWeatherData, hourlyForecastData)
        } catch (error) {
            console.error('ERROR:' + error);
        }
    };

    // Función para obtener la información de fecha y hora
    const getDateInfos = (unixTimes) => {
        return unixTimes.map(unixTime => getDateInfo(unixTime));
    };

    // Función para asignar los datos a las variables del estado
    const assignData = (currentWeatherData, hourlyForecastData) => {
        const { name, weather, main, wind, sys, dt } = currentWeatherData;
        const { description, icon } = weather[0];
        const { temp, humidity, temp_max, temp_min } = main;
        const { speed } = wind;
        const { sunrise, sunset } = sys;

        const [sunsetInfo, sunriseInfo, dateInfo] = getDateInfos([sunset, sunrise, dt]);

        Object.assign(state, {
            cityName: name,
            weType: description.charAt(0).toUpperCase() + description.slice(1),
            tem: temp,
            hum: humidity,
            wind: speed,
            maxTem: temp_max,
            minTem: temp_min,
            sunset: sunsetInfo.time,
            sunrise: sunriseInfo.time,
            day: dateInfo.dayName.charAt(0).toUpperCase() + dateInfo.dayName.slice(1),
            numDay: dateInfo.day,
            time: dateInfo.time,
            iconData: `https://openweathermap.org/img/wn/${icon}@4x.png`,
            groupedByDay: {},
        });

        // Agrego la búsqueda exitosa a las últimas búsquedas
        if (!state.lastSearches.includes(name)) {
            state.lastSearches.unshift(name);  // Almaceno nombre
            if (state.lastSearches.length > 4) {
                state.lastSearches.pop();  // Las últimas 6 búsquedas
            }
            localStorage.setItem('lastSearches', JSON.stringify(state.lastSearches));
        }
        
        // console.log(state.lastSearches)

        hourlyForecastData.forEach(hourlyData => {
            let dayName = getDateInfo(hourlyData.dt).dayName;
            if (!state.groupedByDay[dayName]) {
                state.groupedByDay[dayName] = [];
            }
            // Función para obtener la URL del ícono del clima
            const getWeatherIconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

            hourlyData.iconData = getWeatherIconUrl(hourlyData.weather[0].icon);
            state.groupedByDay[dayName].push(hourlyData);
        });
    };

    return {
        state,
        updateTheme,
        updateCity,
        getInformation,
        addFavoriteCity,
        removeFavoriteCity,
    }

}