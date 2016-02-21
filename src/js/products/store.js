const Reflux = require('reflux');


module.exports = Reflux.createStore({
  listenables : require('./actions'),

  init () {
    this.selected = [];
    this.products = [];
  },

  getInitialState () {
    this.selected.length = 0;

    return {
      selected : this.selected,
      products : this.products
    }
  },

  getSelectedIndex (product, field) {
    return this.selected.findIndex((p) => {
      return p[field] === product[field];
    });
  },

  isSelected (product) {
    return this.getSelectedIndex(product, 'tpnd') !== -1;
  }, 

  onLoadProductsDone (data) {
    this.products = data;

    this.trigger({ 
      selected : this.selected,
      products : this.products 
    });
  },

  onLoadProductsFail (err) {

  },

  onSelectProduct (product) {
    if(!this.isSelected(product)) {
      this.selected.push(product);
    }

    this.trigger({ 
      selected : this.selected,
      products : this.products
    });
  },

  onDeSelectProduct (product) {
    let index = this.getSelectedIndex(product, 'tpnd');

    if(index !== -1) {
      this.selected.splice(index, 1);
    }

    this.trigger({ 
      selected : this.selected,
      products : this.products
    });
  }
});