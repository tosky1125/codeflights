const axios = require('axios');
// const { iata } = require('../../models');

// airport code 를 넣으면
const searchTimeZone = async (airportCode) => {
  let result = await axios({
    method: 'get',
    url: 'https://aviation-edge.com/v2/public/airportDatabase',
    params: {
      key: 'b8c24b-4ea0b5',
      codeIataAirport: airportCode,
    },
  });
  const { data } = result;
  [result] = data;
  const { timezone } = result;
  return timezone;
};

// const updateTimeZone = async () => {
//   const result = await iata.findAll({
//     raw: true,
//     attributes: ['airportCode'],
//   });
//   result.map((arg, index) => {
//     setTimeout(async () => {
//       const timeZoneInfo = await searchTimeZone(arg.airportCode);
//       const updateResult = await iata.update(
//         { timeZone: timeZoneInfo },
//         { where: { airportCode: arg.airportCode } },
//       );
//     }, (index + 1) * 500);
//   });
// };

module.exports = { searchTimeZone };
