import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    var params = {
      sort: 'title'
    };
    return this.get('store').query('docker-compose', params);
  }
});
