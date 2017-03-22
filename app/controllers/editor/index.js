import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    goToCompactView: function() {
      this.transitionToRoute('compact');
    }
  }
});
