const React = require('react')
    , rewire = require('rewire')
    , sinon = require('sinon')
    , TestUtils = require('react-addons-test-utils');


const ProductContainer = rewire('../../src/js/products/comp/container')
    , ProductViewTable = require('../../src/js/products/comp/view.table')
    , ProductEditTable = require('../../src/js/products/comp/edit.table');

describe('Product Container', function () {
  it('should be a react component', () => {
    let comp = TestUtils.renderIntoDocument(<ProductContainer />);

    TestUtils.isCompositeComponentWithType(comp, ProductContainer).should.equal(true);
  });

  it('should have two tabs at the top of the screen', () => {
    let comp = TestUtils.renderIntoDocument(<ProductContainer />);

    let tabs = TestUtils.scryRenderedDOMComponentsWithClass(comp, 'tab');

    tabs.length.should.equal(2);
  });

  it('should select the view tab in the first instance', () => {
    let comp = TestUtils.renderIntoDocument(<ProductContainer />);

    let view = TestUtils.scryRenderedComponentsWithType(comp, ProductViewTable);

    view.length.should.equal(1);
  });

  it('should enable the amend tab when there are selected rows in state', () => {
    let comp = TestUtils.renderIntoDocument(<ProductContainer />);

    comp.setState({
      selected : [{}, {}]
    });

    let view = TestUtils.scryRenderedComponentsWithType(comp, ProductEditTable);

    view.length.should.equal(1);
  });

  it('should trigger a load action once mounted', () => {
    let actions = {
      loadProducts : sinon.spy() 
    };

    let revert = ProductContainer.__set__('actions', actions);
    
    let comp = TestUtils.renderIntoDocument(<ProductContainer />);
    
    actions.loadProducts.called.should.equal(true);

    revert();
  });

  it('should listen to store events once mounted', () => { 
    
  });
});