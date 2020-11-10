const axios = require('axios');
const cheerio = require('cheerio');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { iata } = require('./models');
const { flights } = require('./models');

let imgParser = async (flightCode) => {
    console.log(flightCode);
    // let html = await axios.get(`https://airlinecodes.info/${flightCode}`);
    // let soup = new JSSoup(String(html.data));
    return `https://airlinecodes.info/airlinelogos/${flightCode}.svg`
};

let createRecord = async (arg) => {
    console.log(arg);
    let flightCode = arg.airID.substring(0, 2);
    let result = await flights.update(
        { logo: `https://airlinecodes.info/airlinelogos/${flightCode}.svg` },
        { where: {airID: arg.airID} 
    }
    );
    console.log(`update result: ${arg.airID}'s logo column is updated to ${result}`);
};

// let createImg = async () => {
//     let imgResult = await iata.findAll({raw: true, limit:10});
//     imgResult.map((arg, index) => {
//         setTimeout(createRecord(arg), (index+1)*1000);
//     });
// };

let saveImgs = async () => {
    let list = await flights.findAll({
        attributes: ['airName', 'airID'],
        raw: true
    });
    list.map((arg, index) => {
            createRecord(arg)
        })
    //     setTimeout(() => {
    //         createRecord(arg)
    //     }, (index+1)*2000);
    // });
};

let updateTest = async() => {
    let iataWithImg = await iata.update(
        { img: "hello world" },
        { where: {cityCode: "ICN"}}
    );
};

saveImgs();
