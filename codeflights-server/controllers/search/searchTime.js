const axios = require('axios');
const timeZone = require('moment-timezone');
const { iata } = require('../../models');

const searchTime = async (iataCode) => {
  let result = await axios({
    method: 'get',
    url: 'http://aviation-edge.com/v2/public/routes',
    params: {
      key: 'b8c24b-4ea0b5',
      departureIata: 'ICN',
      arrivalIata: iataCode,
    },
  });

  const arrivalTimeZoneResult = await iata.findOne({
    attributes: ['timeZone'],
    where: {
      airportCode: iataCode,
    },
    raw: true,
  });

  const arrivalTimeZone = arrivalTimeZoneResult.timeZone;
  result = result.data[0];

  if (result === undefined || result.arrivalTime === null || result.departureTime === null) {
    return 9999;
  }
  const departureTime = timeZone.tz(result.departureTime, 'hh:mm:ss', 'Asia/Seoul');
  const arrivalTime = timeZone.tz(result.arrivalTime, 'hh:mm:ss', arrivalTimeZone);
  let estTime = departureTime.diff(arrivalTime, 'minutes');
  estTime = Math.abs(estTime);
  return estTime;
};

const hfTime = (estTime) => {
  if (estTime === 9999) {
    return '운항정보를 받아올 수 없습니다';
  }
  if (estTime / 60 > 0) {
    const hour = Math.floor(estTime / 60);
    const hourAccm = hour * 60;
    const minutes = estTime - hourAccm;

    if (minutes === 0) {
      return `약 ${hour}시간 소요`;
    }
    return `약 ${hour}시간 ${minutes}분 소요`;
  }
  return `약 ${estTime}분 소요`;
};

// searchTime("LAX");
module.exports = { searchTime, hfTime };
