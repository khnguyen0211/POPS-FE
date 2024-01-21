class NewsController {
    //GET[] / index
    index(req, res) {
        const Data = req.data
        // console.log(Data)
        res.render('../public/views/pages/profile', {reqData: Data})
    }
}

module.exports = new NewsController();