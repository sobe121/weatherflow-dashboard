function cToF(celsius) {
    var cTemp = celsius;
    var cToFahr = cTemp * 9 / 5 + 32;
    return cToFahr
}
async function refreshData() {


    let obvResponse = await fetch("/api/observation")
    let obvData = await obvResponse.json()
    document.getElementById("temp").innerHTML = cToF(obvData.air_temperature)
    document.getElementById("name").innerHTML = obvData.name

}
window.onload = async () => {
    refreshData()
}