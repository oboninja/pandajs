/*
1.  Menyambungkan antara router dan controller serta menghubungkannya ke
    method yang ingin digunakan

2.  req wajib dikirimkan karena supaya bisa mendapatkan value dari get dan juga parameter
    url
*/

class Controller {
    static connect(req, controller, method){
        const Control = require(`../../Controller/${controller}`)
        return Control[method](req)
    }
}

module.exports = Controller