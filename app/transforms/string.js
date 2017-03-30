import DS from 'ember-data';

// TODO: delete me when mu-cl-resources (or virtuoso ?) is patched
// This transform was made by Arnaud S'Jongers for ETMS.
// the \n sent back by mu-cl-resources is not considered as a line feed, so we have to do this dirty trick to actually handle it
export default DS.Transform.extend({
  deserialize(serialized) {
    if (serialized) {
      serialized = serialized.split('\\n').join('\n');
    }
    return serialized;
  },

  serialize(deserialized) {
    return deserialized;
  }
});
