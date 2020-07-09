const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))
const chalk = require('chalk')
const Db = require('../Db')


class CreatorHelper{

    // create controller

    CreateController(name){
        let controller_template = 
        `const {Model} = require('../Helper')
class Controler_${name}{
/*
* this is the example of controller
* you can make another controller but the structure must same like this
* Model class must imported
* Your Controller must initialize, example : const Home = new HomeModel()
* put your method right here
*/

}
const ${name} = new Controler_${name}()
module.exports = ${name}`
        fs.writeFile(`app/Controller/${name}.js`, controller_template, (err, data) => {
            if(err){
                console.error(err)
            }else{
                console.log(chalk.green(`controller ${argv.controller} has been created !`))
                console.log('press CTRL + C to exit..!')
            }
        })
    }

    // create key
    CreateKey(key = '', database = ''){
        // write key file to [assets/]
        fs.appendFile('assets/key.txt', `${key}\n`, (err, data) =>{
            //
        })

        
        let query = `
        CREATE TABLE ${database}.table_key(id INT NOT NUll AUTO_INCREMENT, 
                            key_value CHAR(14) NOT NULL, 
                            request INT NOT NULL, 
                            times DATETIME NOT NULL, 
                            PRIMARY KEY (id))
        `

        try{
            Db.query(`SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_NAME = 'table_key'`, (failure, res) => {
                if(res.length > 0){
                    // 
                }else{
                    Db.query(query)
                }
            });
            let insert = `INSERT INTO ${database}.table_key(key_value, request, times) VALUES ('${key}', 0, NOW())`
            setTimeout(() => {
                Db.query(`SELECT key_value FROM ${database}.table_key WHERE key_value = '${key}'`, (err, data) => {
                    if(err){
                        console.error(err)
                    }else{
                        if(data.length > 0){
                            console.log(`This key already exits on your database, your key is : ${chalk.bold.green(key)}`)
                            console.log('press CTRL + C to exit..!')
                        }else{
                            Db.query(insert, (failuer2, data2) => {
                                console.log(`Your key : ${chalk.bold.green(key)}`)
                                console.log('press CTRL + C to exit..!')
                            })
                        }
                    }
                })
            }, 3000)

        }catch(err){
            console.error('You must set the .env file first and run your database')
        }
    }
}

const Creator = new CreatorHelper()
module.exports = Creator;