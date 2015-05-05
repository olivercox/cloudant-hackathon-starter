var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var extend = require('util')._extend;
var secrets = require('../config/secrets.js');
//var mongoose = require('mongoose');
var Cloudant = require('cloudant')(secrets.cloudant.url)

/* User Model
{
  email: { type: String, unique: true, lowercase: true },
  password: String,

  facebook: String,
  twitter: String,
  google: String,
  github: String,
  instagram: String,
  linkedin: String,
  tokens: Array,

  profile: {
    name: { type: String, default: '' },
    gender: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    picture: { type: String, default: '' }
  },

  resetPasswordToken: String,
  resetPasswordExpires: Date
};
*/

function findOne(user, next) {
  var db = Cloudant.use(secrets.db_name);
  db.view('users', 'accounts', { keys: [user], include_docs: true }, function(err, result) {
    if(err) return next(err, null);
    if(result.rows && result.rows.length > 0)
      return next(null, result.rows[0].doc);
    else return next(null, null);
  });
}

function findById(id, next) {
  var db = Cloudant.use(secrets.db_name);
  db.get(id, {}, function(err, doc) {
    if(err) return next(err, null);
    return next(null, doc);
  });
}

/**
 * Save the user.
 */
function save(user, next) {
  var db = Cloudant.use(secrets.db_name);
  db.insert(user, user._id, function(err, doc) {
    if(err) return next(err, null);
    user._id = doc.id;
    return next(null, user);
  });
};

/**
 * Password hash middleware.
 */
function hashPassword(user, next) {
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
};

/**
 * Helper method for validating user's password.
 */
function comparePassword(user, candidatePassword, cb) {
  bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
function gravatar(user, size) {
  if (!size) size = 200;
  if (!user.email) return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
  var md5 = crypto.createHash('md5').update(user.email).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

module.exports.findOne = findOne;
module.exports.findById = findById;
module.exports.save = save;
module.exports.comparePassword = comparePassword;
module.exports.gravatar = gravatar;
