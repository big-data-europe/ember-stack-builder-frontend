import Ember from 'ember';
import jsyaml from 'npm:js-yaml';

export default Ember.Mixin.create({
  yamlParser: function(yamlString) {
    return jsyaml.safeLoad(yamlString);
  },
  dockerParser: function(dockerText) {
    return dockerText.split('\n').filter(this.serviceNameFilter).map(this.removeUnsuportedCharacters);
  },
  serviceNameFilter: function(line) {
    // return if there is something with two spaces and
    // an alphanumeric character [A-Za-z0-9_] at the beginning.
    return line.search(/^(  )\w+/g) === 0;
  },

  // remove all the [^A-Za-z0-9_-] characters (non-alphanumberic)
  // match any character that is not in the set -> [^] is negation
  removeUnsuportedCharacters: function(line) {
    return line.replace(/[^A-Za-z0-9_-]/g, '');
  }

});
