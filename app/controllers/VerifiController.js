class VerifiController {
    //GET[] / index
    async success(req, res) {

        res.render('../public/views/pages/verifi_success',)
    }
    error(req, res) {
        res.render('../public/views/pages/verifi_error',)
    }
}

module.exports = new VerifiController();