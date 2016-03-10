var Backbone = require('backbone');

var Patient = Backbone.Model.extend({
  urlRoot: '//localhost:8090/rest/patients'
});

module.exports = Patient;
