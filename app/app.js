var Backbone = require('backbone');

if (Backbone) {
  console.log('Loaded!');
}

var IndexView = Backbone.View.extend({
  el: 'body',
  template: require('./templates/index.hbs'),
  render: function () {
    this.$el.html(this.template());
    return this;
  }
});

var view = new IndexView();
view.render();
