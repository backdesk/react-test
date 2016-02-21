const React = require('react')
    , ReactDOM = require('react-dom');


const ProductContainer = require('./products/comp/container');


/**
 * Main application root.
 * In this example somewhat useless but would be ideal as a container for something like react router.
 */
const Main = function () {
  return (
    <ProductContainer />
  );
};

ReactDOM.render(<Main />, document.getElementById('main'));