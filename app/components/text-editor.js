import Ember from 'ember';

export default Ember.Component.extend({
  allowDelete: false,
  showDialog: false,
  classNames: ['text-editor'],
  actions: {
    save: function() {
      this.get('model').save();
      this.sendAction('goToCompactView');
    },
    cancel: function() {
      // this removes the created model, if it doesn't exists
      this.get('model').rollbackAttributes();
      this.sendAction('goToCompactView');
    },
    showDeleteDialog: function() {
      this.set('showDialog', true);
      return false;
    },
    closeDialog: function() {
      this.set('showDialog', false);
      return false;
    },
    delete: function() {
      this.set('showDialog', false);
      this.get('model').destroyRecord().then(() => {
        this.sendAction('goToCompactView');
      });
    }
  }
});
