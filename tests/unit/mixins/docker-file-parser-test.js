import Ember from 'ember';
import DockerFileParserMixin from 'stack-builder/mixins/docker-file-parser';
import { module, test } from 'qunit';

module('Unit | Mixin | docker file parser');

// Replace this with your real tests.
test('it works', function(assert) {
  let DockerFileParserObject = Ember.Object.extend(DockerFileParserMixin);
  let subject = DockerFileParserObject.create();
  assert.ok(subject);
});
