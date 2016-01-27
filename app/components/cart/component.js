import React from 'react';

import LeftNav from 'material-ui/lib/left-nav';
import AppBar from 'material-ui/lib/app-bar';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import Badge from 'material-ui/lib/badge';
import IconButton from 'material-ui/lib/icon-button';
import BasketIcon from 'material-ui/lib/svg-icons/action/shopping-basket';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import { Colors } from 'material-ui/lib/styles';

import {deleteItem} from './actions'

const CartComponent = React.createClass({
  contextTypes: {
    store: React.PropTypes.object
  },

  componentWillMount() {
    this.context.store.subscribe(() => {
      this.setState(this.context.store.getState());
    });
  },

  getInitialState() {
    return {
      open: false,
      items: this.context.store.getState().items
    }
  },

  switchCart() {
    this.setState({open: !this.state.open});
  },

  deleteItem(item) {
    this.context.store.dispatch(deleteItem(item));
    if (!this.state.items.length) {
      this.setState({open: false});
    }
  },

  getStyles() {
    const styles = {
      appBar: {
        position: 'fixed',
        top: 0,
      }
    }
    return styles;
  },

  render() {
    const styles = this.getStyles();

    return (
      <div>
        <AppBar
          zDepth={0}
          iconElementLeft={
            <Badge primary={true} badgeContent={this.state.items.length}>
              <IconButton onClick={this.switchCart} tooltip="Basket"><BasketIcon color={Colors.white}/></IconButton>
            </Badge>
          }
          style={styles.appBar}/>

          <LeftNav open={this.state.open} docked={false} onRequestChange={this.switchCart}>
            { this.state.items.map( (item) => {
                return (
                  <MenuItem key={item.id} rightIcon={<DeleteIcon onClick={this.deleteItem.bind(this, item)} />} >{item.title}</MenuItem>
                );
              })
            }
          </LeftNav>
      </div>
    );
  }
});

export default CartComponent;
