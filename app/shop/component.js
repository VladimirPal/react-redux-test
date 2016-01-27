import React from 'react';
import { connect } from 'react-redux';
import {history} from 'react-router';
import ProductComponent from './product/component';
import FullWidthSection from '../components/base/full-width-section/component';
import {addItem, deleteItem} from '../components/cart/actions';

import RaisedButton from 'material-ui/lib/raised-button';
import {StylePropable, StyleResizable} from 'material-ui/lib/mixins';
import {Colors, Spacing, Typography, lightBaseTheme} from 'material-ui/lib/styles';


const ShopComponent = React.createClass({
  contextTypes: {
    store: React.PropTypes.object
  },

  mixins: [
    StylePropable,
    StyleResizable
  ],

  componentWillMount() {
    this.context.store.subscribe(() => {
      this.setState(this.context.store.getState());
    });
  },

  getInitialState() {
    return this.context.store.getState();
  },

  _getTitle() {
    let styles = {
      root: {
        backgroundColor: Colors.cyan500,
        overflow: 'hidden',
      },
      tagline: {
        margin: '16px auto 0 auto',
        textAlign: 'center',
        maxWidth: 575,
      },
      h1: {
        color: Colors.darkWhite,
        fontWeight: Typography.fontWeightLight,
      },
      h2: {
        fontSize: 20,
        lineHeight: '28px',
        paddingTop: 19,
        marginBottom: 13,
        letterSpacing: 0,
      },
      nowrap: {
        whiteSpace: 'nowrap',
      },
      taglineWhenLarge: {
        marginTop: 32,
      },
      h1WhenLarge: {
        fontSize: 56,
      },
      h2WhenLarge: {
        fontSize: 24,
        lineHeight: '32px',
        paddingTop: 16,
        marginBottom: 12,
      },
    };

    styles.h2 = this.mergeStyles(styles.h1, styles.h2);

    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.tagline = this.mergeStyles(styles.tagline, styles.taglineWhenLarge);
      styles.h1 = this.mergeStyles(styles.h1, styles.h1WhenLarge);
      styles.h2 = this.mergeStyles(styles.h2, styles.h2WhenLarge);
    }

    return (
      <FullWidthSection style={styles.root}>
        <div style={styles.tagline}>
          <h1 style={styles.h1}>Pop Wristband Co</h1>
          <h2 style={styles.h2}>
            Beautiful Wristband and Products.
            <span style={styles.nowrap} />
            {" "}
            <span style={styles.nowrap}> You Desgin, We Craft with Love!</span>
          </h2>
        </div>
      </FullWidthSection>
    );
  },

  onClick(item, inCart) {
    const { dispatch } = this.props;
    if (inCart) {
      dispatch(deleteItem(item))
    } else {
      dispatch(addItem(item))
    }
  },

  checkInCart(item) {
    for (let cartItem of this.state.items) {
      if (cartItem.id === item.id) {
        return true;
      }
    }
    return false;
  },

  _getProducts() {
    const styles = {maxWidth: 906};

    return (
      <FullWidthSection useContent={true} contentStyle={styles}>
      { this.props.allProducts.map( (item, key) => {
          return(
            <ProductComponent key={item.id}
              item={item}
              inCart={this.checkInCart(item)}
              onClick={this.onClick}
              heading={item.title}
              route={item.route}
              img={`images/${item.img}`}
              lastChild={item.isLast}
              firstChild={item.isFirst} />
          );
        })
      }
      </FullWidthSection>
    );
  },

  render() {
    return (
      <div>
        {this._getTitle()}
        {this._getProducts()}
      </div>
    );
  },

});


function select(state) {
  return {
    selectedItems: state.items,
    allProducts: [
      {isFirst: true, isLast: false, route: '/1', title: 'Lanyard', img: 'components.svg', id: 1},
      {isFirst: false, isLast: false, route: '/2', title: 'Wristband', img: 'css-framework.svg', id: 2},
      {isFirst: false, isLast: true, route: '/3', title: 'T-shirt', img: 'components.svg', id: 3}
    ]
  }
}
export default connect(select)(ShopComponent)
