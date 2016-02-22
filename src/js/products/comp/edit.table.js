const React = require('react')
    , _ = require('lodash')
    , classNames = require('classnames');

const actions = require('../actions')
    , productStore = require('../store');


const columnLabels = [
  'Description', 'Case Size', 'UOM', 'TPND', 'Cost', 'Off Inv Desc', 'Inv Cost', 'Currency Code',
  'Price', 'Off Inv Disc', 'Inv Price', 'Currency Code', ''
];

const ProductEditTableRow = React.createClass({
  handleRemoveClick (e) {
    e.preventDefault();

    actions.deSelectProduct(this.props.product);
  },

  render () {
    let vals = _.values(_.pick(this.props.product, 'description', 'caseSize', 'uom', 'tpnd', 'basicCost', 'offInvoiceDiscount', 'invoiceCost', 'currency'));

    let cols = vals.map((val) => {
      return (<td key={_.uniqueId()}>{val}</td>)
    });

    return (      
      <tr className="product-row">
        {cols}
        <td><input /></td>
        <td><input /></td>
        <td><input /></td>
        <td><input /></td>
        <td className="remove"><a href="#" onClick={this.handleRemoveClick}>Remove</a></td>
      </tr>
    );
  }
});

/**
 * See my notes on view table.
 *
 * With more consideration perhaps it would of been better to derive both the edit and view tables from a stateless
 * component that simply handles structure and wireup.
 */
module.exports = React.createClass({
  render () {
    let rows = this.props.products.map((product) => {
      return (<ProductEditTableRow key={product.tpnd} product={product} />);
    });

    let cols = columnLabels.map((label, index) => {
      return (<td key={_.uniqueId()}>{label}</td>);
    });

    return (
      <table className="product-table editor">
        <thead>
          <tr>{cols}</tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
});