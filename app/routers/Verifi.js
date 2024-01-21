const express = require('express');
const router = express.Router();
const verifyRouter = require('../controllers/VerifiController');

router.get('/verify/success', verifyRouter.success);

router.get('/verify/error', verifyRouter.error);

module.exports = router;