import React, { Component, PropTypes } from 'react';
import StyleSheet from 'react-style';

const STYLES = StyleSheet.create({
  img: {
    display: 'inline-block',
    margin: 25,
    verticalAlign: 'middle'
  }
});


export default class Sponsor extends Component {
  render() {
    return (
      <div style={STYLES.img}>
        <a href={this.props.url} target="_blank">
          <img src={this.props.image} alt={this.props.name} style={this.props.style} />
        </a>
      </div>
    )
  }
}

Sponsor.propTypes = {
  url: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  style: PropTypes.object
};
