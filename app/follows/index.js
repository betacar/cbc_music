
/**
 * Module dependencies.
 */

var Follow = require('./model');
var parse  = require('co-body');

/**
 * POST follow.
 */

exports.follow = function *(from, to){
  var body = yield parse(this);
  if (!body.from || !body.to) this.throw(400, '.from and .to are required');

  try {
    follow = new Follow(body.from, body.to);
    follow.save()
  }
  catch (e) {
    this.throw(400, e);
  }

  this.status = 201;
};
