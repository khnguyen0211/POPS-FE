const express = require('express');
const router = express.Router();
const newRouter = require('../controllers/NewsController');

router.use('/', newRouter.index);

module.exports = router;