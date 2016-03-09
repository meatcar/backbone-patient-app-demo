require('./sass/main.scss');
require('./lib/gridforms');
var Backbone = require('backbone');

if (Backbone) {
  console.log('Loaded!');
}

var IndexView = Backbone.View.extend({
  el: 'body',
  template: require('./templates/index.hbs'),
  render: function () {
    this.$el.replaceWith($(this.template()));
    return this;
  }
});

var PatientForm = Backbone.View.extend({
  template: require('./templates/patientform.hbs'),
  render: function () {
    this.$el.html(this.template());
    return this;
  }
});

var view = new IndexView();
view.render();
