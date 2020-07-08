const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))
const random_string = require('randomstring')
const dotenv = require('dotenv').config()
const CreatorHelpoer = require('./app/Helper/Creator')


// create controller

if(argv.controller !== null && argv.controller !== undefined){
    /*
    use this command

    node create --controller Contrroller_Name
    
    example:

    node create --controller Car
    */
    CreatorHelpoer.CreateController(argv.controller);
}

// create key

else if(argv.key !== null && argv.key !== undefined){
    /*
    Create key manualy use this command
    
    node create --key your_key
    example: node create --key AwesomeApp

    Create key automaticly use this command

    node create --key --auto
    result: will generate 14 random string
    */
    let result_key = ''
    if(argv.auto){
        const key = random_string.generate(14)
        result_key = key
    }else{
        result_key = argv.key
    }
    CreatorHelpoer.CreateKey(result_key, dotenv.parsed.database)
    fs.writeFile('assets/key.txt', result_key, () => {})
}