function cToF(celsius) {
    var cTemp = celsius;
    var cToFahr = cTemp * 9 / 5 + 32;
    return cToFahr
}
async function refreshData() {


    let obvResponse = await fetch("/api/observation")
    let obvData = await obvResponse.json()
    document.getElementById("temp").innerHTML = `Temperature: ${cToF(obvData.air_temperature)}° F`
    document.getElementById("name").innerHTML = obvData.name
    document.getElementById("wind").innerHTML = `Wind Direction: ${obvData.wind_direction}° ${getCompassLetter(obvData.wind_direction)}`
    document.getElementById("arrow").style.transform = `rotate(${obvData.wind_direction}deg)`
    document.getElementById("arrow").style.visibility = "visible"
    document.getElementById("time").innerHTML = getTimeStamp(obvData.timestamp)
    document.getElementById("humidity").innerHTML = `Humidity: ${obvData.relative_humidity}%`
}
window.onload = async () => {
    refreshData()
}

function getCompassLetter(degrees) {
    const directions = ["N", "NE", "E" , "SE" , "S" , "SW" , "W" , "NW"]
    let index = Math.floor((degrees + 22) /45) % 8
    return directions[index]
}

function getTimeStamp(time){
    let date = new Date(time * 1000)
    return date.toLocaleTimeString()
}