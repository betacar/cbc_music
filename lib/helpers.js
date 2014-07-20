var _ = require('underscore');

module.exports = {
  findWhere: function(list, condition) {
    var record = _.findWhere(list, condition);
    if (!_.isEmpty(record)) return true;
    return false;
  },

  where: function(list, condition) {
    var records = _.where(list, condition);
    if (records.length > 0) return records;
    return [];
  },

  pluck: function(list, attribute) {
    var records = _.pluck(list, attribute);
    if (records.length > 0) return records;
    return [];
  }
};
