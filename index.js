var express = require('express');
var apiRoutes = require('./api-routes'); 
//Body-parser enables your app to parse data from incoming request like form data via urlencode. 
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

//Configure body parser to handle post request
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

var db;
var connection = process.env.MONGODB_URI || 'mongodb://heroku_4fqhz7xm:iv4chok2nphrd2k5am0n8g5sao@ds037601.mlab.com:37601/heroku_4fqhz7xm'
// Connect to Mongoose and set connection variable
mongoose.connect(
    connection, 
    { 
        useUnifiedTopology: true, 
        useNewUrlParser: true 
    }, 
    function(err, database){
        if (err) {
            console.log('Failed to connect to database');
            console.log(err);
            process.exit(1);
        }
        db = database;
        console.log("Database connection ready");
})


// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


var port = process.env.PORT || 8080;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//Send message for Default URL
app.get('/', (req,res) => res.send('Hello World with Express'));

//Use API routes in the App
app.use('/api', apiRoutes);

app.listen(port, function(){
    console.log('Running cat rest on port ' + port);
});