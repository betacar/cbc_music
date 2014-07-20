var request = require('supertest');
var assert  = require('assert');
var helper  = require('../helper');
var Music   = require('../../app/music/model');

describe('The music model', function() {
  describe('with no saved music', function() {
    before(function() {
      helper.clearMusic();
    });

    it('returns an empty object', function() {
      Music.all().should.eql({});
    });
  });

  it('saves a music track without error', function(){
    var music = new Music('m1', 'jazz,ska');
    music.save();
  });

  it('returns an exception if the id exists', function(){
    (function() {
      var music = new Music('m1', 'jazz,ska');
      music.save();
    }).should.throw(Error('music id a already exists in the database'));
  });

  it('returns the saved music id and array of generes', function() {
    var music = new Music('m2', 'floklore,joropo');
    music.save();
    music.id.should.eql('m2');
    music.generes.should.eql('floklore,joropo');
  });

  it('returns an exception when no parameters is passed', function() {
    (function() {
      new Music();
    }).should.throw(Error('An id and a array of generes are required'));
  });

  it('returns an exception when no ID is passed', function() {
    (function() {
      new Music(undefined, 'rock,metal');
    }).should.throw(Error('An id string must be provided'));
  });

  it('returns an exception when no generes are passed', function() {
    (function() {
      new Music('m5');
    }).should.throw(Error('An array of generes must be provided. ie. ["folk", "funk"]'));
  });

  it('returns true if a music exists', function() {
    var music = new Music('m3', 'electronic,house');
    music.save();
    Music.exists('m3').should.be.true;
  });

  it('returns false if a music does not exists', function() {
    Music.exists('m9').should.be.false;
  });

  it('lists all music tracks', function() {
    expected = {
      m1: ['jazz', 'ska'],
      m2: ['floklore', 'joropo'],
      m3: ['electronic', 'house']
    };
    Music.all().should.eql(expected);
  });

  after(function() {
    helper.clearMusic();
  });
});
