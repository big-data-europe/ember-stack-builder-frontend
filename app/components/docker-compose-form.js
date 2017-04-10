import Ember from 'ember';
import ResizeTextareaMixin from '../mixins/resize-textarea';
import FileSaver from 'ember-cli-file-saver/mixins/file-saver';
import RSVP from 'rsvp';

export default Ember.Component.extend(ResizeTextareaMixin, FileSaver, {
  // We need this in case we drag'n'drop dockerText to the text of our dockerfile
  // the size of the textarea should be recalculated
  textAreaObserver: Ember.observer('changeset.text', function() {
    this.recalculateTextareaSize();
  }),

  disabledButton: Ember.computed('changeset.changes', 'changeset.changes.[]', function() {
    return this.get('changeset.changes.length') == 0;
  }),

  actions: {
    addDockerText: function(item) {
      RSVP.Promise.resolve(item.get('dockerText')).then((itemDockerText) => {
        var dockerText = this.get('changeset.text');
        if (!dockerText) {
          dockerText = "";
        }
        dockerText += "\n" + itemDockerText;
        this.set('changeset.text', dockerText);
        return false;
      });
      // this.sendAction('addDockerText', item);
    },
    showDeleteDialog: function() {
      this.sendAction('showDeleteDialog');
    },
    cancel: function() {
      this.get('changeset').rollback();
      return false;
    },
    save: function() {
      this.get('changeset').save();
      return false;
    },
    download: function() {
      let url = "/stack-builder-backend/" + this.get('changeset.id');
      Ember.$.get(url,
        (content) => this.saveFileAs("docker-compose.yml", content, "application/x-yaml"));
      return false;
    }
  }
});
