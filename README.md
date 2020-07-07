<img src="https://img.shields.io/badge/version-1.0.0-green.svg" alt="pandajs version">
<img src="https://img.shields.io/badge/LICENCE-MIT-blue.svg" alt="licence"/>
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
      <li><a href='#query'>
        query
        </a>
        <ul>
          <li><a href='#get-method'>select</a></li>
          <li><a href='#post-method'>insert</a></li>
          <li><a href='#update-method'>update</a></li>
          <li><a href='#delete-method'>delete</a></li>
          <li><a href='#custom-method'>custom method</a></li>
        </ul>
      </li>
    </ul>
  </li>
  <li><a href='#get-parameter'>getting parameter from router</a></li>
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
  <li id='get-method'>
    <h4>GET</h4>
    <table>
      <thead>
        <tr>
          <td>METHOD</td>
          <td>DESCRIPTIONS</td>
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
                for example i want user data where id = 1, so i can get it by typing
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
              <li>
                <b>fields</b>
                <br/>
                fields is what data you want to retrieve for example i have a table and inside a table there are 4 column username, email, password, image
                i just want to retrieve username and image so the code will look like this
                <pre>
                Model.get('tb_user', {where: {name: '%key%'}, order: {}}, ['username, 'image'], 200)
                if you set fields into null, you will get all the data
                </pre>
              </li>
            </ol>
            <br/>
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
          <td>getLike(table_name, {where: {}, order: {}}, fields, http_status_code)</td>
          <td>
            getLike method used for executing this query <i>SELECT column FROM column WHERE column LIKE '%parameter%'</i>
            <br/>
            <ol>
              <li>
                <b>table_name</b>
                Name of your table
              </li>
              <li>
                <b>{where: {}, order: {}}</b>
                <br/>
                where parameter can not be null you must fill it but for order you can set it into null, example
                <pre>
                Model.getLike('tb_user', {where: {name: `%${key}%`}, null, 200)
                </pre>
              </li>
            </ol>
          </td>
        </tr>
        <tr>
          <td>innerJoin({param : {}, order: {}}, http_status_code)</td>
          <td>
            innserJoin() used for executing this query <i>SELECT table_name.column_name FROM table_name INNER JOIN table_name ON table_name.column_name  = table_name.column_name</i>
            <br/>
            <ol>
              <li>
                <b>param</b>
                <br/>
                the data that you must enter into the param must follow the following structure
                <pre>
                  {param:[
                    {table: table_name, fields: [column_name], identifier: table_name},
                    {table: table_name, fields: [column_name], identifier: table_name}
                  ], order: {}}
                </pre>
                identifier is what column that you want for combine between 2 tables, look at the example below
                <pre>
                Model.innerJoin({ param: [
                    {table: 'tb_user', fields: ["username", "image"], identifier: "userId"},
                    {table: 'tb_product', fields: ["product", "date"], identifier: "buyyerID"}
                ]}, order: {}})
                // from example above the sql query will look like this
                // SELECT tb_user.username, tb_user.image, tb_product.product, tb_product.date FROM tb_user INNER JOIN tb_product ON tb_user.userId = tb_product.buyyerID
                </pre>
              </li>
            </ol>
          </td>
        </tr>
      </tbody>
    </table>
  </li>
  <li id='post-method'>
    <h4>INSERT</h4>
    <table>
      <thead>
        <tr>
          <th>METHOD</th>
          <th>DESCRIPTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><b>insert(</b>table_name, parameter, http_status_code<b>)</b></td>
          <td>
            <ul>
              <li>
                <b>parameter</b>
                <br/>
                you should pass the parameter, parameter structure should be like this
                <pre>
                {
                    column_name : value,
                },
                </pre>
                example, i want to insert user data
                <pre>
                Model.insert('tb_user', {email: 'hendri@gmail.com', age: 20, sex: 'male'}, 200)
                </pre>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </li>
  <li id='update-method'>
    <h4>UPDATE</h4>
    <table>
      <thead>
        <tr>
          <th>METHOD</th>
          <th>DESCRIPTIONs</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><b>update(</b>table_name,{update: {}, identifier: {}},status<b>)</b></td>
          <td>
            <b>{update: {}, identifier: {}}</b>
            <br/>
            update parameter is what data you want to change, for example i want to change the username and age so the code will look like this
            <pre>
            Model.update('tb_user', {update: {username: "jerryc", age: 25}, identifier: {userID: 8}, 200)
            </pre>
            and identifier is what label of data you want to use, here i user userID because userID is primary key
          </td>
        </tr>
      </tbody>
    </table>
  </li>
  <li id='delete-method'>
    <h4>DELETE</h4>
    <table>
      <thead>
        <tr>
          <th>METHOD</th>
          <th>DESCRIPTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><b>delete(</b>table_name,{},http_status_code<b>)</b></td>
          <td>
            after table name, you should pass identifier as i explained above, example i want to delete user with id 9
            <pre>
            Model.delete('tb_user', {userID: 9}, 200)
            </pre>
          </td>
        </tr>
      </tbody>
    </table>
  </li>
  <li id='custom-method'>
    <h4>CUSTOM METHOD</h4>
    <table>
      <thead>
        <tr>
          <th>METHOD</th>
          <th>DESCRIPTIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>raw(sql_query, http_status_code)</td>
          <td>
            first parameter is sql_query, sql_query is sql code whatever sql code you want to execute for example like this
            <pre>
            SELECT name, age, images FROM tb_user WHERE age >= 20 ORDER BY age ASC
            </pre>
            second parameter is http status code default is 200
          </td>
        </tr>
      </tbody>
    </table>
  </li>
</ul>

<br/>
<h3 id='get-parameter'>GETTING PARAMETER FROM ROUTER</h3>
<p>
  as we known if we want to pass parameter what we need to do is passing it into router like this <b>'/user/get/:id'</b>, to get the id you should put the Request parameter in your controlers method example like this
  <pre>
    const {Model} = require('../Helper')
    class HomeModel{
      GetUser(Request){
        // to get parameter you can do like this, (add Request paramter inside your controler's method this is important
        const userId = Request.params.id
        return Model.get('tb_user', {where: {userid: userId}, order: {}}, 200)
      }
    }
    const Home = new HomeModel()
    module.exports = Home
  </pre>
  and somewhile we need to get paramer from url like this <b>'/user/search/?id=2'</b>, to get parameter <b>get</b> we must put Request paramter in your controler's method, look at the example below
  <pre>
  const {Model} = require('../Helper')
    class HomeModel{
      GetUser(Request){
        // to get parameter you can do like this, (add Request paramter inside your controler's method this is important
        const userId = Request.query.id
        return Model.get('tb_user', {where: {userid: userId}, order: {}}, 200)
      }
    }
    const Home = new HomeModel()
    module.exports = Home
  </pre>
</p>
