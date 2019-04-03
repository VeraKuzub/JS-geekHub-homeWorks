function checkEquals (str1, str2) {
 return  (str1 === str2)? true: false;
}


function findUser(user, arrObjs) {
  return arrObjs.find((obj)=> {
    return (obj.userlogin === user.userlogin)? true: false; 
  });
}


function fetchUser (user, arrObjs){
  return arrObjs.find((obj)=> {
    return (obj.userlogin === user.userlogin)? obj: false; 
  });
}


function fetchlastItem (arr) {
  return lastItem = arr[arr.length - 1];
}


function authenticationMiddleware() {
  return (req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(
      req.session.passport)}`);
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
  }
}


function addUserToDB (obj) {
  mongoClient.connect(function(err, client){
    const db = client.db("termpaper");
    const collection = db.collection("users");
    collection.insertOne(obj, function(err, result){ 
        if (err) throw err;
        console.log(result.ops);
        console.log("added user to db");
        client.close();
    });
});
}


function findUserFromDB (obj) {
  let el = {};
  el.userlogin = obj.userlogin;
  mongoClient.connect(function(err, client){
    const db = client.db("termpaper");
    const collection = db.collection("users");
    collection.findOne(el, function(err, result){ 
        if (err) throw err;
        if (result === null) console.log("does not find a user" , result);
        else console.log("find a user", result);
        client.close();
    });
  });
}

//------------------------server----------------------------------
const express = require("express");
const path = require('path');
const uuid = require('uuid/v4');  // automatically generate unique strings (universally unique identifier )
const exphbs  = require('express-handlebars'); //для определения визуального интерфейса использует не стандартные файлы html, а специальные сущности - представления, из которых затем создаются html-файлы. 
const flash = require('connect-flash'); //The flash is a special area of the session used for storing messages.
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser"); 


//validate data
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


// for hash our user's password
const bcrypt = require('bcrypt'); 
const saltRounds = 10; 


//Authentication Packages
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const fs = require("fs");
const mongo = require("mongodb");
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/termpaper', {useNewUrlParser: true});
const db = mongoose.connection;

const cors = require('cors');

const routes = require('./routes/index');
const users = require('./routes/users');

// create the server
const app = express();

//veiw engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

// add & configure  BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser()); 

//set Static Folder
app.use(express.static(path.join(__dirname, "public")));

//Express Session 
app.use(session({
 // genid: (req) => {
 //    // console.log('session','Inside the session middleware');
 //    // console.log('session req.sessionID',req.sessionID);
 //    return uuid() // use UUIDs for session IDs
 //  },
  store: new MongoStore({mongooseConnection: db}),
  secret: 'keyboard cat', 
  saveUninitialized: true,
  resave: true
  // cookie: {
  //   // path: '/', 
  //   // httpOnly: true, 
  //   // secure: false, 
  //   maxAge: 60000 //null 
  // }
}));

//passport init
app.use(passport.initialize());
app.use(passport.session());

//cors
app.use('*', function(req, res, next) {
//replace localhost:3000 to the ip address:port of your server
res.header("Access-Control-Allow-Origin", "http://localhost:3000");
res.header("Access-Control-Allow-Headers", "X-Requested-With");
res.header('Access-Control-Allow-Headers', 'Content-Type');
res.header('Access-Control-Allow-Credentials', true);
next(); 
});

//enable pre-flight
app.options('*', cors());


//Connect Flach
app.use(flash());

// Global Vars 
app.use(function (req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//Routes
app.use('/', routes);
app.use('/users', users);

//set port 
app.set('port', (process.env.PORT || 3000));

// tell the server what port to listen on
app.listen(app.get('port'), () => {
  console.log("Example app listening on port ", app.get('port'));
});
