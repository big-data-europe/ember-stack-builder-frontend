import Ember from 'ember';

// this mixin is for resizing the textareas depending on the size of text inside the textarea
export default Ember.Mixin.create({
  didInsertElement: function() {
    this._super();
    this.recalculateTextareaSize();
  },

  recalculateTextareaSize: function() {
    Ember.run.later(function() {
      Ember.$.each(Ember.$('textarea'), function() {
        // this sets the 'rows' attribute depending on the text length inside the text area
        var text = Ember.$('textarea').val(),
          // look for any "\n" occurences
          matches = text.match(/\n/g),
          breaks = matches ? matches.length : 2;
        if (text) {
          Ember.$('textarea').attr('rows', breaks);
          var offset = this.offsetHeight - this.clientHeight;
          Ember.$(this).css('height', 'auto').css('height', this.scrollHeight + offset);
        }
      });
      Ember.$.each(Ember.$('textarea'), function() {
        // this resizes the height of the textarea
        // and removes the rows attribute, because it is only needed on init
        var offset = this.offsetHeight - this.clientHeight;
        var resizeTextarea = function(el) {
          Ember.$(el).css('height', 'auto').css('height', el.scrollHeight + offset);
        };
        Ember.$(this).on('keyup input', function() {
          resizeTextarea(this);
        });
      });
    });
  }
});
