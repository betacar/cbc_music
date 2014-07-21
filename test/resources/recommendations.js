
var request = require('supertest');
var api = require('../..');
var helper = require('../helper');

describe('GET /recommendations', function() {
  after(function () {
    return helper.clearAll();
  });

  describe('with no saved data', function() {
    before(function() {
      return helper.clearAll();
    });

    it('returns 400', function(done){
      var app = api();

      request(app.listen())
      .get('/recommendations/a')
      .expect(400)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
    });

    describe('with a user param undefined', function() {
      it('returns 404', function(done) {
        var app = api();

        request(app.listen())
        .get('/recommendations/')
        .expect(404)
        .end(function(err, res){
          if (err) return done(err);
          done();
        });
      });
    });
  });

  describe('with saved data', function() {
    before(function() {
      return helper.loadAll();
    });

    describe('with a user param undefined', function() {
      it('returns 404', function(done) {
        var app = api();

        request(app.listen())
        .get('/recommendations/')
        .expect(404)
        .end(function(err, res){
          if (err) return done(err);
          done();
        });
      });
    });

    describe('with a unexisting user', function() {
      it('returns 400', function(done) {
        var app = api();

        request(app.listen())
        .get('/recommendations/betacar')
        .expect(400)
        .end(function(err, res){
          if (err) return done(err);
          done();
        });
      });
    });

    it('returns 200', function(done) {
      var app = api();

      request(app.listen())
      .get('/recommendations/a')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);

        res.body.should.be.ok;
        res.body.should.be.an.Object;
        res.body.list.should.be.an.Array;
        res.body.list.should.have.length(5);
        res.body.list.map(function(music) {
          music.should.be.a.String;
        });

        done();
      });
    });
  });
});
