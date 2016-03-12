var Backbone = require('backbone');
var _ = require('lodash');

module.exports = Backbone.View.extend({
  template: require('./feature.hbs'),
  events: {
    'change input': 'change'
  },
  initialize: function (options) {
    this.id = options.id;
    this.listenTo(this.model, 'change:features', this.render);
  },
  render: function () {
    this.feature = this.getFeature();

    console.info('Patient.Feature.render', this.feature);

    this.$el.html(this.template({
      feature: this.feature
    }));

    return this;
  },
  getFeature: function () {
    return _(this.model.get('features'))
    .filter(function (feature) {
      return feature.id === this.id;
    }, this)
    .first();
  },
  change: function (e) {
    var observed = this.$el.find('input[checked]').val();
    var features = this.model.get('features');
    features.forEach(function (feature) {
      if (feature.id === this.id) {
        feature.observed = observed;
      }
    }.bind(this));
    this.model.set('features', _.clone(features));
  }
});
