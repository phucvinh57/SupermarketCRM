const mysql = require('mysql');
const util = require('util')

module.exports = function setUpUser(config) {
    const connection = mysql.createConnection(config);
    connection.connect(function (err) {
        if (err) {
            console.log(err)
            return
        }
        console.log(`${config.user}@${config.host} connected !`)
    })
    const dbQuery = util.promisify(connection.query).bind(connection)
    return {
        dbQuery
    }
}