const React = require('react')
    , _ = require('lodash')
    , classNames = require('classnames');

const actions = require('../actions')
    , productStore = require('../store');

const columnLabels = [
  'TPNB', 'TPND', 'Description', 'Status', 'Start Date', 'End Date', 'Division', 'Subgroup', 'Supplier', 'QS No', 'Basic', 
  'Off Invoice Discount', 'Invoice', 'Net', 'Amend'
];

/**
 * Individual row component for the view table.
 * Rows do actually have some logic of their own driving behaviors. These should probably stay separate.
 */
const ProductViewTableRow = React.createClass({
  handleRowToggled (e) {
    if(e.target.checked === true) {
      actions.selectProduct(this.props.product);
    } else {
      actions.deSelectProduct(this.props.product);
    }
  },

  render () {
    let opts = {}, vals = _.values(_.omit(this.props.product, 'uom', 'currency'));

    let cols = vals.map((val) => {
      return (<td key={_.uniqueId()}>{val}</td>)
    });

    let rowClass = classNames({ 
      'product-row' : true,
      'highlight' : this.props.highlight,
      'disabled' : this.props.highlight === false
    });

    if (this.props.highlight === false) {
      opts['disabled'] = 'disabled';
    } 

    if (this.props.selected === true) {
      opts['checked'] = 'checked';
    } 

    return (
      <tr className={rowClass}>
        {cols}
        <td className="col-amend"><input type="checkbox" onChange={this.handleRowToggled} {...opts}/></td>
      </tr>
    );
  }
});

/**
 * A much more re-usable approach would have been to abstract the table itself into a standalone component
 * that takes in different row components and renders them against a provided list and configuration.
 *
 * Column names and cherry picking the desired fields would be part of this configuration rather than me
 * hard-coding calls to _.omit etc.
 * 
 */
module.exports = React.createClass({
  propTypes: {
    selected : React.PropTypes.array.isRequired,
    products : React.PropTypes.array.isRequired
  },

  render () {
    let rows = this.props.products.map((product) => {
      let highlight, selected = productStore.isSelected(product);

      if (this.props.selected.length) {
        highlight = (productStore.getSelectedIndex(product, 'qsNo') !== -1);
      }

      return (<ProductViewTableRow key={product.tpnd} product={product} highlight={highlight} selected={selected} />);
    });

    let cols = columnLabels.map((label, index) => {
      return (<td key={_.uniqueId()}>{label}</td>);
    });

    return (
      <table className="product-table viewer">
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