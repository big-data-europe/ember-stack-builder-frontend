import Ember from 'ember';
import DockerComposeValidations from '../../validations/docker-compose';

export default Ember.Controller.extend({
  DockerComposeValidations,
  actions: {
    goToCompactView: function() {
      this.transitionToRoute('compact');
    }
  }
});
