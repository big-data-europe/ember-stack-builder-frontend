import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
import env from '../config/environment';

export default Ember.Route.extend({
  queryParams: {
    searchValue: {
      refreshModel: true
    }
  },

  // this is to have the first debounce at 0, so then it is instant
  debounce: 0,
  //  here we return the task itself, so in the hbs we can see
  // if it's still running or not
  model: function(params) {
    this.get('filterDockerList').perform(params.searchValue);
    return this.get('filterDockerList');
  },

  filterDockerList: task(function*(searchValue) {

    // first we debounce with 0
    // then we will use it from the settings in the environment.js
    yield timeout(this.get('debounce'));
    this.set('debounce', env.searchDebounceMiliseconds);
    var params = {
      sort: 'title'
    };
    if (searchValue.length > 0) {
      params.filter = {
        title: searchValue
      };
    }
    return yield this.get('store').query('docker-compose', params);
  }).restartable(),
});
