const express = require('express');
const router = express.Router();
const dashboardRouter = require('../controllers/DashboardController');

router.get('/dashboards', dashboardRouter.index);

module.exports = router;