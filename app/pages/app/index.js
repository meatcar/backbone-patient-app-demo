var Backbone = require('backbone');
var pages = require('../');

/**
 * The main App View. Displays a breadcrumb and the view for whatever
 * page we're on
 */
module.exports = Backbone.View.extend({
  el: '.app',
  template: require('./template.hbs'),

  breadcrumbs: [],

  events: {
    'click a': 'click'
  },

  initialize: function (options) {
    if (options && options.view) {
      this.goto(options.view);
    }
  },

  render: function () {
    this.$el.html(this.template({
      breadcrumbs: this.breadcrumbs
    }));
    this.$el.find('.main').html(this.view.render().$el);
    return this;
  },

  /* replace the current child view */
  goto: function (viewName, args) {
    if (!pages.hasOwnProperty(viewName)) {
      console.error('no such view', viewName);
      return;
    }

    if (this.view) {
      this.stopListening(this.view);
      this.view.remove();
    }

    this.addBreadcrumb(viewName);

    // this is the hack that ties route names in router.js to views as defined
    // in pages/index.js
    this.view = new pages[viewName]({args: args});

    this.listenTo(this.view, 'route', this.route);
    this.render();
  },

  /* add a new breadcrumb */
  addBreadcrumb: function (crumb) {
    var index = this.breadcrumbs.indexOf(crumb);
    if (index < 0) {
      this.breadcrumbs.push(crumb);
    } else if (index < (this.breadcrumbs.length - 1)) {
      this.breadcrumbs = this.breadcrumbs.slice(0, index + 1);
    }
  },

  /* respond to breadcrumb click */
  click: function (e) {
    var $target = Backbone.$(e.target);
    this.trigger('route', $target.attr('href'), {trigger: true});
    e.preventDefault();
  },

  /* bubble up the route event from child views */
  route: function (route, args) {
    this.trigger('route', route, args);
  }
});
