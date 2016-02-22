const React = require('react')
    , Enzyme = require('enzyme')
    , rewire = require('rewire')
    , sinon = require('sinon')
    , TestUtils = require('react-addons-test-utils');

const ProductViewTable = rewire('../../src/js/products/comp/view.table');

const data = require('./data.json');

describe('Product View Table', function () { 
  it('should highlight rows matching a selected qsNo', () => {
    let store = ProductViewTable.__get__('productStore');

    store.selected = [data[0]];
    store.products = data;

    let comp = Enzyme.mount(<ProductViewTable selected={store.selected} products={store.products} />);

    let rows = comp.findWhere(n => {
      return n.props().product && n.props().product.qsNo === store.selected[0].qsNo;
    });

    rows.forEach(n => {
      return n.props().highlight.should.equal(true);
    });
  });
});