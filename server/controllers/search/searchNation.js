const moment = require('moment');
const { flights } = require('../../models');
const { iata } = require('../../models');
const { searchTime } = require('./searchTime');
const { hfTime } = require('./searchTime');

/**
 * 기존: searchDate -> searchNation 으로 session check 를 통해 넘어가고 redirection
 * 현재:
 *      departureDate, arrivalDate 를 body 안에 넣어서(type: integer) POST 를 보내줌
 *      그리고 해당 날짜를 기준으로 바로 항공편을 찾아줌 (searchDate 는 필요없음)
 *      session 은 searchNation
 *      search/result 로 post 를 날림
 *      -> departureDate, arrivalDate 를 body 안에 넣어서(type: integer) POST 를 보내줌
 *      서버에서는 해당 body 의 값들을 통해 여행가능한 지역을 return
 *      + session 은 searchFlight 에서 다시 사용하기에 똑같이 부여해준다
 */

module.exports = {
  post: async (req, res) => {
    if (!req.body.departureDate || !req.body.arrivalDate) {
      res.status(404).send({ error: 'fullfill the requirements' });
    }

    // calculate schedule
    const { departureDate } = req.body;
    const { arrivalDate } = req.body;
    const departureWithSch = moment().add(Number(departureDate), 'd').format('YYYYMMDDHHmm');
    const arrivalWithSch = moment().add(Number(departureDate) + Number(arrivalDate), 'd').format('YYYYMMDDHHmm');
    // making session with schedule
    req.session.departureDate = departureWithSch;
    req.session.arrivalDate = arrivalWithSch;

    // // dummy data
    // let departure = 202009290000;
    // let departure = 202009290000;
    // let arrival = 202010100000;

    const uniq = {};
    const nations = await flights.findAll({
      attributes: ['portName', 'portCode', 'estTime', 'schTime'],
      raw: true,
    });
   
	  if (nations.length === 0) {
      res.status(204).send({ error: 'there is no flights in this schedule' });
    }
    const filterdByTime = [];
    nations.map(async (arg) => {
      // if portName has '/', slice only city name from it
      if (arg.portName.includes('/')) {
        arg.portName = arg.portName.slice(0, arg.portName.indexOf('/'));
      }
      // then sorted by date from session's departure and arrival
      if (Number(arg.estTime) - departureWithSch > 0
                && Number(arg.schTime) - departureWithSch > 0) {
        // let estimateTime = await searchTime(arg.portCode);
        filterdByTime.push({ destinations: arg.portName, code: arg.portCode });
      }
    });
	
    const filterDuplicate = filterdByTime
      .filter((obj) => {
       return !uniq[obj.destinations] && (uniq[obj.destinations] = true);
      });

	  console.log(filterDuplicate);
    const finalImage = await Promise.all(
      filterDuplicate.map(async (arg) => {
        const findImg = await iata.findOne({
          where: { airportCode: arg.code },
          attributes: ['img'],
          raw: true,
        });
        arg.img = findImg.img;
        return arg;
      }),
    );
    const withETA = await Promise.all(
      finalImage.map(async (arg) => {
        arg.estTime = await searchTime(arg.code);
        return arg;
      }),
    );
    const sortedByETA = withETA.sort((a, b) => a.estTime - b.estTime);
    sortedByETA.map((arg) => {
      arg.estTime = hfTime(arg.estTime);
    });
    res.send(sortedByETA);
  },
};
