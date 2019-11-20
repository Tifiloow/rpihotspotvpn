

var mongoose = require('mongoose');
var config = require('./config');
var fs = require('fs')
var https = require('https');
var winston = require('winston')
express = require('express');

var logger = winston.createLogger({
	levels: winston.config.npm.levels,
	format: winston.format.json(),
	transports: [
		new winston.transports.Console({ format: winston.format.simple() })
	]
});
logger.info("Hello, world");
 auth = require('./routes/auth')
var userroute = require('./routes/user');
bodyParser = require('body-parser');
app = express();
apiroute = require('./routes/api')
mongoose.connection.once('open', function() {
  logger.info('MongoDB event open');
  logger.debug('MongoDB connected [%s]', config.database);

  mongoose.connection.on('connected', function() {
      logger.info('MongoDB event connected');
  });

  mongoose.connection.on('disconnected', function() {
      logger.warn('MongoDB event disconnected');
  });

  mongoose.connection.on('reconnected', function() {
      logger.info('MongoDB event reconnected');
  });

  mongoose.connection.on('error', function(err) {
      logger.error('MongoDB event error: ' + err);
  });

  // return resolve();
  return start();
});

const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: 30, // Retry up to 30 times
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
}
/*
const connectWithRetry = () => {
console.log('MongoDB connection with retry')
mongoose.connect(config.database, options).then(()=>{
  console.log('MongoDB is connected')
}).catch(err=>{
  console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
})
}

connectWithRetry()
*/
return mongoose.connect(config.database, options, function(err) {
  if (err) {
      logger.error('MongoDB connection error: ' + err);
      // return reject(err);
      process.exit(1);
  }
});


function start(){
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
})}