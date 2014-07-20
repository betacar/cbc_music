/**
 * Module dependencies.
 */

var parse = require('co-body');
var recommendations = require('./lib');

/**
 * GET recommendations.
 */

exports.index = function *(){
  var userId = this.params.user;
  if (!userId) this.throw(400, '.user is required');

  try {
    query = recommendations(userId);
  }
  catch (e) {
    this.throw(400, e);
  }

  this.status = 200;
  this.body = query;
};
