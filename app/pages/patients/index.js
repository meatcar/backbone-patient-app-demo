var Backbone = require('backbone');

var Patients = require('../../patients');

module.exports = Backbone.View.extend({
  template: require('./template.hbs'),
  events: {
    'click a': 'route'
  },
  initialize: function () {
    this.collection = new Patients();

    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'error', this.error);

    this.collection.fetch({
      reset: true,
      headers: {
        Authorization: 'Basic ' + btoa('Admin:admin')
      }
    });
  },
  render: function () {
    console.log('Patients.render', this.collection.toJSON());
    this.$el.html(this.template({patients: this.collection.toJSON()}));
    return this;
  },
  error: function (collection, xhr, error) {
    console.error('xhr.error', error);
  },
  route: function (e) {
    var $target = Backbone.$(e.target);
    this.trigger('route', $target.attr('href'), {trigger: true});
    e.preventDefault();
  }

});
