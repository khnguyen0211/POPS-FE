class ForgotController {
    //GET[] / index
    index(req, res) {
        res.render('../public/views/pages/forgot')
    }
}

module.exports = new ForgotController();