<img src="https://img.shields.io/badge/version-1.0.0-green.svg" alt="pandajs version">
<ol>
  <li><a href='#welcome'>welcome to pandajs</a></li>
  <li><a href='#installation'>installation</a></li>
  <li>
    <a href='#howtouse'>how to use</a>
    <ul>
      <li><a href='#database'>setting database</a></li>
      <li><a href='#routing'>routing</a></li>
      <li><a href='#controler'>controler</a></li>
      <li><a href='#controler-method'>controler's method</a></li>
      <li><a href='#query'>query/li>
    </ul>
  </li>
</ol>
<p id='welcome'>
Welcome to <b>pandajs</b>, pandajs is a library for create REST SERVER easly, fast, secure and free forever.
to use this library you should use mysql as the database
</p>
<h3 id='installation'>INSTALLATION</h3>
To use this library click button clone or download above, after that unzip your file and put it
to anywhere you want

<h3 id='howtouse'>HOW TO USE</h3>
<p id='database'>The first step we have to do is to set the database such as setting the host, username, password, and also the port. in doing this we just need to edit the <b>.env</b> file.
look at the example below
<br/>
your .env file will look like this
</p>
<pre>
host=localhost
user=root
password= 
port=3306
database=
server_port = 3500
</pre>
<table>
  <thead>
     <tr>
       <th>VARIABLE</th>
       <th>DESCRIPTION</th>
     </tr>
  </thead>
  <tbody>
    <tr>
      <td>host</td>
      <td>
        your database host default is <b>localhost</b>. and also
        you can connect to your remote mysql
      </td>
    </tr>
    <tr>
      <td>user</td>
      <td>your databse user default is <b>root</b></td>
    </tr>
    <tr>
      <td>password</td>
      <td>your database password default is <b>null</b></td>
    </tr>
    <tr>
      <td>port</td>
      <td>port mysql default is <b>3306</b></td>
    </tr>
    <tr>
      <td>database</td>
      <td>the name of the database that you want to use default is <b>null</b></td>
    </tr>
    <tr>
      <td>server_port</td>
      <td>the port number to run your application default is on port <b>3500</b>, You can change it if you want</td>
    </tr>
  </tbody>
</table>

<h3 id='routing'>Routing</h3>
<p>Routing in pandajs will look like this</p>
<pre>
const router = require('./src/Router')
router.get('/detail', "User@detail")
</pre>
<p>when requesting data you can use methods like GET, POST, PATCH, DELETE and etc, look at the example below</p>
<pre>
router.post('/user', 'User@insert')
router.patch('/user/:id', 'User@update')
router.delete('/user/delete/:id', 'User@delete')
</pre>
<p>
  as we can see that when we use one of the request methods we need 2 parameters like this <b>.get('/user', 'User@insert')</b>
  first paramter is the <b>endpoint</b> and the second is the name of the controller and the method you want to use, the names of the controller and method are <b>separated by the @ sign</b>, before the @ sign is the <b>name of the controller</b> you want to use and the sign after @ is the <b>name of the method</b> you want to use
</p>
<br/>
<h3>ROUTING PARAMETERS</h3>
<p>
  To put pass parameter you can easly put the name of your paramter after your endpoint in the example below i will passing parameter called id
  <pre>
  .get('/user/defail/:id', 'User@detail')
  </pre>
</p>
<br/>
<h3 id='controler'>CONTROLER</h3>
<p>
  with controler you can easly manage your data, in pandajs the controller will look like this
  <pre>
  const {Model} = require('../Helper')
  class HomeModel{
      /*
      * this is the example of controller
      * you can make another controller but the structure must same like this
      * Model class must imported
      * Your Controller must initialize, example : const Home = new HomeModel()
      * put your method right here
      */
  }

  const Home = new HomeModel()

  module.exports = Home
  </pre>
  
  if you want to make your own controler you must put it in folder app and than inside controler folder
  <pre>
  app
  --controler
  ----your_controler.js
  </pre>
</p>

<br/>
<h3 id='controler-method'>CONTROLER'S METHOD</h3>
<p>
  Inside your controler's class you can make method <b>whatever you want</b> for example <b>i create method</b> Insert for insert data to my database
  <pre>
  const {Model} = require('../Helper')
  class HomeModel{
      /*
      * this is the example of controller
      * you can make another controller but the structure must same like this
      * Model class must imported
      * Your Controller must initialize, example : const Home = new HomeModel()
      * put your method right here
      */
      Insert(Request){
        return Model.insert('tb_user', {email: Request.body.email, password: Request.body.password}, 200)
      }
  }

  const Home = new HomeModel()

  module.exports = Home
  </pre>
  in our routes we can call by typing this
  <pre>
  router.post('/user/insert', "Home@Insert")
  </pre>
</p>

<br/>
<h3 id='query'>QUERY</h3>
<p>
  Query used for managing your data like get data, insert, update or delete
</p>
<ul>
  <li>
    <h4>GET</h4>
    <table>
      <thead>
        <tr>
          <td>QUERY</td>
          <td>DESCRIPTION</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>get(table_name, {where: {}, order: {}}, http_status_code)</td>
          <td>
            <ol>
              <li>
                <b>table_name</b>
                <br/>
                Name of your table
              </li>
              <li>
                <b>{where: {}, order: {}}</b>
                <br/>
                if you want to get specific data you can fill out where parameter
                for example i want user data where id = 0, so i can get it by typing
                <pre>
                {where: {userID: 1}, order: {}}
                </pre>
                <b>order: {}</b>
                <br/>
                if you want to order data you can fill out order paremeter for example i want get all user order by userID
                <pre>
                {where: {}, order: {userID: 'DESC'}}
                </pre>
                but if you don't want to get specific data or ordering data you can set it into null so the code will look like this
                <pre>
                get(table_name, null, 200)
                </pre>
              </li>
              <li>
                <b>http_status_code</b>
                <br/>
                status code used when data succesfuly processed, default is 200 which means ok
              </li>
            </ol>
            get method example
            <pre>
            const {Model} = require('../Helper')
            class UserControler{
              // without get specific data and without ordering data
              getData(){
                return Model.get('tb_user', null, 200)
              }
              // with get specific data and without ordering data
              getBy(){
                return Model.get('tb_user', {where: {userID: 9}, order: {}}, 200)
              }
              // with get spesific data and with ordering data
              getDetail(){
                return Mode.get('tb_user', {where: {age: 20}, order: {name: 'DESC'}}, 200}
              }
            }
            const User = new UserControler()
            module.exports = User
            </pre>
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </li>
</ul>
