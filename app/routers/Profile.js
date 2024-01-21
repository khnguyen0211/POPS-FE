const express = require('express');
const router = express.Router();
const profileRouter = require('../controllers/ProfileController');

router.get('/profile', profileRouter.index);

module.exports = router;