import DS from 'ember-data';
import attr from 'ember-data/attr';
import Ember from 'ember';
import RSVP from 'rsvp';

export default DS.Model.extend({
  title: attr('string'),
  relations: DS.hasMany('container-relation'),

  numberOfContainers: Ember.computed.alias('relations.length'),

  relatedContainerItems: Ember.computed('relations', 'relations.[]', function() {
    return this.get('relations').then(function(relations) {
      var promises = [];

      relations.forEach(function(rel) {
        promises.push(rel.get('item'));
      });

      return RSVP.all(promises).then((promiseResults) => {
        return promiseResults;
      });
    });
  }),

  dockerText: Ember.computed('relatedContainerItems', function() {
    let relatedItems = this.get('relatedContainerItems');
    return relatedItems.then(function(items) {
      var dockerText = "";
      items.forEach(function(item) {
        dockerText += item.get('dockerText') + '\n';
      });
      return dockerText;
    });
  })
});
