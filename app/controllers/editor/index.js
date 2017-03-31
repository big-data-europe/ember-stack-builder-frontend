import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    goToCompactView: function() {
      this.transitionToRoute('compact');
    },
    addDockerText: function(text) {
      var dockerText = this.get('model.text');
      if (!dockerText) {
        dockerText = "";
      }
      dockerText += "\n" + text;
      this.set('model.text', dockerText);
      return false;
    }
  }
});
