import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveDocker: function() {
      var dc = this.get('store').createRecord('docker-compose');
      dc.set('text', this.get('value'));
      dc.save();
    },
    saveGroup: function() {
      this.get('store').findAll('container-group').then((groups) => {
        this.get('store').findAll('container').then((containers) => {
          var length = containers.get('length')-1;
          groups.forEach(function(group) {
            group.get('containers').pushObject(containers.objectAt(Math.floor(Math.random() * length)));
            group.save();
          });
        });

      });
    },
    saveContainer: function() {
      var dc = this.get('store').createRecord('container');
      dc.set('title', this.get('value'));
      dc.save();

    },

    addNewFile: function() {
      console.log("new");
    }
  }
});
