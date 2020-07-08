const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))
const chalk = require('chalk')

let controller_template = `
const {Model} = require('../Helper')
class Controler_${argv.controller}{
    /*
    * this is the example of controller
    * you can make another controller but the structure must same like this
    * Model class must imported
    * Your Controller must initialize, example : const Home = new HomeModel()
    * put your method right here
    */
}

const ${argv.controller} = new Controler_${argv.controller}()

module.exports = ${argv.controller}
`
if(argv.controller !== null && argv.controller !== undefined){
    fs.writeFile(`app/Controller/${argv.controller}.js`, controller_template, (err, data) => {
        if(err){
            console.error(err)
        }else{
            console.log(chalk.green(`controller ${argv.controller} has been created !`))
        }
    })
}