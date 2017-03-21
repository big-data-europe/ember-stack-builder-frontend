import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';


const DEBOUNCE_MS = 250;
export default Ember.Controller.extend({

  dockerList: task(function*(term) {
    if (Ember.isBlank(term)) {
      return this.get('model');
    }

    // Pause here for DEBOUNCE_MS milliseconds. Because this
    // task is `restartable`, if the user starts typing again,
    // the current search will be canceled at this point and
    // start over from the beginning. This is the
    // ember-concurrency way of debouncing a task.
    yield timeout(DEBOUNCE_MS);

    return yield this.filterDockerList(term);
  }).on('init').restartable(),

  filterDockerList: function(searchValue) {
    var params = {
      sort: 'title',
      filter: {
        title: searchValue
      }
    };
    return this.get('store').query('docker-compose', params);
  },

  actions: {
    addNewFile: function() {
      console.log("new");
    }
  }
});
