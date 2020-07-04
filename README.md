<img src="https://img.shields.io/badge/version-1.0.0-green.svg" alt="pandajs version">
<ol>
  <li><a href='#welcome'>welcome to pandajs</a></li>
  <li><a href='#installation'>installation</a></li>
  <li>
    <a href='#howtouse'>how to use</a>
    <ul>
      <li><a href='#database'>setting database</a></li>
      <li><a href='#routing'>routing</a></li>
    </ul>
  </li>
</ol>
<p id='welcome'>
Welcome to <b>pandajs</b>, pandajs is a package for create REST SERVER easly, fast, secure and free forever.
to use this package you should use mysql as the database
</p>
<h3 id='installation'>INSTALLATION</h3>
To use this package click button clone or download above, after that unzip your file and put it
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
