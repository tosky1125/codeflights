const express = require('express');
const articleControllers = require('../controllers/articles/index');

const router = express.Router();

router.post('/write', articleControllers.write.write);
router.get('/article/:id', articleControllers.browse.browse);
router.get('/likes/:id', articleControllers.likes.get);
router.post('/likes/:id', articleControllers.likes.post);

module.exports = router;
