import DS from 'ember-data';
import attr from 'ember-data/attr';
import Ember from 'ember';
import DockerFileParser from '../mixins/docker-file-parser';

export default DS.Model.extend(DockerFileParser, {
  title: attr('string'),
  text: attr('string'),

  // return the lines, that start with two spaces
  dockers: Ember.computed('text', function() {
    var yaml = this.yamlParser(this.get('text'));
    console.log(yaml);
    return this.dockerParser(this.get('text'));
  })
});
