import Ember from 'ember';

export default Ember.Component.extend({
  allowDelete: false,
  actions: {
    save: function() {
      this.get('model').save();
      this.sendAction('goToCompactView')
    },
    cancel: function() {
      // this removes the created model, if it doesn't exists
      this.get('model').rollbackAttributes();
      this.sendAction('goToCompactView');
    },
    delete: function() {

    }
  }
});
