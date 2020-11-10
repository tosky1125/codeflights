const { Op } = require('sequelize');
const { flights } = require('../../models');
const { articles } = require('../../models');
const blog = require('./searchBlog');

const { parsePost } = blog;
const searchPrice = require('./searchPrice');

const { getPrice } = searchPrice;
const dateHandler = require('./dateHandler');

const { handlingDate } = dateHandler;

module.exports = {
  post: async (req, res) => {
    if (!req.session.departureDate || !req.session.arrivalDate) {
      res.status(404).send({ error: 'there is no needed session' });
    } else {
      // date from session
      const departure = req.session.departureDate;

      // dummy data
      // let departure = moment().add(3, 'd').format('YYYYMMDDHHmm');;
      // let arrival = 202010050853;
      const flightsAndPosting = {};
      const availableFlights = [];
      const positngFromBlog = [];
      const postingFromDB = [];

      // queryString check
      if (!req.body.city) {
        res.status(404).send({ error: 'there is no query string' });
      } else {
        // finding flights
        const cityKor = req.body.city;
        const flightsList = await flights.findAll({
          where: { portName: { [Op.substring]: cityKor } },
          raw: true,
        });
        if (flightsList.length === 0) {
          flightsAndPosting.flights = null;
        } else {
          flightsList.map((arg) => {
            if (arg.portName.includes('/')) {
              arg.portName = arg.portName.slice(0, arg.portName.indexOf('/'));
            }
            if (Number(arg.estTime) - departure > 0
                        && Number(arg.schTime) - departure > 0) {
              availableFlights.push({
                city: arg.portName,
                carrier: arg.airName,
                carrierNo: arg.airID,
                carrierLogo: arg.logo,
                departure: handlingDate(arg.estTime),
                portCode: arg.portCode,
              });
            }
          });
          flightsAndPosting.flights = availableFlights;
          flightsAndPosting.estPrice = await getPrice(availableFlights[availableFlights.length - 1]);
        }
        // parse blog posting
        const blogPostings = await parsePost(cityKor);
        blogPostings.map((arg) => {
          positngFromBlog.push(arg);
        });
        flightsAndPosting.blogPostings = positngFromBlog;

        // getting articles from DB
        const articlesFromDB = await articles.findAll({
          where: { title: { [Op.substring]: cityKor } },
          raw: true,
        });
        if (articlesFromDB.length === 0) {
          flightsAndPosting.userPostings = null;
          res.send(flightsAndPosting);
        } else {
          articlesFromDB.map((arg) => {
            postingFromDB.push(arg);
          });
          flightsAndPosting.userPostings = articlesFromDB;
          res.send(flightsAndPosting);
        }
      }
    }
  },
};
