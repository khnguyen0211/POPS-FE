class SaleController {
    //GET[] / index
    index(req, res) {
        let newData = req.data;
        res.render('../public/views/pages/setting',  { reqData: newData })
    }
}

module.exports = new SaleController();