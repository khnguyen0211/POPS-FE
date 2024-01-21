const express = require('express');
const router = express.Router();
const loginRouter = require('../controllers/LoginController');

router.get('/login', loginRouter.index);
router.get('/login/oauth', loginRouter.oauth);
module.exports = router;