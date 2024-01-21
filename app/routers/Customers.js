const express = require('express');
const router = express.Router();
const customersRouter = require('../controllers/CustomersController');

router.get('/customers', customersRouter.index);

router.get('/customers/customers-detail/:id', customersRouter.detail);

module.exports = router;