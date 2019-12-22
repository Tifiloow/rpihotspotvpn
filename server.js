

//var mongoose = require('mongoose');
var config = require('./config');
var fs = require('fs')
var https = require('https');
express = require('express');
const  sqlite3  =  require('sqlite3').verbose();
const database = new sqlite3.Database("./rpihotspotvpn.db");
auth = require('./routes/auth')
var userroute = require('./routes/user').router;
bodyParser = require('body-parser');
app = express();
apiroute = require('./routes/api')
var cors = require('cors')

function start(){
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/', function(req, res) {
  console.log('trigerred')
  res.json({message:'Portal of the api; /user   /api', success: true});
});

app.use('/user', userroute);
app.use('/api',auth, apiroute);
app.post('/ping', function(req, res) { //created for test purpose
  console.log('trigerred')
  res.json({body: req.body});
});


https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(config.port, function () {
  console.log(`Example app listening on port ${config.port}! Go to https://localhost:${config.port}`)
})}
start()
