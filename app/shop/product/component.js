import React from 'react';
import {Link} from 'react-router';
import {Paper, Mixins, Styles} from 'material-ui';
import RaisedButton from 'material-ui/lib/raised-button';

let {StylePropable, StyleResizable} = Mixins;
let {Colors, Spacing, Transitions, Typography} = Styles;


let ProductComponent = React.createClass({

  propTypes: {
    firstChild: React.PropTypes.bool,
    heading: React.PropTypes.string,
    img: React.PropTypes.string,
    lastChild: React.PropTypes.bool,
    route: React.PropTypes.string,
  },

  mixins: [StylePropable, StyleResizable],

  getDefaultProps() {
    return {
      firstChild: false,
      lastChild: false,
    };
  },

  getInitialState() {
    return {
      zDepth: 0,
    };
  },

  getStyles() {
    let desktopGutter = Spacing.desktopGutter;
    let desktopKeylineIncrement = Spacing.desktopKeylineIncrement;
    let styles = {
      root: {
        transition: Transitions.easeOut(),
        maxWidth: '300px',
        margin: '0 auto ' + desktopGutter + 'px auto',
      },
      rootWhenMedium: {
        float: 'left',
        width: '33%',
        marginRight: 4,
        marginBottom: 0,
      },
      image: {
        marginBottom: -6,
      },
      heading: {
        fontSize: 20,
        paddingTop: 19,
        marginBottom: 13,
        letterSpacing: 0,
        fontWeight: Typography.fontWeightMedium,
        color: Typography.textDarkBlack,
        backgroundColor: Colors.grey200,
        textAlign: 'center',
        margin: 0,
        padding: 0,
        lineHeight: desktopKeylineIncrement + 'px',
      },
      rootWhenLastChild: {
        marginBottom: 0,
      },
      rootWhenMediumAndLastChild: {
        marginRight: 0,
        marginBottom: 0,
      },
      rootWhenMediumAndFirstChild: {
        marginLeft: 0,
      },
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM) ||
        this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.root = this.mergeStyles(
        styles.root,
        styles.rootWhenMedium,
        this.props.firstChild && styles.rootWhenMediumAndFirstChild,
        this.props.lastChild && styles.rootWhenMediumAndLastChild
      );
    }

    return styles;
  },

  _onMouseEnter() {
    this.setState({
      zDepth: 4,
    });
  },

  _onMouseLeave() {
    this.setState({
      zDepth: 0,
    });
  },

  _onClick() {
    this.props.onClick(this.props.item, this.props.inCart);
  },

  render() {
    let styles = this.getStyles();

    return (
      <Paper
        zDepth={this.state.zDepth}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        style={this.mergeStyles(
          styles.root,
          this.props.lastChild && styles.rootWhenLastChild)} >
        <h3 style={styles.heading}>{this.props.heading}</h3>
        <Link to={this.props.route}>
          <img style={styles.image} src={this.props.img} />
        </Link>
        <RaisedButton onClick={this._onClick} label={this.props.inCart ? "Remove from cart": "Add to cart"}/>
      </Paper>
    );
  },

});

export default ProductComponent;
