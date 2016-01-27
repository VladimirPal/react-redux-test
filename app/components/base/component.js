import React from 'react';
import {
  StylePropable,
  StyleResizable,
} from 'material-ui/lib/mixins';

import {
  Colors,
  getMuiTheme,
} from 'material-ui/lib/styles';

import FullWidthSection from './full-width-section/component';
import CartComponent from '../cart/component'


const BaseComponent = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },

  mixins: [
    StylePropable,
    StyleResizable,
  ],

  getInitialState() {
    return {
      muiTheme: getMuiTheme()
    }
  },

  getStyles() {
    const darkWhite = Colors.darkWhite;

    const styles = {
      footer: {
        backgroundColor: Colors.grey900,
        textAlign: 'center',
      },
      a: {
        color: darkWhite,
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: Colors.lightWhite,
        maxWidth: 335,
      }
    };
    return styles;
  },

  render() {
    const {
      children
    } = this.props;
    const styles = this.getStyles();

    return (
      <div>
        <CartComponent/>

        { children }

        <FullWidthSection style={styles.footer}>
          <p style={this.prepareStyles(styles.p)}>
            {'some text you want to say, '}
            <a style={styles.a} href="mailto:">
              Contact Us
            </a>
          </p>
        </FullWidthSection>

      </div>
    );
  },
});

export default BaseComponent;
