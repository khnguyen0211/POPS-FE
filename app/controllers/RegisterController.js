class RegisterController {
    //GET[] / index
    index(req, res) {
        res.render('../public/views/pages/register')
    }
}

module.exports = new RegisterController();