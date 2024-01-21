class newCustomersController {
    //GET[] / index
    index(req, res) {
        let data = req.data;
        let newData = data
        res.render('../public/views/pages/customers', {reqData: data} )
    }
    detail(req, res) {
        let data = req.data;
        // let newData = data
        res.render('../public/views/pages/detail_customers', {reqData: data} )
    }
}

module.exports = new newCustomersController();