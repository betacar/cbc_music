
var request = require('supertest');
var api = require('../..');
var helper = require('../helper');

describe('/users', function(){
  describe('POST', function() {
    describe('with no id', function() {
      it('returns 400', function(done) {
        var app = api();

        request(app.listen())
        .post('/users')
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
        .post('/users')
        .send({id: ''})
        .expect(400)
        .end(function(err, res){
          if (err) return done(err);
          done();
        });
      });
    });

    describe('with id', function() {
      it('returns 201', function(done) {
        var app = api();

        request(app.listen())
        .post('/users')
        .expect(201)
        .send({id: 'a'})
        .end(function(err, res){
          if (err) return done(err);
          done();
        });
      });

      describe('with a duplicated id', function() {
        it('returns 400', function(done) {
          var app = api();

          request(app.listen())
          .post('/users/')
          .send({id: 'a'})
          .expect(400)
          .end(function(err, res){
            if (err) return done(err);
            done();
          });
        });
      });
    });
  });

  describe('GET', function() {

    describe('with saved user', function() {
      it('returns 200', function(done){
        var app = api();

        request(app.listen())
        .get('/users')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done();
        });
      });
    });

    describe('with no saved user', function() {
      before(function() {
        helper.clearUsers();
      });

      it('returns 200', function(done) {
        var app = api();

        request(app.listen())
        .get('/users')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done();
        });
      });
    });
  });

  after(function () {
    helper.clearUsers();
  });
});
