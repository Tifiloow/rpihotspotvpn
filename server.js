

//var mongoose = require('mongoose');
var config = require('./config');
var fs = require('fs')
var https = require('https');
express = require('express');
const  sqlite3  =  require('sqlite3').verbose();
auth = require('./routes/auth')
var userroute = require('./routes/user').router;
bodyParser = require('body-parser');
app = express();
apiroute = require('./routes/api')
var cors = require('cors')
_app_folder = "./angular-frontend/dist/angular-frontend/"
function start(){
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));



app.use('/user', userroute);
app.use('/api',auth, apiroute);
app.get('/', function (req, res) {
  res.status(200).sendFile(`/`, {root: _app_folder});
});

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(config.port, function () {
  console.log(`Example app listening on port ${config.port}! Go to https://localhost:${config.port}`)
})}
start()
