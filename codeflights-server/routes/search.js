const express = require('express');
const searchControllers = require('../controllers/search/index');

const router = express.Router();

// router.post('/', searchControllers.searchDate.post);
router.post('/result', searchControllers.searchNation.post);
router.post('/result/destination', searchControllers.searchFlight.post);

module.exports = router;
