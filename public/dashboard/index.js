const ICONS = {
"clear-day" : "/images/animated/day.svg",
"clear-night" : "/images/animated/night.svg",
"cloudy" : "/images/animated/cloudy-day-3.svg",
"foggy" : "/images/animated/cloudy.svg",
"partly-cloudy-day" : "/images/animated/cloudy-day-2.svg",
"partly-cloudy-night" : "/images/animated/cloudy-night-2.svg",
"possibly-rainy-day" : "/images/animated/rainy-2.svg",
"possibly-rainy-night" : "/images/animated/rainy-4.svg",
"possibly-sleet-day" : "/images/animated/rainy-7.svg",
"possibly-sleet-night" : "/images/animated/rainy-7.svg",
"possibly-snow-day" : "/images/animated/snowy-3.svg",
"possibly-snow-night" : "/images/animated/snowy-7.svg",
"possibly-thunderstorm-day" : "/images/animated/thunder.svg",
"possibly-thunderstorm-night" : "/images/animated/thunder.svg",
"rainy" : "/images/animated/rainy-6.svg",
"sleet" : "/images/animated/rainy-7.svg",
"snow" : "/images/animated/snowy-6.svg",
"thunderstorm" : "/images/animated/thunder.svg",
"windy" : "/images/animated/day.svg",
}
const PRESSURE_ICONS = {
    "steady" : "bi bi-arrow-right-circle",
    "falling" : "bi bi-arrow-down-right-circle",
    "rising" : "bi bi-arrow-up-right-circle",
    "unknown" : "bi bi-question-circle"
}
window.onload = async () => {
    setTime(new Date())
    setInterval(() => {
        setTime(new Date())
    }, 60000);
    setDate(new Date())
    let forecastData = await getForecastData()
    generateForeCards(forecastData.forecast, )  
    generateCurrentConditions(forecastData.current_conditions)  
}
function setTime(date) {
    document.getElementById("time").innerText = date.toLocaleTimeString([] , {hour: '2-digit', minute: '2-digit'})
}
function setDate(date) {
    document.getElementById("date").innerText = date.toDateString()
}
async function getForecastData() {
    let foreResponse = await fetch("/api/forecast")
    return await foreResponse.json()
}
function generateForeCards(forecast, min) {
    for (let i = 0; i < Math.min(forecast.daily.length, min??100); i++) {
        let day = forecast.daily[i]
        let element = $(`<div class="card forecast-card text-center">
        <div class="card-body">
            <img src="${ICONS[day.icon]}">
            <h5 class="card-title">${getDayName(new Date(day.day_start_local * 1000))}</h5>
            <h6 class="card-subtitle mb-2">High ${day.air_temp_high}°F</h6>
            <h6 class="card-subtitle mb-2">Low ${day.air_temp_low}°F</h6>
        </div>
         </div>`)
        $("#forecast-container").prepend(element)
    }
}
function getDayName(date, locale)
{
    if (date.toDateString()==(new Date()).toDateString()){
        return "Today"
    }
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}
function generateCurrentConditions(currentConditions){
    $("#humidity").html(`<b>Humidity</b> ${currentConditions.relative_humidity}%`)
    $("#pressure").html(`<b>Pressure</b> ${currentConditions.station_pressure} mb <i class="${PRESSURE_ICONS[currentConditions.pressure_trend]}"></i>`)
    $("#uv").html(`<b>UV Index</b> ${currentConditions.uv}`)
    $("#precip-local-day").html(`<b>Rainfall</b> ${currentConditions.precip_accum_local_day} in`)
    $("#conditions-icon").attr("src", `${ICONS[currentConditions.icon]}`)
    $("#conditions").text(` ${currentConditions.conditions}`)
    $("#temperature").text(` ${currentConditions.air_temperature}°F`)
    $("#feels-like").text(`Feels like ${currentConditions.feels_like}°F`)
}
