import React from 'react';
import PropTypes from 'prop-types';

import '../../css/postHeader.css';
import Image from './Image';
import AuthorTag from './AuthorTag';

class PostHeader extends React.Component {
  render() {
    return (
      <div id='postHeader'>
        <h1>{this.props.title}</h1>
        <h2>{this.props.description}</h2>

        <AuthorTag date={this.props.date} />

        <Image className='postBanner' src={this.props.banner} />
      </div>
    );
  }
}

PostHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  banner: PropTypes.string,
};

export default PostHeader;