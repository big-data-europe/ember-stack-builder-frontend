import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';


const DEBOUNCE_MS = 250;
export default Ember.Controller.extend({
  searchValue: "",

  dockerList: task(function*(term) {
    if (Ember.isBlank(term)) {
      this.set('searchValue', "");
      return;
    }

    // Pause here for DEBOUNCE_MS milliseconds. Because this
    // task is `restartable`, if the user starts typing again,
    // the current search will be canceled at this point and
    // start over from the beginning. This is the
    // ember-concurrency way of debouncing a task.
    yield timeout(DEBOUNCE_MS);
    this.set('searchValue', term);
    return;
  }).restartable(),

  actions: {
    addNewFile: function() {
      console.log("new");
    }
  }
});
