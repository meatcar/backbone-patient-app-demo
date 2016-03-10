var Backbone = require('backbone');

var Patient = require('./patient');

var Patients = Backbone.Collection.extend({
  url: 'http://localhost:8090/rest/patients',
  model: Patient,
  parse: function (response) {
    console.log('patients.parse', response);
    return response.patientSummaries;
  }
});

module.exports = Patients;
