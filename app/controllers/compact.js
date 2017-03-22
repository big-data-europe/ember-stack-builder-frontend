import Ember from 'ember';

export default Ember.Controller.extend({
  searchValue: "",

  actions: {
    editFile: function(id) {
      this.transitionToRoute('editor.edit', id);
    },
    addNewFile: function() {
      this.transitionToRoute('editor.index');
    }
  }
});
