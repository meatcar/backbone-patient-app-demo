require('./sass/main.scss');

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var Router = require('./router');
var AppPage = require('./pages/app');

// initialize app, router
var app = new AppPage();
var router = new Router();

// wire together the app and the router.

// router matches a new URL =>  grab the route and pass it to app.goto
app.listenTo(router, 'route', app.goto);

// app bubbles up a new 'route' event => navigate to it, store it in history
router.listenTo(app, 'route', router.navigate);

// debug
app.on('route', function (route, args) {
  console.info('app:route', route, args);
});

router.on('route', function (route, args) {
  console.info('route', route, args);
});


// start history, the router will start matching URLs and cause a render
Backbone.history.start();

