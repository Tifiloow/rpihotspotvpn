

var mongoose = require('mongoose');
var config = require('./config');
var fs = require('fs')
var https = require('https');
express = require('express');
 auth = require('./routes/auth')
var userroute = require('./routes/user');
bodyParser = require('body-parser');
app = express();
apiroute = require('./routes/api')
mongoose.connect(config.database,{
  useNewUrlParser: true,
  useCreateIndex: true,
});

process.on('unhandledRejection', (err, p) => {
  console.log('An unhandledRejection occurred');
  console.log(`Rejected Promise: ${p}`);
  console.log(`Rejection: ${err}`);
});



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); //enable server cors
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res) {
  res.send('Portal of the api; /user   /api');
});
app.get('/test', function(req, res) {
  res.json({success:true});
});
app.use('/user', userroute);
app.use('/api',auth, apiroute);


https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(config.port, function () {
  console.log(`Example app listening on port ${config.port}! Go to https://localhost:${config.port}`)
})