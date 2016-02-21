const React = require('react')
    , Reflux = require('reflux')
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
   * This method could be improved by better generalizing the product table or toggling visibility. 
   * It's also possible to use react  switch between the states.
   */
  handleTabClick (e) {
    e.preventDefault();

    let tab = e.target, action = tab.getAttribute('data-action'); 

    this.setState(update(this.state, {
      action : { $set : action }
    }));
  },

  render () {
    let view, action = this.state.action;

    if (action === 'view') {
      view = (<ProductViewTable products={this.state.products} selected={this.state.selected}/>);
    } else {
      view = (<ProductEditTable products={this.state.selected} />);
    }

    return (
      <div>
        <h2>Tesco - MyProduct Cost</h2>
        <ul className="tab-container">
          <li className="tab"><a href="#" onClick={this.handleTabClick} data-action="view">view</a></li>
          <li className="tab"><a href="#" onClick={this.handleTabClick} data-action="amend">amend</a></li>
        </ul>
        <div>
          {view}
        </div>
      </div>
    );
  }
});