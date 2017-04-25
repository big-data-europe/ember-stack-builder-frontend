import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  title: attr('string'),
  text: attr('string'),

  // return the lines, that start with two spaces
  dockers: Ember.computed('text', function() {
    return this.get('text').split('\n').filter(this.get('dockerFilter')).map(this.get('removeUnsuportedCharacters'));
  }),

  dockerFilter: function(line) {
    // return if there is something with two spaces and
    // an alphanumeric character [A-Za-z0-9_] at the beginning.
    return line.search(/^(  )\w+/g) == 0;
  },

  // remove all the [^A-Za-z0-9_-] characters (non-alphanumberic)
  // match any character that is not in the set -> [^] is negation
  removeUnsuportedCharacters: function(line) {
    return line.replace(/[^A-Za-z0-9_-]/g, '');
  }

});
