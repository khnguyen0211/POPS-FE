const formatTime = require('date-format');

class DashboardController {
    //GET[] / index
    index(req, res) {
       
        let oldData = req.data
        const [lastKey, lastValue] = Object.entries(oldData).pop();
        const avatar = {
            persion: lastValue
        }

        const reqData = req.data.map((arr) => {
            return arr.map((obj) => {
                const newObj = { ...obj, created_at: formatTime("dd/MM/yyyy - hh:mm:ss", new Date(obj.created_at)) }
                return newObj
            })
        })

        const newObject = Object.assign(reqData, avatar);
        // console.log(newObject)
      
        res.render('../public/views/pages/dashboards', { reqData: newObject })
    }
}

module.exports = new DashboardController();