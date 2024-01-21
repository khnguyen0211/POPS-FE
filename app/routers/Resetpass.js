const express = require('express');
const router = express.Router();
router.get('/email-verifications/:verify_token', (req, res, next) => {});

router.get('/resetpass/:access_token', (req, res, next) => {
    let accesstoken = req.params.access_token;
    res.render('../public/views/pages/resetpass', {reqData: accesstoken})
});

module.exports = router;