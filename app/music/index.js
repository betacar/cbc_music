
/**
 * Module dependencies.
 */

var Music = require('./model');
var parse = require('co-body');

/**
 * POST a new music tracks.
 */

exports.create = function *(id, generes){
  var body = yield parse(this);
  if (!body.id) this.throw(400, '.id is required');
  if (!body.generes) this.throw(400, '.generes are required');

  try {
    music = new Music(body.id, body.generes);
    music.save();

    this.status = 201;
  }
  catch (e) {
    this.throw(400, e);
  };
};
