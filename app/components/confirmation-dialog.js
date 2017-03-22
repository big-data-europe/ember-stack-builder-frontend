import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    agree: function(){
      this.sendAction(this.get('action'));
    },
    closeDialog: function(){
      this.sendAction('closeDialog');
    }
  }
});
