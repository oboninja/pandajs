const dotenv = require('dotenv').config()
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: dotenv.parsed.host,
    user: dotenv.parsed.user,
    password: dotenv.parsed.password,
    port: dotenv.parsed.port,
    database: dotenv.parsed.database
})

connection.connect(err => {
    if(err){
        throw err
    }
})

module.exports = connection