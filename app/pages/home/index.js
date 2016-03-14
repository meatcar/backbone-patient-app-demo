var Backbone = require('backbone');

/**
 * The homepage.
 */
module.exports = Backbone.View.extend({
  template: require('./template.hbs'),

  events: {
    'click a': 'route'
  },

  initialize: function () {
    this.render();
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  route: function (e) {
    var $target = Backbone.$(e.target);
    this.trigger('route', $target.attr('href'), {trigger: true});
    e.preventDefault();
  }
});
