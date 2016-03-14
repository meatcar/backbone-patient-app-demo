var Backbone = require('backbone');
var Patient = require('../../patient');
require('../../lib/gridforms');
var $ = require('jquery');
var _ = require('lodash');

var FeatureView = require('./feature');


/**
 * Render a single patient, make it editable.
 */
module.exports = Backbone.View.extend({
  template: require('./template.hbs'),

  events: {
    'click a.save': 'save',
    'change input': 'inputChange'
  },

  /* the child Feature views, the key is the feature id */
  featureViews: {},

  initialize: function (options) {
    this.model = new Patient({id: options.args[0]});

    this.listenTo(this.model, 'error', this.error);
    this.listenTo(this.model, 'change', this.render);

    this.model.fetch({
      reset: true, // make sure we get a fresh patient
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
        } else {
          view = this.featureViews[feature.id];
        }

        $features.append(view.render().$el);
      }.bind(this));
    }

    return this;
  },

  /* override Backbone's implementation so we can remove thie child views */
  remove: function () {
    for (var viewName in this.featureViews) {
      this.featureViews[viewName].remove();
    }

    // call super
    Backbone.View.prototype.remove.apply(this, arguments);
    return this;
  },

  /* bubble link clicks up */
  route: function (e) {
    var $target = Backbone.$(e.target);
    this.trigger('route', $target.attr('href'), {trigger: true});
    e.preventDefault();
  },

  /* save the patient */
  save: function (e) {
    this.model.save(undefined, {headers: {Authorization: 'Basic ' + btoa('Admin:admin')}});
    e.preventDefault();
    return false;
  },

  /* update the model when the input changes */
  inputChange: function (e) {
    var $target = $(e.target);
    var fieldName = $target.attr('name');

    if (fieldName.match(/first|last/)) {
      // name is a nested object, special case
      var name = this.model.get('patient_name');
      name[fieldName] = $target.val();

      this.model.set('patient_name', _.clone(name));
    } else {
      this.model.set(fieldName, $target.val());
    }
  }
});
