/**
 * Music model.
 */

function Music (id, generes) {
  if (!id && !generes) throw new Error('An id and a array of generes are required');
  if (!id) throw new Error('An id must be provided');
  if (!generes) throw new Error('Generes must be provided. ie. "folk,funk"]');
  this.id      = id;
  this.generes = generes;

  return this;
};

/**
 * Class methods.
 */

Music.all = function() {
  return DB.music;
};

Music.exists = function(id) {
  return (id in DB.music);
};

/**
 * Instance methods.
 */

Music.prototype.save = function() {
  if (Music.exists(this.id)) throw new Error('music id ' + this.id + ' already exists in the database');
  DB.music[this.id] = this.generes.split(',');
  return { id: this.id, generes: DB.music[this.id] };
};

module.exports = Music;
