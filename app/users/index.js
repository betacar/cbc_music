
/**
 * Module dependencies.
 */

var User  = require('./model');
var parse = require('co-body');

/**
 * GET all users.
 */

exports.index = function *(){
  this.body = User.all();
};

/**
 * POST a new user.
 */

exports.create = function *(id){
  var body = yield parse(this);
  if (!body.id) this.throw(400, '.id required');
  if (User.exists(body.id)) this.throw(400, body.id + ' exists');

  try {
    user = new User(body.id);
    user.save();

    this.status = 201;
  }
  catch (e) {
    this.throw(400, e);
  };
};
