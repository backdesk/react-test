const React = require('react')
    , Enzyme = require('enzyme')
    , rewire = require('rewire')
    , sinon = require('sinon')
    , TestUtils = require('react-addons-test-utils');


const ProductContainer = rewire('../../src/js/products/comp/container')
    , ProductViewTable = require('../../src/js/products/comp/view.table')
    , ProductEditTable = require('../../src/js/products/comp/edit.table');

describe('Product Container', function () {
  it('should have two tabs at the top of the screen', () => {
    let comp = Enzyme.mount(<ProductContainer />);

    comp.find('.tab').length.should.equal(2);
  });

  it('should select the view tab in the first instance', () => {
    let comp = Enzyme.mount(<ProductContainer />);

    comp.find(ProductViewTable).length.should.equal(1);
  });

  it('should enable all tabs when there are selected rows in state', () => {
    let comp = Enzyme.mount(<ProductContainer />);

    comp.setState({
      selected : [{}, {}]
    });

    comp.find('.disabled').length.should.equal(0);
  });

  it('should show the amend table when in amend state', () => {
    let comp = Enzyme.mount(<ProductContainer />);

    comp.setState({
      action : 'amend'
    });

    comp.find(ProductEditTable).length.should.equal(1);
  });

  it('should trigger a load action once mounted', () => {
    let actions = {
      loadProducts : sinon.spy() 
    };

    let revert = ProductContainer.__set__('actions', actions);
    
    let comp = Enzyme.mount(<ProductContainer />);
    
    actions.loadProducts.called.should.equal(true);

    revert();
  });
});