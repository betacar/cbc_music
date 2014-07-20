var supertest = require('supertest');
var music     = require('../test/stub/music.json');
var async     = require('async');

module.exports = function(host, port) {
  var request = supertest('http://' + host + ':' + port);
  var trackNumber = 1;
  // Loads the music tracks
  async.each(music, function(track, cb) {
    request
            .post('/music')
            .send({id: track.id, generes: track.generes})
            .expect(201)
            .end(function(err, res) {
              if (err) return cb(err);
              trackNumber++;

              if (music.length === trackNumber) return cb();
            });
  }, function(err) {
    if (err) throw new Error(err);
    return music;
  });
};
