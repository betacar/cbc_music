var request = require('supertest');
var api = require('../..');
var helper = require('../helper');

describe('POST /music', function() {
  after(function () {
    helper.clearMusic();
  });

  describe('with no parameters', function() {
    it('returns 400', function(done) {
      var app = api();

      request(app.listen())
      .post('/music')
      .send({})
      .expect(400)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
    });
  });

  describe('with undefined id', function() {
    it('returns 400', function(done) {
      var app = api();

      request(app.listen())
      .post('/music')
      .send({id: ''})
      .expect(400)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
    });
  });

  describe('with undefined generes', function() {
    it('returns 400', function(done) {
      var app = api();

      request(app.listen())
      .post('/music')
      .send({id: 'm1', generes: ''})
      .expect(400)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
    });
  });

  describe('with parameters', function() {
    it('returns 201', function(done) {
      var app = api();

      request(app.listen())
      .post('/music')
      .expect(201)
      .send({id: 'm1', generes: 'jazz,ska'})
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
    });

    describe('with a duplicated id', function() {
      it('returns 400', function(done) {
        var app = api();

        request(app.listen())
        .post('/music')
        .send({id: 'm1', generes: 'jazz,ska'})
        .expect(400)
        .end(function(err, res){
          if (err) return done(err);
          done();
        });
      });
    });
  });
});
