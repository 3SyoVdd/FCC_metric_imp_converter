'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const expect      = require('chai').expect;
const cors        = require('cors');
require('dotenv').config();

const apiRoutes         = require('./routes/api.js');
const fccTestingRoutes  = require('./routes/fcctesting.js');
const runner            = require('./test-runner');
const ConvertHandler = require('./controllers/convertHandler.js');

let app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    console.log ("ich bin api route");
    res.sendFile(process.cwd() + '/views/index.html');
  });

//import ConvertHandler from './controllers/convertHandler.js';
app.get('/api/convert/', (req, res) =>{
  console.log("api convert get", req.query)
  
  let mycv = new ConvertHandler();
  let sanUnit = mycv.getUnit(req.query.input);
  let sanNum = mycv.getNum(req.query.input);
  let sanReturnUnit = mycv.getReturnUnit(sanUnit);
  let convertedNum = mycv.convert(sanNum, sanUnit);
  let string = mycv.getString(sanNum, sanUnit, convertedNum, sanReturnUnit);
  //console.log("convertedNum", convertedNum);
  console.log("string", string);

  if(sanUnit== 'invalid unit' && sanNum=='invalid number'){
    return  res.json("invalid number and unit");
  }
  if(sanUnit== 'invalid unit'){
    console.log ("invalid unit")
    return res.json("invalid unit");
  }

  if(sanNum=='invalid number'){
    return  res.json("invalid number");
  }
  
  return res.json({initNum: sanNum, initUnit: sanUnit, returnNum: convertedNum, returnUnit:sanReturnUnit, string: string}  )
  
});
        
//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);  
    
//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const port = process.env.PORT || 3000;

//Start our server and tests!
app.listen(port, function () {
  console.log("Listening on port " + port);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
          console.log('Tests are not valid:');
          console.error(e);
      }
    }, 1500);
  }
});

module.exports = app; //for testing
