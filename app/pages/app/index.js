
var Backbone = require('backbone');
var pages = require('../');

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
    this.view = new pages[viewName]({args: args});
    this.listenTo(this.view, 'route', this.route);
    this.render();
  },
  addBreadcrumb: function (crumb) {
    var index = this.breadcrumbs.indexOf(crumb);
    if (index < 0) {
      this.breadcrumbs.push(crumb);
    } else if (index < (this.breadcrumbs.length - 1)) {
      this.breadcrumbs = this.breadcrumbs.slice(0, index + 1);
    }
  },
  click: function (e) {
    var $target = Backbone.$(e.target);
    this.trigger('route', $target.attr('href'), {trigger: true});
    e.preventDefault();
  },
  route: function (route, args) {
    this.trigger('route', route, args);
  }
});
