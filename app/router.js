var Backbone = require('backbone');

var Router = Backbone.Router.extend({
  routes: {
    patients: 'patients',
    'patients/:id': 'patient',
    home: 'home',
    '': 'home'
  }
});

module.exports = Router;
