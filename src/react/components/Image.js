import React from 'react';
import PropTypes from 'prop-types';

class Image extends React.Component {
  render() {
    return (
      <div className={this.props.className} id={this.props.id}>
        <img src={this.props.src}></img>
      </div>

    );
  }
}

Image.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  src: PropTypes.string,
  link: PropTypes.element,
};

export default Image;