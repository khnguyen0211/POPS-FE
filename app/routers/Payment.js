const express = require('express');
const router = express.Router();
const paymentRouter = require('../controllers/PaymentController');
const axios = require("axios");

router.get('/payments/paypal-success/:order_id', async (req, res, next) => {
    const { order_id } = req.params
    const data = { order_id: order_id };
    const axiosInstance = axios.create({
        baseURL: `http://localhost:4000`,
    });
    const response = await axiosInstance.post(
        "/payments/paypal-success",
        data
    );
    console.log(response)
    if ((response.status = 200)) {
        return next();
    }

}, paymentRouter.success);

router.get('/payments/paypal-failed/:order_id', paymentRouter.error);

module.exports = router; console.log('hello')
