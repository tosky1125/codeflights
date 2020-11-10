const express = require('express');
const userControllers = require('../controllers/user/index');

const router = express.Router();

router.post('/signup', userControllers.signup.post);
router.post('/signin', userControllers.signin.post);
router.post('/logout', userControllers.logout.post);
router.post('/info', userControllers.info.post);
router.get('/info', userControllers.info.get);

module.exports = router;
