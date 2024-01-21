const express = require('express');
const router = express.Router();
const settingRouter = require('../controllers/SettingController');

router.get('/setting', settingRouter.index);

module.exports = router;