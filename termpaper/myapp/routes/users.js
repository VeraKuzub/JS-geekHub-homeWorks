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

function ensureAuthenticated(req, res, next){
	if (req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg', 'Нужно залогиниться');
		res.redirect('/users/login');
	}
}
//---------------------------------------------------------------------------
const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//validate data
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const User = require('../models/user');

//profile page
router.get('/profile', ensureAuthenticated, function(req, res){
	console.log('profile',req);
	res.render('profile', {
		login:req.user.login
	});
});

//login page
router.get('/login', function(req, res){
	res.render('login');
});

//register page
router.get('/register', function(req, res){
	res.render('register');
});

//register logout
router.get('/logout', function(req, res){
	//logout() remove the req.user property and clear the login session
	req.logout();
	req.flash('success_msg', 'Вы вышли из системы');
	res.redirect('/users/login');
});

//register User
router.post('/register', [
    body('userEmail')
      .isEmail(),
    body('userLogin')
      .not().isEmpty()
      .trim()
      .escape()
      .isLength({ min: 3, max: 10}),
    body('userPassword')
      .not().isEmpty()
      .trim()
      .escape()
      .isLength({ min: 5 }),
      body('userPasswordMatch')
      .not().isEmpty()
      .trim()
      .escape()
      .isLength({ min: 5 }),
    sanitizeBody('notifyOnReply').toBoolean()
  ],
  function(req, res, next){
    if(!req.body) return res.sendStatus(400);
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  let equal = checkEquals(req.body.userPassword, req.body.userPasswordMatch); 
    if (!errors.isEmpty()) {
      console.log('equal', equal);
      console.log('error', JSON.stringify({ errors: errors.array()}));
      // return res.status(422).json({ errors: errors.array() });
      return res.json({registration: false, text: "Ошибка ввода данных"});
    } else if (!equal) {
      return res.json({registration: false, text: "Введенный пароль не совпадает"});
    } else {
    //create user for db, use Mongoose
	let login = req.body.userLogin;
	let password = req.body.userPassword;
	let email = req.body.userEmail;
	let passwordmatch = req.body.userPasswordMatch;
	
	let newUser = new User ({
		"login": login,
		"password": password,
		"email": email,
		"passwordmatch": passwordmatch
	})
	User.getUserByLogin(login, function(err, user){
		if (err) throw err;
		if (!user) {
			User.createUser(newUser, function(err, user){
			if (err) throw err;
				console.log('createUser', user);
			});
			req.flash('success_msg', 'Вы зарегистрированы и можете войти');
			res.redirect('/users/login');
		} else {
			req.flash('error_msg', 'Пользователь с таким именем уже существует');
			res.redirect('/users/register');
		}
	});
    }
});

passport.use(new LocalStrategy({
	usernameField: 'userLogin', 
    passwordField: 'userPassword'
},
  function(username, password, done) {
  	User.getUserByLogin(username, function(err, user){
  		if (err) return done(err);
  		if(!user) {
  			return done(null, false, {message: 'Неизвестный пользователь'});
  		}
  		User.comparePassword(password, user.password, function(err, isMatch){
  			if (err) return done(err);
  			if (isMatch) {
  				return done(null, user);
  			} else {
  				return done(null, false, {message: 'Неправильный пароль'});
  			}
  		});
  	});
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {
  	successRedirect: '/users/profile',
  	failureRedirect:'/users/login',
  	failureFlash: true 
  }),
  function(req, res) {
    res.redirect('users/profile');
  });

module.exports = router;