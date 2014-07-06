_ = require('underscore');

module.exports = {
  findWhere: function(list, condition) {
    record = _.findWhere(list, condition);
    if (!_.isEmpty(record)) return true;
    return false;
  }
};
