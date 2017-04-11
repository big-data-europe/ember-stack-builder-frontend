import {
  validatePresence,
  validateLength
} from 'ember-changeset-validations/validators';

export default {
  title: [
    validatePresence(true),
    validateLength({
      min: 1
    })
  ],
  text: [
    validatePresence(true),
    validateLength({
      min: 1
    })
  ]
};
