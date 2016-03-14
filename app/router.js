var Backbone = require('backbone');

/** Map URLs to page names */
var Router = Backbone.Router.extend({
  routes: {
    patients: 'patients',
    'patients/:id': 'patient',
    home: 'home',
    '': 'home'
  }
});

module.exports = Router;
