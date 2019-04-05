const mongoose = require('mongoose');
// for hash our user's password
const bcrypt = require('bcrypt'); 
const saltRounds = 10; 

// create a schema (describe the fields we have in our form and specify the data it can expect)
let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  login: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordmatch: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    trim: true,
  },
  surname: {
    type: String,
    trim: true,
  },
  forename: {
    type: String,
    trim: true,
  },
  position: {
    type: String,
    trim: true,
  },
  phone: {
    type: Number,
    trim: true,
  }
});

let User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function (newUser, callback){
  // hash our user's password
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
    // store hash in your password DB.
    newUser.password = hash;
    newUser.passwordmatch = hash;
    newUser.save(callback);
    });
  });
};

module.exports.getUserByLogin = function (login, callback) {
  let query = {"login": login};
  console.log('query', query);
  User.findOne(query, callback);
}

module.exports.getUserByEmail = function (email, callback) {
  let query = {"email": email};
  console.log(' getUserByEmail query', query);
  User.findOne(query, callback);
}

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback); //findById mongoose method
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  console.log('candidatePassword',candidatePassword);
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) throw err;
    console.log('isMatch',isMatch);
    callback(null, isMatch);
  });
}


module.exports.updateDate = function (login, callback) {
   let query = {"login": login};

}