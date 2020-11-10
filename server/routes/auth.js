const express = require('express');
const oAuthControllers = require('../controllers/oauth/index');

const router = express.Router();
router.post('/google', oAuthControllers.google.post);

module.exports = router;
