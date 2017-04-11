import Ember from 'ember';
import DockerComposeValidations from '../../validations/docker-compose';

export default Ember.Controller.extend({
  DockerComposeValidations,
  goToCompactView: function() {
    this.transitionToRoute('compact');
  },
  actions: {
    goToCompactView: function() {
      this.goToCompactView();
    },
    delete: function() {
      this.set('showDialog', false);
      this.get('model').destroyRecord().then(() => {
        this.goToCompactView();
      });
    }
  }
});
