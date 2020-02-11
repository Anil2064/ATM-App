const cors = require('cors');
var express = require('express'),
  app = express(),
  port = process.env.PORT || 4000,
  mongoose = require('mongoose'),
  Task = require('./api/models/atmTransactionModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  // 'allowedHeaders': ['Content-Type'], // headers that React is sending to the API
  // 'exposedHeaders': ['Content-Type'], // headers that you are sending back to React
  'origin': '*',
  // 'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // 'header': '*',
  // // 'Access-Control-Allow-Headers': "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
  // 'preflightContinue': false
}));




var routes = require('./api/routes/atmTransactionRoutes'); //importing route
routes(app); //register the route


app.listen(port);



//app.use(cors());

// app.use(cors({
//   origin: '*',
//   credentials: true
// }));

// app.use(cors({
//   // 'allowedHeaders': ['Content-Type'], // headers that React is sending to the API
//   // 'exposedHeaders': ['Content-Type'], // headers that you are sending back to React
//   'origin': '*',
//   // 'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   // 'header': '*',
//   // // 'Access-Control-Allow-Headers': "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
//   // 'preflightContinue': false
// }));

app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.header("preflightContinue", false);
  res.status(404).send({url: req.originalUrl + ' not found'})
  // next();
});

// app.use(function(req, res) {
  
// });

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Credentials',  true);
//   res.header(' preflightContinue', false)
//   // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   // res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
//   next();
// });

console.log('ATM RESTful API server started on: ' + port);
