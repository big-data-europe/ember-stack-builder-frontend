import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.get('store').findAll('docker-compose').then((dc) => {
      return dc.sortBy('title');
    });
  }
});
