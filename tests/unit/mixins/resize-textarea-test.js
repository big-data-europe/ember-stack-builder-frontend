import Ember from 'ember';
import ResizeTextareaMixin from 'stack-builder/mixins/resize-textarea';
import { module, test } from 'qunit';

module('Unit | Mixin | resize textarea');

// Replace this with your real tests.
test('it works', function(assert) {
  let ResizeTextareaObject = Ember.Object.extend(ResizeTextareaMixin);
  let subject = ResizeTextareaObject.create();
  assert.ok(subject);
});
