const { default: axios } = require('axios')
var express = require('express')
var app = express()
const API_TOKEN = process.env.API_TOKEN
const PORT = process.env.PORT || 8080

app.use(express.static("public"))

async function getStationData() {
    let stationResponse = await axios.get(`https://swd.weatherflow.com/swd/rest/stations?token=${API_TOKEN}`)
    return stationResponse.data
}
async function getObservationData(stationId) {
    let obvResponse = await axios.get(`https://swd.weatherflow.com/swd/rest/observations/station/${stationId}?token=${API_TOKEN}`)
    return obvResponse.data
}

app.get("/api/observation", async function (req, res) {
    let stationData = await getStationData()
    let obvData = await getObservationData(stationData.stations[0].station_id)
    res.send({
        "name": obvData.station_name,
        ...obvData.obs[0]
    })
})


app.listen(PORT, function(){
    console.log(`listening on port ${PORT}`)
})