const React = require('react')
    , Reflux = require('reflux')
    , classNames = require('classnames')
    , update = require('react-addons-update');


const actions = require('../actions')
    , productStore = require('../store');


const ProductViewTable = require('./view.table')
    , ProductEditTable = require('./edit.table');


/**
 * Container for table that trickles state down the tree from store state.
 */
module.exports = React.createClass({
  mixins : [ Reflux.listenTo(productStore, 'handleStoreEvents') ],
  
  getInitialState () {
    return {
      action : 'view',
      products : [],
      selected : []
    };
  },

  /**
   * Perform an action to retrieve the neccessary data to be displayed within the table.
   */
  componentDidMount () {
    actions.loadProducts();
  },

  /**
   * Handles store state changes and assigns them to local state causing the tree to re-render.
   */
  handleStoreEvents (data) {
    this.setState({ 
      selected : data.selected,
      products : data.products
    });
  },

  /**
   * Toggle a flag in state to render different views.
   *
   * This method could be improved by better generalizing the product table or toggling visibility. 
   * Could also use react router to switch between the states.
   */
  handleTabClick (e) {
    e.preventDefault();

    let tab = e.target, action = tab.getAttribute('data-action'); 

    this.setState(update(this.state, {
      action : { $set : action }
    }));
  },

  render () {
    let view, action = this.state.action, selected = this.state.selected;

    if (action === 'view') {
      view = (<ProductViewTable products={this.state.products} selected={selected}/>);
    } else {
      view = (<ProductEditTable products={selected} />);
    }

    let tabClass = classNames({
      'tab' : true,
      'disabled' : selected.length === 0
    });

    return (
      <div className="product-container">
        <header>
          <h2 className="brand">Tesco - MyProduct Cost</h2>
          <ul className="tab-container">
            <li className="tab"><a href="#" onClick={this.handleTabClick} data-action="view">view</a></li>
            <li className={tabClass}><a href="#" onClick={this.handleTabClick} data-action="amend">amend</a></li>
          </ul>
        </header>
        <div>
          {view}
        </div>
      </div>
    );
  }
});