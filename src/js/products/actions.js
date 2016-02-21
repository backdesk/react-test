const Reflux = require('reflux');

const Actions = Reflux.createActions([
  { 'loadProducts' : { children : ['done', 'fail'] } },
  'selectProduct',
  'deSelectProduct'
]);

/**
 * Reflux shorthand. Do something and call into one of the generated 'child' methods. 
 */
Actions.loadProducts.listen(function() {
  this.done(require('./data.json'));
});

module.exports = Actions;