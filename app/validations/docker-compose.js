import {
  validatePresence,
  validateLength
} from 'ember-changeset-validations/validators';

export default {
  title: validateLength({min: 30}),
  text: validatePresence(true)
}
