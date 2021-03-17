const pool = require("../../config/database");
module.exports = {
    createUser: (data, callBack) => {
        console.log(data)
        pool.query(
            `insert into Customer(firstName, lastName, phone, email, password) 
                values(?,?,?,?,?)`,
            [
                data.firstname,
                data.lastname,
                data.phone,
                data.email,
                data.password,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateUser: (data, callBack) => {
        pool.query(
            `update Customer set firstName=?, lastName=?, email=?, phone=? where email=?`,
            [
                data.firstname,
                data.lastname,
                data.email,
                data.phone,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteUser: (data, callBack) => {
        pool.query(
            `delete from Customer where email=?`,
            [data.email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserByUserId: (id, callBack) => {
        pool.query(
            `select id,email,refreshtoken,password from registration where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getUserByUserEmail: (email, callBack) => {
        pool.query(
            `select * from Customer where email=?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateToken: (data, callBack) => {
        pool.query(
            `update Customer set refreshToken=? where email=?`,
            [
                data.refreshToken,
                data.email,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    removeToken: (data, callBack) => {
        pool.query(
            `update Customer set refreshToken=? where email=?`,
            [
                '',
                data,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};
