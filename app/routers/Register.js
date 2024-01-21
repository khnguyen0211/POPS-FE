const express = require('express');
const router = express.Router();
const registerRouter = require('../controllers/RegisterController');

router.get('/register', registerRouter.index);

module.exports = router;