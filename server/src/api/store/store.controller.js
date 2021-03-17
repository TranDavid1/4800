const pool = require("../../config/database");
module.exports = {
    getData: (req, res) => {
        console.log(req)
        pool.query('SELECT * FROM Store', (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            }
            else {
                console.log(err);
            }
        })
    }
};
