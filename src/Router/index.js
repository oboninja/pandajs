const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const bodyParser = require('body-parser')
const Controller = require('../../app/Helper/Controller/')
let port = dotenv.parsed.server_port

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

class Routes{

    static UrlHandler(method, endpoint, controller){
        let path = controller.split('@')
        app[method](endpoint, (req, res) => {
            const text = Controller.connect(req, path[0], path[1])
            text.then(respon => {
                res.status((respon.status) ? respon.status : 200 || 200)
                res.json(JSON.parse(respon, true) || '')
            }).catch(err => {
                console.log(err)
                res.status((err.status) ? err.status : 200 || 200)
                res.json(err || 'eror')
            })
        })
    }

    static get(endpoint, controller){
        Routes.UrlHandler('get', endpoint, controller)
    }

    static post(endpoint, controller){
        Routes.UrlHandler('post', endpoint, controller)
    }

    static patch(endpoint, controller){
        Routes.UrlHandler('patch', endpoint, controller)
    }

    static delete(endpoint, controller){
        Routes.UrlHandler('delete', endpoint, controller)
    }
}

app.listen(port,() => {
    console.log(`Running on port ${port}`)
})

module.exports = Routes
