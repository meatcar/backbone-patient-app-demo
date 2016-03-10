var Backbone = require('backbone');
require('../../lib/gridforms');

module.exports = Backbone.View.extend({
  el: 'body',
  template: require('./template.hbs'),
  events: {
    'click a': 'route'
  },
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'error', this.error);
    this.model.fetch({
      reset: true,
      headers: {
        Authorization: 'Basic ' + btoa('Admin:admin')
      }
    });
  },
  render: function () {
    console.log('Patient.render', this.model.toJSON());
    this.$el.html(this.template({patient: this.model.toJSON()}));
    return this;
  },
  route: function (e) {
    var $target = Backbone.$(e.target);
    this.trigger('route', $target.attr('href'), {trigger: true});
    e.preventDefault();
  }
});
