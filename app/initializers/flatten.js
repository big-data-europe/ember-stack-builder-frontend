export function initialize(/* application */) {
  Array.prototype.flatten = function() {
    let arr = this;
    while (arr.find(el => Array.isArray(el))) { arr = Array.prototype.concat(...arr); }
    return arr; 
  }
}

export default {
  name: 'flatten',
  initialize
};
