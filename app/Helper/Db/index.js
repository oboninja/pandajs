const dotenv = require('dotenv').config()
const mysql = require('mysql')
const chalk = require('chalk')
const connection = mysql.createConnection({
    host: dotenv.parsed.host,
    user: dotenv.parsed.user,
    password: dotenv.parsed.password,
    port: dotenv.parsed.port,
    database: dotenv.parsed.database
})

try{
    connection.connect(err => {
        if(err){
            console.error(`${chalk.bold.red('you must set your database on .env file and do not forget to run your mysql database')}`)
            throw err
        }
    })
}catch(error){
    console.error('you must set your database on .env file and do not forget to run your mysql database')
}


module.exports = connection