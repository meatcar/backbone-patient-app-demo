require('./sass/main.scss');

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var Router = require('./router');
var AppPage = require('./pages/app');

var app = new AppPage();
var router = new Router();

app.listenTo(router, 'route', app.goto);
router.listenTo(app, 'route', router.navigate);

// debug
app.on('route', function (route, args) {
  console.info('app:route', route, args);
});
router.on('route', function (route, args) {
  console.info('route', route, args);
});

Backbone.history.start();

