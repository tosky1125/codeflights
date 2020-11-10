const { iata, flights } = require('./models');
const axios = require('axios');

const mainKey = "kMOXg%2FkJI9XYBYuoFjxNKhEkNgV1ncASqJhXtSXpxebRC%2Fnr3Iq%2BMOIj4CIfgsDQqGad7GQGZOjbr98Wc88ulA%3D%3D";
const spareKey = "97qgw6vcppji%2FgmPnaKWmrkG7kUGymNtv%2BRpbUC6qbqfkzmm1jE%2B1XvtvaweZc5Fdih03AkIh1x2EqA0kT8fig%3D%3D";

const getSchedulesAndUpdate = async (airportData) => {
    const { airportCode, cityNameKor } = airportData;
    const response = await axios({
        method: 'get',
        url: `http://openapi.airport.kr/openapi/service/StatusOfPassengerFlightsDS/getPassengerDeparturesDS?serviceKey=${spareKey}&airport_code=${airportCode}`
    });
    if (!response.data.response.body.items.item) {
        console.log(`there is no flights to ${airportCode}, ${cityNameKor}`);
    } else {
        const resResult = response.data.response.body.items.item;
        updateDatabase(resResult);
    }
};

const getAllCodes = async () => {
    const allCodes = await iata.findAll({
        attributes: ['airportCode', 'cityNameKor'],
        raw: true
    });
    return allCodes;
};

const updateDatabase = (schedules) => {
    schedules.map(eachSchedule => {
        flights.create({
            portName: eachSchedule.airport,
            portCode: eachSchedule.airportcode,
            airName: eachSchedule.airline,
            airID: eachSchedule.flightId,
            estTime: eachSchedule.estimatedDateTime,
            schTime: eachSchedule.scheduleDateTime
        });
    });
};

const updateFlights = async () => {
    const allDestinations = await getAllCodes();
    allDestinations.map((desetination, index) => {
        setTimeout(() => getSchedulesAndUpdate(desetination), (index+1)*1000)
    });
};

updateFlights();
