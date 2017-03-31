import Ember from 'ember';
import {
  task,
  timeout
} from 'ember-concurrency';
import env from '../config/environment';
import RSVP from 'rsvp';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  classNames: ['container-manager'],
  containerList: task(function*(term) {
    // if (Ember.isBlank(term)) {
    //   return this.get('model');
    // }

    // Pause here for DEBOUNCE_MS milliseconds. Because this
    // task is `restartable`, if the user starts typing again,
    // the current search will be canceled at this point and
    // start over from the beginning. This is the
    // ember-concurrency way of debouncing a task.
    yield timeout(env.searchDebounceMiliseconds);

    return yield this.filterContainers(term);
  }).on('init').restartable(),

  filterContainers: function(searchValue) {
    var params = {
      sort: 'title'
    };
    if (searchValue) {
      params['filter'] = {
        title: searchValue
      };
    } else {
      params['page'] = {
        size: env.defaultNumberOfContainers,
        number: 0
      };
    }
    var promises = [];
    promises.push(this.get('store').query('container-item', params));
    promises.push(this.get('store').query('container-group', params));

    var results = [];
    return RSVP.all(promises).then((promiseResults) => {
      for (var res of promiseResults) {
        res.forEach((item) => {
          results.push({
            item: item,
            type: res.get('modelName')
          });
        });
      }
      return results;
    });
  },

  actions: {
    addDockerText: function(item) {
      let itemDockerText = item.get('dockerText');
      // this can be either a promise or not, so it's better
      // to always handle it as if it was a promise
      RSVP.Promise.resolve(itemDockerText).then((dockerText) => {
        this.sendAction('addDockerText', dockerText);
      });
    }
  }
});
