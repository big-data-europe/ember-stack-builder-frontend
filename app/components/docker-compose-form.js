import Ember from 'ember';
import ResizeTextareaMixin from '../mixins/resize-textarea';
import FileSaver from 'ember-cli-file-saver/mixins/file-saver';
import RSVP from 'rsvp';
import DockerFileParser from '../mixins/docker-file-parser';

export default Ember.Component.extend(ResizeTextareaMixin, FileSaver, DockerFileParser, {
  // We need this in case we drag'n'drop dockerText to the text of our dockerfile
  // the size of the textarea should be recalculated
  setupTextAreaTab(evt) {
    let that, end, start;
    if (evt.keyCode === 9) {
      start = this.selectionStart;
      end = this.selectionEnd;
      that = $(this);
      that.val(that.val().substring(0, start) + "\t" + that.val().substring(end));
      this.selectionStart = this.selectionEnd = start + 1;
      return false;
    }
  },

  // Every jQuery event needs to be wrapped inside the ember run loop
  didInsertElement() {

    $('#textarea-autocomplete').on('keydown', this.setupTextAreaTab);

    Ember.run.scheduleOnce('afterRender', this, function() {
      // This is necessary because the addition of this addon resets scroll
      Ember.$('#textarea-autocomplete').height(Ember.$('#textarea-autocomplete').prop('scrollHeight'));

      let that = this;

      Ember.$('#textarea-autocomplete').textcomplete([{
        match: /(^|\b)(\w{2,})$/,
        search: function(term, callback) {
          callback(that.get('drcServiceNames').filter(function(service) {
            return service.includes(term);
          }));
        },
        replace: function(word) {
          return word;
        }
      }]);
    });

    try {
      var yaml = this.yamlParser(this.get('changeset.text'));
      var services = this.serviceNameFilter(yaml);
      this.set('oldServices', services);
    } catch (err) {
      this.set('oldServices', []);
    }
  },

  oldServices: [],
  drcServiceNames: Ember.computed('changeset.text', function() {
    try {
      var yaml = this.yamlParser(this.get('changeset.text'));
      var services = this.serviceNameFilter(yaml);
      this.set('oldServices', services);
      return services;
    } catch (err) {
      console.log(err);
      return this.get('oldServices');
    }
  }),

  textAreaObserver: Ember.observer('changeset.text', function() {
    this.recalculateTextareaSize();
  }),

  disabledSaveButton: Ember.computed('changeset.changes', 'changeset.changes.[]', 'changeset.errors', 'changeset.errors.[]', 'newFile', function() {
    if (this.get('newFile') === true) {
      return false;
    }
    return this.get('changeset.errors.length') > 0 || this.get('changeset.changes.length') === 0;
  }),
  disabledCancelButton: Ember.computed('changeset.changes', 'changeset.changes.[]', 'changeset.errors', 'changeset.errors.[]', 'newFile', function() {
    if (this.get('changeset.errors.length') > 0) {
      return false;
    }
    return this.get('newFile') === false && this.get('changeset.changes.length') === 0;
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
      if (this.get('newFile')) {
        this.sendAction('goToCompactView');
        return true;
      }
      return false;
    },
    save: function() {
      this.get('changeset').save();
      this.set('newFile', false);
      this.set('allowDownload', true);
      this.set('allowDelete', true);
      return false;
    },
    download: function() {
      this.get('changeset').save().then(() => {
        let url = "/stack-builder-backend/" + this.get('changeset.id');
        Ember.$.get(url,
          (content) => this.saveFileAs("docker-compose.yml", content, "application/x-yaml"));
      });
      return false;
    }
  }
});
