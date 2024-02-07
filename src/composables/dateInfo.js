
export const getDateInfo = (unixTimestamp) => {
    let date = new Date(unixTimestamp * 1000);

    // Obtener el nombre del día
    let options = { weekday: 'long' };
    let dayName = date.toLocaleDateString('en-EN', options);
    // Obtener el día, mes y año
    let day = date.getDate(); // Día del mes (1-31)
    let month = date.getMonth() + 1; // Los meses en JavaScript van de 0 (enero) a 11 (diciembre), por lo que sumamos 1
    let year = date.getFullYear();

    // Obtener la hora y los minutos
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Determinar si es por la mañana o por la tarde
    let period = hours >= 12 ? 'pm' : 'am';

    let time = hours+':'+minutes+' '+period

    return { dayName, day, month, year, time };
};
