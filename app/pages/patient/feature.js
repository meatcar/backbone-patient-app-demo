var Backbone = require('backbone');
var _ = require('lodash');
var $ = require('jquery');

/**
 * Render a single patient feature
 */
module.exports = Backbone.View.extend({
  template: require('./feature.hbs'),

  events: {
    'click input': 'click'
  },

  initialize: function (options) {
    this.id = options.id;
  },

  render: function () {
    this.feature = this.getFeature();

    console.info('Patient.Feature.render', this.feature);

    // unbind events on re-render
    this.undelegateEvents();
    this.$el.html(this.template({
      feature: this.feature
    }));
    // rebind events on re-render.
    this.delegateEvents();

    return this;
  },

  /* filter the features for the feature we're responsible for */
  getFeature: function () {
    return _(this.model.get('features'))
    .filter(function (feature) {
      return feature.id === this.id;
    }, this)
    .first();
  },

  click: function (e) {
    this.feature.observed = $(e.target).val();

    // hack to trigger an event, since the features array is unchanged
    var features = this.model.get('features');
    this.model.unset('features', {silent: true});
    this.model.set('features', features);
  }
});
