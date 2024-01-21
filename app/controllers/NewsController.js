class NewsController {
    //GET[] / index
    index(req, res) {
        res.render('../public/views/pages/page_404')
    }
}

module.exports = new NewsController();