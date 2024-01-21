class LoginController {
    //GET[] / index
    index(req, res) {
        res.render('../../public/index')
    }

    oauth(req, res) {
        console.log('hello token')
        const { access_token, refresh_token, avatar } = req.query
        console.log(access_token)
        console.log(refresh_token)
        console.log(avatar)
        return res.redirect('https://pops.onrender.com/sales')
    }
}

module.exports = new LoginController();