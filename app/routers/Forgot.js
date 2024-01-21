const express = require('express');
const router = express.Router();
const forgotRouter = require('../controllers/FogotController');

router.get('/forgot', forgotRouter.index);

module.exports = router;