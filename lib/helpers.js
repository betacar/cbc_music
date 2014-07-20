_ = require('underscore');

module.exports = {
  findWhere: function(list, condition) {
    record = _.findWhere(list, condition);
    if (!_.isEmpty(record)) return true;
    return false;
  },

  where: function(list, condition) {
    records = _.where(list, condition);
    if (records.length > 0) return records;
    return [];
  },

  pluck: function(list, attribute) {
    records = _.pluck(list, attribute);
    if (records.length > 0) return records;
    return [];
  }
};
