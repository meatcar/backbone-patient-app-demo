var Backbone = require('backbone');

var views = require('./views');
var Patient = require('./patient');
var Patients = require('./patients');

var Router = Backbone.Router.extend({
  routes: {
    patients: 'patients',
    'patients/:id': 'patient',
    '': 'index'
  },

  goto: function (view) {
    if (this.view) {
      this.stopListening(this.view);
      this.view.remove();
    }

    this.listenTo(view, 'route', this.navigate);
    this.view = view;
  },

  index: function () {
    this.goto(new views.index());
  },

  patients: function () {
    this.goto(new views.patients({
      collection: new Patients()
    }));
  },

  patient: function (id) {
    this.goto(new views.patient({
      model: new Patient({id: id})
    }));
  }
});

module.exports = Router;
