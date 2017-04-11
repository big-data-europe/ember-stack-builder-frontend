import Ember from 'ember';

export default Ember.Component.extend({
  allowDelete: false,
  allowDownload: false,
  showDialog: false,
  newFile: false,
  classNames: ['text-editor'],

  actions: {
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
      this.sendAction('delete');
    },
    goToCompactView: function() {
      this.sendAction('goToCompactView');
    }
  }
});
