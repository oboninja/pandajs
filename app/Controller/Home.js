const {Model} = require('../Helper')
class Controler_Home{
    /*
    * this is the example of controller
    * you can make another controller but the structure must same like this
    * Model class must imported
    * Your Controller must initialize, example : const Home = new HomeModel()
    * put your method right here
    */
   random(){
       return Model.get('tb_kategori', null, null, 200);
   }

}
const Home = new Controler_Home()
module.exports = Home