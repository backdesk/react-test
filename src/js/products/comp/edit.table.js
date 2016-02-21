const React = require('react'),
      classNames = require('classnames');

const actions = require('../actions')
    , productStore = require('../store');

/**
 */
const ProductEditTableRow = React.createClass({
  handleRemoveClick (e) {
    e.preventDefault();

    actions.deSelectProduct(this.props.product);
  },

  render () {
    let vals = _.values(_.pick(this.props.product, 'description', 'caseSize', 'uom', 'tpnd', 'basicCost', 'offInvoiceDiscount', 'invoiceCost', 'currency'));

    let cols = vals.map((val, index) => {
      return (<td key={index}>{val}</td>)
    });

    return (      
      <tr>
        {cols}
        <td><input /></td>
        <td><input /></td>
        <td><input /></td>
        <td><input /></td>
        <td><a href="#" onClick={this.handleRemoveClick}>Remove</a></td>
      </tr>
    );
  }
});

module.exports = React.createClass({
  render () {
    let rows = this.props.products.map((product) => {
      return (<ProductEditTableRow key={product.tpnd} product={product} />);
    });

    return (
      <table className="product-table editor">
        <thead></thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
});