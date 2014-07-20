
/**
 * Module dependencies.
 */

var Listen = require('./model');
var parse  = require('co-body');

/**
 * POST listen.
 */

exports.create = function *(user, music){
  var body = yield parse(this);
  if (!body.user) this.throw(400, '.user is required');
  if (!body.music) this.throw(400, '.music is required');

  try {
    listen = new Listen(body.user, body.music);
    listen.save();

    this.status = 201;
  }
  catch (e) {
    this.throw(400, e);
  };
};
