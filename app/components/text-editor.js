import Ember from 'ember';
import ResizeTextareaMixin from '../mixins/resize-textarea';
import RSVP from 'rsvp';
import FileSaver from 'ember-cli-file-saver/mixins/file-saver';

export default Ember.Component.extend(ResizeTextareaMixin, FileSaver, {
  allowDelete: false,
  allowDownload: false,
  showDialog: false,
  classNames: ['text-editor'],

  // We need this in case we drag'n'drop dockerText to the text of our dockerfile
  // the size of the textarea should be recalculated
  textAreaObserver: Ember.observer('model.text', function() {
    this.recalculateTextareaSize();
  }),

  actions: {
    download: function() {
      let url = "/stack-builder-backend/" + this.get('model.id');
      Ember.$.get(url,
        (content) => this.saveFileAs("docker-compose.yml", content, "application/x-yaml"));
      return false;
    },
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
    },
    addDockerText: function(item) {
      let itemDockerText = item.get('dockerText');
      // this can be either a promise or not, so it's better
      // to always handle it as if it was a promise
      RSVP.Promise.resolve(itemDockerText).then((dockerText) => {
        this.sendAction('addDockerText', dockerText);
      });
    }
  }
});
