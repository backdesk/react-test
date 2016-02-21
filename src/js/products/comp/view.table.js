const React = require('react'),
      classNames = require('classnames');

const actions = require('../actions')
    , productStore = require('../store');


const ProductViewTableRow = React.createClass({
  handleRowToggled (e) {
    if(e.target.checked === true) {
      actions.selectProduct(this.props.product);
    } else {
      actions.deSelectProduct(this.props.product);
    }
  },

  render () {
    let opts = {}, vals = _.values(this.props.product);

    let cols = vals.map((val, index) => {
      return (<td key={index}>{val}</td>)
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
        <td><input type="checkbox" onChange={this.handleRowToggled} {...opts}/></td>
      </tr>
    );
  }
});

module.exports = React.createClass({
  render () {
    let rows = this.props.products.map((product) => {
      let highlight, selected = productStore.isSelected(product);

      if (this.props.selected.length) {
        highlight = (productStore.getSelectedIndex(product, 'qsNo') !== -1);
      }

      return (<ProductViewTableRow key={product.tpnd} product={product} highlight={highlight} selected={selected} />);
    });

    return (
      <table className="product-table viewer">
        <thead></thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
});