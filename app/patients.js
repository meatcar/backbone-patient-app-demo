var Backbone = require('backbone');

var Patient = require('./patient');

var Patients = Backbone.Collection.extend({
  url: '//localhost:8090/rest/patients',
  model: Patient,
  parse: function (response) {
    // patients are nested in the response
    return response.patientSummaries;
  }
});

module.exports = Patients;
