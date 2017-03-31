import Ember from 'ember';
import ResizeTextareaMixin from '../mixins/resize-textarea';

export default Ember.Component.extend(ResizeTextareaMixin, {
  allowDelete: false,
  showDialog: false,
  classNames: ['text-editor'],

  // We need this in case we drag'n'drop dockerText to the text of our dockerfile
  // the size of the textarea should be recalculated
  textAreaObserver: Ember.observer('model.text', function() {
    this.recalculateTextareaSize();
  }),

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
