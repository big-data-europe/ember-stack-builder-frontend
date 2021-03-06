import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this._super(...arguments);
    this.moveLabel();
  },

  moveLabel() {
    // make sure the label moves when a value is bound.
    const $label = Ember.$('#textarea-label-' + this.get('label'));

    if (Ember.isPresent(this.get('value')) && !$label.hasClass('active')) {
      $label.addClass('active');
    }
  },
  textAreaObserver: Ember.observer('value', function() {
    if (this.get('type') === "textarea") {
      this.moveLabel();
    }
  })
});
