var Backbone = require('backbone');
var Patient = require('../../patient');
require('../../lib/gridforms');

var FeatureView = require('./feature');

module.exports = Backbone.View.extend({
  template: require('./template.hbs'),
  events: {
    'click a': 'route'
  },
  featureViews: {},
  initialize: function (options) {
    this.model = new Patient({id: options.args[0]});

    this.listenTo(this.model, 'error', this.error);
    this.listenTo(this.model, 'change', this.render);

    this.model.fetch({
      reset: true,
      headers: {
        Authorization: 'Basic ' + btoa('Admin:admin')
      }
    });
  },
  render: function () {
    console.info('Patient.render', this.model.toJSON(), arguments);

    this.$el.html(this.template({patient: this.model.toJSON()}));

    if (this.model.has('features')) {
      var $features = this.$el.find('.features');
      this.model.get('features').forEach(function (feature) {
        var view;
        if (!this.featureViews.hasOwnProperty(feature.id)) {
          view = new FeatureView({
            model: this.model,
            id: feature.id
          });
          this.featureViews[feature.id] = view;
        }

        $features.append(view.render().$el);
      }.bind(this));
    }

    return this;
  },
  remove: function () {
    // remove children
    for (var viewName in this.featureViews) {
      this.featureViews[viewName].remove();
    }

    // remove this
    this.$el.remove();
    this.stopListening();
    return this;
  },
  route: function (e) {
    var $target = Backbone.$(e.target);
    this.trigger('route', $target.attr('href'), {trigger: true});
    e.preventDefault();
  }
});
