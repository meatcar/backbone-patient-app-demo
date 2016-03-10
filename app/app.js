require('./sass/main.scss');

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var Router = require('./router');

var router = new Router();

router.on('route', function (route, args) {
  console.info('route', route, args);
});

Backbone.history.start();

