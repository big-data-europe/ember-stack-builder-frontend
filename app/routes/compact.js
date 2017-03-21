import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Route.extend({
  queryParams: {
    searchValue: {
      refreshModel: true
    }
  },

  model: function(params) {
    return this.get('filterDockerList').perform(params.searchValue);
  },

  filterDockerList: task(function*(searchValue) {
    var params = {
      sort: 'title'
    };
    if (searchValue.length > 0) {
      params.filter = {
        title: searchValue
      };
    }
    return this.get('store').query('docker-compose', params);
  }).restartable(),
});
