import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  title: attr('string'),
  groups: DS.hasMany('container-group', {
    inverse: 'containers'
  })
});
