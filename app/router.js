import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('compact');
  this.route('editor', function() {
    this.route('edit', {
      path: ':docker_compose_id'
    });
  });
});

export default Router;
