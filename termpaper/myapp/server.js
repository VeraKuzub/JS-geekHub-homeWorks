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

// авторизированные пользователи которые могут быть зарегистрированы
testusers = [
{"userlogin": "admin", "password": 111111, "email": "v.kuzub@gmail.com", "passwordmatch": 111111},
{"userlogin": "vera", "password": 222222}
]
let testuser = {"userlogin": "admin", "password": "111111", "email": "v.kuzub@gmail.com", "passwordmatch": "111111"};


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
mongoose.connect('mongodb://localhost/termpaper', {useNewUrlParser: true});
const db = mongoose.connection;


const cors = require('cors');

const routes = require('./routes/index');
const users = require('./routes/users');

//The default dbpath for mongodb in Ubuntu is /var/lib/mongodb 
//ключевым классом для работы с MongoDB является класс MongoClient
const MongoClient = require("mongodb").MongoClient;

// создаем объект MongoClient и передаем ему строку подключения
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

// // //---------mongoose --------------------

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/termpaper', {useNewUrlParser: true});
// const db = mongoose.connection;

// // create a schema (describe the fields we have in our form and specify the data it can expect)
// let UserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     unique: true,
//     required: true,
//     trim: true
//   },
//   userlogin: {
//     type: String,
//     unique: true,
//     required: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   passwordmatch: {
//   type: String,
//   required: true,
//   }
// });


// //compiling our schema into a Model.
// let User = mongoose.model('User', UserSchema, 'users'); //users here is name of collections

// let testUserMomgoose = new User({
//   "userlogin": "mama", 
//   "password": "111111", 
//   "email": "mama@gmail.com", 
//   "passwordmatch": "111111"}
//   );

// console.log(testUserMomgoose);

//   testUserMomgoose.save(function (err, testUserMomgoose) {
//     if (err) return console.error(err);
//     else console.log("testUserMomgoose saved in DB 2");
//   });

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   User.find({ "userlogin": "roma" }, function (req,res) {
//     console.log('res fromDB', res);
//   });
//   console.log("we're connected!");
// });

// // -----------------------------

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
 //  // store: 
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


// //new passport-----------
// passport.use(new LocalStrategy (
//   function(userLogin, userPassword, done) {
//       console.log('userLogin', userLogin);
//       console.log('password', userPassword);
//       User.findOne({"userLogin":userLogin}, function(err, doc){
//         if (err) {done(err)}
//           else {
//             if(doc){
//               var valid = doc.comparePassword(passport, doc.passport);
//               if (valid){
//                 done(null,{
//                   "userLogin":doc.userLogin,
//                   "password":doc.userPassword,
//                 });
//               }
//             } else {
//               done(null, false);
//             }
//           }
//       })
 

// --------------------------
// passport.use(new LocalStrategy(
//   function(userLogin, userPassword, done) {
//       console.log('username', userLogin);
//       console.log('password', userPassword);
//       //db
//       // const db = require('.db')
//       //------------------
// //       let data = fs.readFileSync("workers.json", "utf8");
// //       let workersArray = JSON.parse(data);
// //       checkUser ()
// //       //------------------

// // const hash = 
// // bcrypt.compare(userPassword, hash, function(err, response){

// //         });
//       // return done(null, 'user');

//     }));

// //----------------------get vera---------------------------
// //for test flash
//   app.get('/addFlash', function (req, res) {
//      req.flash('info', 'Welcome');
//     res.send('Hello');
//   });
//   //for show flash
//   app.get('/showFlash', function (req, res) {
//     res.send(req.flash('info'));
//   });
// //----------------------get ---------------------------

// app.get("/home", (req, res) => {
//   res.sendFile(__dirname + "/pages/home.html");
// });

// app.get("/register", (req, res) => {
//   res.sendFile(__dirname + "/pages/registration.html");
// });

// app.get("/profile", authenticationMiddleware(), (req, res) => {
//   res.sendFile(__dirname + "/pages/profile.html");
// });

// app.get("/login", (req, res) => {
//   res.sendFile(__dirname + "/pages/login.html");
// });


// //----------------------post ---------------------------
// app.post("/login", (req, res, next) => {
//   let userlogin = req.body.userLogin;
//   let password = Number(req.body.userPassword);
//   console.log(userlogin, password);
  
//   let data = fs.readFileSync("workers.json", "utf8");
//   let workersArray = JSON.parse(data);

//   let user = workersArray.find(function (item) {
//     if (item.userlogin === userlogin) return item;
//   });
  
//   if (user) { 
//     if (user.password === password) { 
//       // //user.checkPassword(password) 200 ok
//       req.session.user = user.id;
//       res.send('Пользователь успешно залогинился... res.redirect(\'/profile\')отправить обьект res.send({})');
//     } else {
//       console.log('Пароль не верен');
//       res.status(403).send('Пароль не верен');
//       // 403 forbidden you don't have permission to access
//     }
//   } else res.send('Пользователь не найден. Зарегистрируйтесь или введите правильно логин и пароль');



  // passport.authenticate("local", {
  //   failureRedirect: "/login",
  //   successRedirect: "/profile",
  // });


//   // passport.authenticate("local", {
//        failureRedirect: "/login",}),
//   //   function(req, res) {
//   //   res.redirect("/profile");
//   });

// // create the homepage route at '/' 
// app.get("/", (req, res, next) => {
//   // console.log('req.user', req.user);
//   // console.log('req.isAuthenticated()', req.isAuthenticated());
//   // console.log('request.sessionID', req.sessionID);
//   // console.log('cookie', req.headers['cookie']);
//   res.sendFile(__dirname + "/pages/home.html");
// });


// //----------------------post register---------------------------
// app.post("/register", [
//     body('userEmail')
//       .isEmail(),
//     body('userLogin')
//       .not().isEmpty()
//       .trim()
//       .escape()
//       .isLength({ min: 3, max: 10}),
//     body('userPassword')
//       .not().isEmpty()
//       .trim()
//       .escape()
//       .isLength({ min: 5 }),
//       body('userPasswordMatch')
//       .not().isEmpty()
//       .trim()
//       .escape()
//       .isLength({ min: 5 }),
//     sanitizeBody('notifyOnReply').toBoolean()
//   ], function (req, res, next) {
//     if(!req.body) return res.sendStatus(400);
//   // Finds the validation errors in this request and wraps them in an object with handy functions
//   const errors = validationResult(req);
//   let equal = checkEquals(req.body.userPassword, req.body.userPasswordMatch); 
//     if (!errors.isEmpty()) {
//       console.log('equal', equal);
//       console.log('error', JSON.stringify({ errors: errors.array()}));
//       // return res.status(422).json({ errors: errors.array() });
//       return res.json({registration: false, text: "Ошибка ввода данных"});
//     } else if (!equal) {
//       return res.json({registration: false, text: "Введенный пароль не совпадает"});
//     } else {
//       //create user for db
//       let user = {};
//       user.userlogin = req.body.userLogin;
//       user.password = req.body.userPassword;
//       user.email = req.body.userEmail;
//       user.passwordmatch = req.body.userPasswordMatch;
//       console.log('user', user);

// //add user to db
//       let find = findUserFromDB(user);

//       console.log("result findUserFromDB", find);
//       if (result === undefined) {
//         addUserToDB(user);
//         // hash our user's password
//         // bcrypt.genSalt(saltRounds, function(err, salt) {
//         //   bcrypt.hash(user.password, salt, function(err, hash) {
//         //   // store hash in your password DB.
//         //   user.password = hash;
//         //   user.passwordmatch = hash;
//         //   //add user to DB
//         //   addUserToDB(user);
//         //   });
//         // });
//       } 
//       else res.json({registration: false, text: "Сотрудник с таким логином уже есть в базе"});
//     }
// });

        //---------------------vera----------------------

//       let data = fs.readFileSync("workers.json", "utf8");
//       let workersArray = JSON.parse(data);

//       // check if there is a user in the db
//       let checkUserInBase = findUser(user, workersArray);
//       let addUser = false;
//       if (checkUserInBase === undefined) {

//         // hash our user's password
//         bcrypt.genSalt(saltRounds, function(err, salt) {
//           bcrypt.hash(user.password, salt, function(err, hash) {

//           // store hash in your password DB.
//           user.password = hash;
//           user.passwordmatch = hash;

          
//           workersArray.push(user);
//           addUser = true; 
//           // overwrite file with new data
//           fs.writeFileSync("workers.json", JSON.stringify(workersArray));


//           //зайти в базу, забрать добавленого юзера
//             if(addUser){
//               let newData = fs.readFileSync("workers.json", "utf8");
//               let newWorkersArray = JSON.parse(newData);
//               // let userInBase = fetchUser(user, newWorkersArray);
//               let lastUser = fetchlastItem(newWorkersArray);
             
//               console.log("req.login lastUser", lastUser);
//               const user_id = lastUser.id;
              
//               req.login(user_id, function(err){
//                 addUser = false;
//                 res.redirect("/"); //doesn't works
//                 // res.json({registration: true});
//              });
//             }

//----------------------------------------------------------------

// // tell passport how to serialize the user
// passport.serializeUser(function(user, done) {
// // console.log('Inside serializeUser callback. User is save to the session file store here');
//   done(null, user);
// });
 
// passport.deserializeUser(function(user, done) {
// // console.log('Inside serializeUser callback. User is delete from to the session file store here');

//     done(null, user);
// });


//set port 
app.set('port', (process.env.PORT || 3000));

// tell the server what port to listen on
app.listen(app.get('port'), () => {
  console.log("Example app listening on port ", app.get('port'));
});
