import Ember from 'ember';

export default Ember.Controller.extend({
  searchValue: "",

  actions: {
    addNewFile: function() {
      console.log("new");
    }
  }
});
