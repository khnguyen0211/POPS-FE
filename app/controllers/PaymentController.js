class PaymentController {
    //GET[] / index
    success(req, res) {
        res.render('../public/views/pages/payment_success',)
    }
    error(req, res){
        res.render('../public/views/pages/payment_error',)
    }
}

module.exports = new PaymentController();