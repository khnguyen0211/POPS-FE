const express = require('express');
const router = express.Router();
const salesRouter = require('../controllers/SalesController');

router.get('/sales', salesRouter.index);

module.exports = router;