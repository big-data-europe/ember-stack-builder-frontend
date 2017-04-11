import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').createRecord('docker-compose',{
      text: 'version: "2"\n  services:\n    ',
      title: 'New Docker Compose file'
    });
  }
});
